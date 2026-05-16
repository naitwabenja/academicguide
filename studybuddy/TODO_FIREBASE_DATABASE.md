# Firebase Migration (Backend DB)

## Steps
- [x] Add Firebase Admin + Firestore dependencies to `studybuddy/app/backend/package.json`.

- [x] Implement Firebase Admin initialization using `FIREBASE_SERVICE_ACCOUNT_JSON`.
- [x] Add DB helper functions (save + list history) in backend.

- [x] Refactor `POST /api/analyze` to write analysis documents to Firestore.

- [x] Refactor `GET /api/history/:userId` to query Firestore and return last 10.

- [x] Update backend env expectations (document required env vars in `studybuddy/app/backend/.env.example` if present; otherwise add note to README).

- [x] Remove Supabase client usage from backend server.

- [x] Run backend tests manually (start server, hit endpoints).



