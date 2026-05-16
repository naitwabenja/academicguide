const admin = require('firebase-admin')

let _db

function getServiceAccountFromEnv() {
  // Recommended: JSON string
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (json) {
    try {
      return JSON.parse(json)
    } catch (e) {
      throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_JSON (failed to JSON.parse)')
    }
  }

  // Alternative: allow GOOGLE_APPLICATION_CREDENTIALS path, handled by admin SDK
  // if user sets it, we can proceed with default credentials.
  return null
}

function getFirebase() {
  if (_db) return _db

  const serviceAccount = getServiceAccountFromEnv()

  if (!admin.apps.length) {
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    } else {
      // Uses Application Default Credentials (e.g., GOOGLE_APPLICATION_CREDENTIALS)
      admin.initializeApp()
    }
  }

  _db = {
    admin,
    firestore: admin.firestore()
  }

  return _db
}

module.exports = {
  getFirebase
}

