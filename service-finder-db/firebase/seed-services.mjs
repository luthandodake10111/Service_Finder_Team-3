// Seed Firestore 'services' collection from a JSON file
// Usage (emulator):
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 FIREBASE_PROJECT_ID=service-finder-dev node ./firebase/seed-services.mjs ./firebase/services_seed.json
// Usage (production - requires ADC/service account):
//   FIREBASE_PROJECT_ID=your-project-id GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node ./firebase/seed-services.mjs ./firebase/services_seed.json

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import admin from 'firebase-admin'

// Init Admin SDK
const projectId = process.env.FIREBASE_PROJECT_ID || 'demo-service-finder'
if (!admin.apps.length) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    admin.initializeApp({ projectId })
    console.log(`[seed] Using Firestore Emulator at ${process.env.FIRESTORE_EMULATOR_HOST} for project ${projectId}`)
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId
    })
    console.log(`[seed] Using Firestore (prod) for project ${projectId}`)
  }
}
const db = admin.firestore()

const file = process.argv[2]
if (!file) {
  console.error('Path to JSON file required.')
  process.exit(1)
}
const raw = fs.readFileSync(path.resolve(file), 'utf8')
const items = JSON.parse(raw)

function toGeoPoint(obj) {
  return new admin.firestore.GeoPoint(obj.lat, obj.lng)
}

const batch = db.batch()
for (const s of items) {
  const ref = db.collection('services').doc(s.id)
  const payload = {
    name: s.name,
    type: s.type,
    address: s.address,
    location: toGeoPoint(s.location),
    hours: s.hours,
    description: s.description || '',
    contact: s.contact || {},
    status: s.status || 'active',
    searchName: s.name.toLowerCase(),
    lastUpdated: s.lastUpdated ? admin.firestore.Timestamp.fromDate(new Date(s.lastUpdated)) : admin.firestore.FieldValue.serverTimestamp()
  }
  batch.set(ref, payload, { merge: true })
}

await batch.commit()
console.log(`[seed] Imported ${items.length} services into 'services' collection.`)
