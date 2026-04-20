# TODO: Fix Gemini API Quota Errors

## Completed Tasks
- [x] Analyze the codebase to identify where Gemini API calls are made
- [x] Identify that backend server.mjs handles the actual API calls without retry logic
- [x] Add retry logic with exponential backoff to /api/gemini route for 429 RESOURCE_EXHAUSTED errors
- [x] Implement up to 3 retries with increasing delays (1s, 2s, 4s + random jitter)

## Summary
The issue was that the backend was hitting the Gemini API free tier quota limit (20 requests/day) and failing without retrying. Added retry logic to handle temporary quota issues gracefully, similar to the existing frontend retry mechanism.
