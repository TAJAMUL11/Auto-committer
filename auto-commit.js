const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

function getKolkataDateString(date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const parts = formatter.formatToParts(date);
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const year = parts.find(p => p.type === 'year').value;
  return `${year}-${month}-${day}`;
}

function getCodebaseContext() {
  const files = [];
  function scan(dir) {
    if (
      dir.includes('.git') ||
      dir.includes('node_modules') ||
      dir.includes('.github')
    ) {
      return;
    }
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (stat.isFile()) {
        if (
          file.endsWith('.js') ||
          file.endsWith('.json') ||
          file.endsWith('.md')
        ) {
          const content = fs.readFileSync(fullPath, 'utf8');
          files.push({
            path: path.relative(process.cwd(), fullPath),
            content: content
          });
        }
      }
    }
  }
  scan(process.cwd());
  return files;
}

function checkGitHubActivity(username) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/users/${encodeURIComponent(username)}/events`,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js-Auto-Committer',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode === 404) {
            return reject(new Error(`GitHub user "${username}" not found.`));
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`GitHub API error (status ${res.statusCode}): ${data}`));
          }
          const events = JSON.parse(data);
          resolve(events);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => { reject(e); });
    req.end();
  });
}

function callGemini(prompt) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return reject(new Error('GEMINI_API_KEY environment variable is not set.'));
    }

    const postData = JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            return reject(new Error(`Gemini API Error (status ${res.statusCode}): ${data}`));
          }
          const json = JSON.parse(data);
          if (
            json.candidates &&
            json.candidates[0] &&
            json.candidates[0].content &&
            json.candidates[0].content.parts[0]
          ) {
            resolve(json.candidates[0].content.parts[0].text);
          } else {
            reject(new Error('Unexpected API response structure: ' + data));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => { reject(e); });
    req.write(postData);
    req.end();
  });
}

async function run() {
  const todayStr = getKolkataDateString(new Date());
  console.log(`Checking commits for Kolkata Date: ${todayStr}`);

  // Resolve GitHub Username
  const githubRepository = process.env.GITHUB_REPOSITORY;
  let username = '';
  if (githubRepository) {
    username = githubRepository.split('/')[0];
  } else {
    try {
      const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
      const match = remoteUrl.match(/github\.com[/:]([^/]+)\/[^/]+/);
      if (match) {
        username = match[1];
      }
    } catch (e) {
      // Fallback if git remote command fails
    }
    if (!username) {
      try {
        username = execSync('git config user.name', { encoding: 'utf-8' }).trim();
      } catch (e) {
        username = process.env.GITHUB_USERNAME;
      }
    }
  }

  if (!username) {
    console.error('Could not determine GitHub username. Please set GITHUB_REPOSITORY or GITHUB_USERNAME environment variable.');
    process.exit(1);
  }

  console.log(`Checking GitHub activity for user: ${username}`);
  let hasPushedToday = false;

  try {
    const events = await checkGitHubActivity(username);
    hasPushedToday = events.some(event => {
      if (event.type !== 'PushEvent') return false;

      // Ignore pushes made by github-actions[bot] (our own auto-commits)
      if (event.actor && event.actor.login === 'github-actions[bot]') return false;

      const eventDate = new Date(event.created_at);
      return getKolkataDateString(eventDate) === todayStr;
    });
  } catch (error) {
    console.warn(`Failed to fetch GitHub activity: ${error.message}. Falling back to local git history check.`);
    let commitDates = [];
    try {
      // Only count commits authored by the user, not by bots
      const output = execSync(`git log --pretty=format:"%aI|%an" --author="${username}"`, { encoding: 'utf-8' });
      commitDates = output.split('\n').filter(Boolean).map(line => {
        const [dateStr] = line.trim().split('|');
        return new Date(dateStr);
      });
    } catch (e) {
      console.log('No local git history found.');
    }
    const commitsToday = commitDates.filter(d => getKolkataDateString(d) === todayStr);
    hasPushedToday = commitsToday.length > 0;
  }

  if (hasPushedToday) {
    console.log(`Real commits found today (Kolkata time) for user "${username}". Auto-committer will stand down.`);
    return;
  }

  console.log('No commits found today. Querying Gemini for improvements...');
  const context = getCodebaseContext();

  const prompt = `
You are an expert software developer helping to maintain a repository with high-quality, meaningful contributions.
Here is the current state of the repository:
${JSON.stringify(context, null, 2)}

Your task is to generate 4 to 5 sequential, meaningful, and completely non-breaking code/documentation improvements.
Examples of good changes:
- Adding useful helper/utility modules (e.g., string validators, date formatters, array utilities).
- Adding simple unit tests or utility test suites.
- Adding details or enhancements to documentation (README.md, docs.md).
- Refactoring helper code with comments or cleaner helper functions.

You MUST return a JSON object in this exact format:
{
  "changes": [
    {
      "filePath": "utils/math.js",
      "content": "const add = (a, b) => a + b;\\nmodule.exports = { add };",
      "commitMessage": "feat: add mathematical helpers"
    }
  ]
}

Ensure:
1. The changes list has exactly 4 or 5 elements.
2. The changes are sequential (later changes can build upon earlier changes in the list).
3. The code is clean, syntax-error free, and does not break any existing code.
4. Return ONLY the JSON object, conforming to responseMimeType "application/json". Do not wrap it in markdown blocks.
`;

  try {
    const responseText = await callGemini(prompt);
    const result = JSON.parse(responseText);

    if (!result.changes || !Array.isArray(result.changes) || result.changes.length === 0) {
      throw new Error('Gemini returned empty or invalid changes structure.');
    }

    console.log(`Applying ${result.changes.length} generated changes...`);
    for (const change of result.changes) {
      const fullPath = path.resolve(process.cwd(), change.filePath);
      
      // Ensure target directory exists
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      
      // Write the content
      fs.writeFileSync(fullPath, change.content, 'utf8');
      
      // Stage change
      execSync(`git add "${change.filePath}"`);
      
      // Commit change
      execSync(`git commit -m "${change.commitMessage}"`);
      console.log(`- Created commit: "${change.commitMessage}"`);
    }

    console.log('Successfully applied all changes locally.');
  } catch (error) {
    console.error('Error during auto-commit process:', error);
    process.exit(1);
  }
}

run();
