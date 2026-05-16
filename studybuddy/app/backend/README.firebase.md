# Firebase (Firestore) setup for backend

## Required environment variables

### 1) FIREBASE_SERVICE_ACCOUNT_JSON (recommended)
Set this to the **full service account JSON** (as a single environment variable).

Example:
- Windows (cmd) often requires escaping quotes/newlines; easiest is to paste a minified JSON string.

### 2) PORT
Optional; defaults to `5000`.

## Firestore structure
- Collection: `analyses`
- Documents fields written by `POST /api/analyze`:
  - `user_id` (string)
  - `assignment_text` (string)
  - `explanation` (string)
  - `is_pro` (boolean)
  - `created_at` (ISO string)

- `GET /api/history/:userId` queries:
  - where `user_id == :userId`
  - order by `created_at` desc
  - limit 10

