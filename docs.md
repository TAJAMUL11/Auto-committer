# Auto-Committer Developer Documentation

This document explains the technical architecture, design decisions, and local verification steps for the Auto-Committer tool.

## Key Design Considerations

### Timezone Safety
Because GitHub Actions runners operate in UTC time, and the day boundary changes at 12:00 AM local time (Asia/Kolkata), we ensure the script determines the date using the local time of the user:
- We parse dates and check the commit history relative to `Asia/Kolkata` time.
- The cron schedule `20 17 * * *` is set specifically to fire at 10:50 PM IST.

### Non-Breaking Changes
To ensure the commits do not break any builds or tests:
- The Gemini API is instructed to return files and contents structured as JSON.
- We restrict the LLM to only make additions/extensions (e.g. creating separate utility files, documenting existing setups, or creating tests).
- If compilation or execution of the script fails, changes are automatically reverted.

## Local Development & Testing

You can run the script locally to verify its functionality.

```bash
# Set your Gemini API key in your terminal/environment
$env:GEMINI_API_KEY="your-gemini-key"

# Run the auto-committer script
node auto-commit.js
```
