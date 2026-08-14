# Auto-Committer Developer Documentation

This document explains the technical architecture, design decisions, and local verification steps for the Auto-Committer tool.

## Key Design Considerations

### Timezone Safety
Because GitHub Actions runners operate in UTC time, and the day boundary changes at 12:00 AM local time (Asia/Kolkata), we ensure the script determines the date using the local time of the user:
- We parse dates and check the commit history relative to `Asia/Kolkata` time.
- The cron schedule `30 15 * * *` is set specifically to fire at 9:00 PM IST.

### Non-Breaking Changes
To ensure the commits do not break any builds or tests:
- The Gemini API is instructed to return files and contents structured as JSON.
- We restrict the LLM to only make additions/extensions (e.g. creating separate utility files, documenting existing setups, or creating tests).
- If compilation or execution of the script fails, changes are automatically reverted.

### API Configuration
- We use the `v1beta` endpoint with `gemini-3.6-flash` (`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent`) because older model versions (such as `1.5-flash` or `2.5-flash`) are no longer available or supported for newer API keys.

## Helper Utilities

The repository includes modular helper utilities in the `utils/` directory:
- `utils/arrayUtils.js`: Array manipulation, compacting, chunking, and difference helpers.
- `utils/asyncUtils.js`: Asynchronous utilities including `sleep`, `withTimeout`, and `retry`.
- `utils/colorUtils.js`: ANSI terminal color styling and ANSI escape code stripping helpers.
- `utils/cryptoUtils.js`: Cryptographic hashing (SHA-256, MD5) and random hex generation helpers.
- `utils/dateFormatter.js`: Formats dates into `YYYY-MM-DD` strings according to specific timezones.
- `utils/envUtils.js`: Safe environment variable retrieval, fallback, and type parsing helpers.
- `utils/functionUtils.js`: Function execution control helpers (`once`, `identity`, `constant`, `noop`).
- `utils/jsonUtils.js`: Safe JSON parsing, stringification, and string validation.
- `utils/logger.js`: Standardized timestamped logging helpers (`logInfo`, `logWarn`, `logError`).
- `utils/mathUtils.js`: Advanced mathematical and statistical helpers (`factorial`, `gcd`, `lcm`, `median`).
- `utils/numberUtils.js`: Mathematical helpers for clamping, rounding, and range checks.
- `utils/objectUtils.js`: Safe object key picking, omission, and type validation helpers.
- `utils/pathUtils.js`: File path manipulation, extension extraction, and path normalization helpers.
- `utils/stringUtils.js`: String formatting, truncation, slugification, and validation utilities.
- `utils/urlUtils.js`: Query parameter parsing and query string building helpers.
- `utils/validationUtils.js`: String, email, URL, and numeric format validation utilities.

## Local Development & Testing

You can run the script locally to verify its functionality.

```bash
# Set your Gemini API key in your terminal/environment
$env:GEMINI_API_KEY="your-gemini-key"

# Run utility unit tests
node utils/arrayUtils.test.js
node utils/asyncUtils.test.js
node utils/colorUtils.test.js
node utils/cryptoUtils.test.js
node utils/dateFormatter.test.js
node utils/envUtils.test.js
node utils/functionUtils.test.js
node utils/jsonUtils.test.js
node utils/logger.test.js
node utils/mathUtils.test.js
node utils/numberUtils.test.js
node utils/objectUtils.test.js
node utils/pathUtils.test.js
node utils/stringUtils.test.js
node utils/urlUtils.test.js
node utils/validationUtils.test.js

# Run the auto-committer script
node auto-commit.js
```
