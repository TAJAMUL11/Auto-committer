# Auto-Committer Tool

An intelligent, cloud-based auto-committer that automatically keeps your GitHub contributions green and active. 

If no commits have been pushed by **10:50 PM IST (17:20 UTC)** on a given day, this tool wakes up, calls the Gemini API to generate 3-4 meaningful, non-breaking improvements (such as documentation enhancements, utility helpers, unit tests, or code comments), and commits/pushes them automatically.

## How It Works

1. **Scheduled Run**: A GitHub Actions workflow runs every day at 17:20 UTC (10:50 PM IST).
2. **Commit Check**: The tool queries the repository's commit history for the current day in the `Asia/Kolkata` timezone.
3. **Check Condition**:
   - If commits exist for the day, it logs the condition and exits.
   - If no commits exist, it requests code changes from the Gemini API.
4. **Change Generation**: Gemini generates 3-4 separate, sequential, and safe code enhancements (utilities, tests, or documentation).
5. **Auto-Commit**: The script applies these changes one by one, making separate git commits with meaningful messages.
6. **Push**: The commits are pushed back to the `main` branch.

## Setup Instructions

1. **Get a Gemini API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/) and get a free API Key.

2. **Add Key to GitHub Secrets**:
   - Go to your repository settings on GitHub.
   - Navigate to **Settings** > **Secrets and variables** > **Actions**.
   - Create a new repository secret named `GEMINI_API_KEY` and paste your API key.

3. **Enable Workflow Permissions**:
   - In your repository settings, go to **Settings** > **Actions** > **General**.
   - Under **Workflow permissions**, select **Read and write permissions** so the GitHub Actions runner can push commits.
