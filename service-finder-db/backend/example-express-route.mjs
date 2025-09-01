// Minimal Express route for `/api/service/:id`
// Assumes: npm i express cors firebase-admin dotenv
// Run (emulator):
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 FIREBASE_PROJECT_ID=service-finder-dev node ./backend/example-express-route.mjs
// Run (prod):
//   FIREBASE_PROJECT_ID=your-project-id GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node ./backend/example-express-route.mjs

import express from 'express'
import cors from 'cors'
import admin from 'firebase-admin'
import process from 'node:process'

const app = express()
app.use(cors())

const projectId = process.env.FIREBASE_PROJECT_ID || 'demo-service-finder'
if (!admin.apps.length) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    admin.initializeApp({ projectId })
    console.log(`[api] Using Firestore Emulator at ${process.env.FIRESTORE_EMULATOR_HOST} for project ${projectId}`)
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId
    })
    console.log(`[api] Using Firestore (prod) for project ${projectId}`)
  }
}
const db = admin.firestore()

app.get('/api/service/:id', async (req, res) => {
  try {
    const id = req.params.id
    const doc = await db.collection('services').doc(id).get()
    if (!doc.exists) return res.status(404).json({ error: 'Service not found' })
    const data = doc.data()
    // Shape the payload explicitly for frontend contract
    const payload = {
      id: doc.id,
      name: data.name,
      type: data.type,
      address: data.address,
      location: { lat: data.location.latitude, lng: data.location.longitude },
      hours: data.hours || {},
      description: data.description || '',
      contact: data.contact || {},
      status: data.status || 'active',
      lastUpdated: data.lastUpdated ? data.lastUpdated.toDate() : null
    }
    res.json(payload)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

const port = process.env.PORT || 5050
app.listen(port, () => console.log(`[api] listening on http://localhost:${port}`))
