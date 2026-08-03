# Auto-Committer Tool

An intelligent, cloud-based auto-committer that automatically keeps your GitHub contributions green and active. 

If no commits have been pushed by **9:00 PM IST (15:30 UTC)** on a given day, this tool wakes up, calls the Gemini API to generate 4-5 meaningful, non-breaking improvements (such as documentation enhancements, utility helpers, unit tests, or code comments), and commits/pushes them automatically.

## How It Works

1. **Scheduled Run**: A GitHub Actions workflow runs every day at 15:30 UTC (9:00 PM IST).
2. **Commit Check**: The tool queries the repository's commit history for the current day in the `Asia/Kolkata` timezone.
3. **Check Condition**:
   - If commits exist for the day, it logs the condition and exits.
   - If no commits exist, it requests code changes from the Gemini API.
4. **Change Generation**: Gemini generates 4-5 separate, sequential, and safe code enhancements (utilities, tests, or documentation).
5. **Auto-Commit**: The script applies these changes one by one, making separate git commits with meaningful messages.
6. **Push**: The commits are pushed back to the `main` branch.

## Project Structure

```
.
├── auto-commit.js         # Core script for commit verification & LLM code generation
├── docs.md                # Developer documentation and design decisions
├── README.md              # Project overview and setup guide
└── utils/                 # Modular helper utilities and tests
    ├── arrayUtils.js      # Array manipulation helpers
    ├── arrayUtils.test.js # Test suite for array utilities
    ├── asyncUtils.js      # Asynchronous operation helpers (sleep, withTimeout, retry)
    ├── asyncUtils.test.js # Test suite for async utilities
    ├── dateFormatter.js   # Timezone-aware date string formatting utilities
    ├── dateFormatter.test.js # Test suite for date formatting utilities
    ├── jsonUtils.js       # Safe JSON parsing and validation utilities
    ├── jsonUtils.test.js  # Test suite for JSON utilities
    ├── logger.js          # Timestamped logging helper functions
    ├── logger.test.js      # Test suite for logger helper functions
    ├── numberUtils.js     # Mathematical and numerical helpers
    ├── numberUtils.test.js # Test suite for number utilities
    ├── objectUtils.js     # Object manipulation helpers
    ├── objectUtils.test.js # Test suite for object utilities
    ├── stringUtils.js     # String manipulation and validation helpers
    └── stringUtils.test.js # Test suite for string utilities
```

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

## Troubleshooting / Recent Updates
- **Gemini API Endpoint Fix**: Switched to `gemini-3.6-flash` and the `v1beta` endpoint, as older models (like `gemini-1.5-flash` and `gemini-2.5-flash`) are no longer available or supported for new API keys.
