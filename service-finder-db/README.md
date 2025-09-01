# Service Finder – DB Kit (Owethu)

This pack helps you stand up Firestore data and a minimal API for `/api/service/:id` used by the React frontend.

## Prereqs
- Node 18+
- `npm i -g firebase-tools` and `firebase login`

## Quick start (emulator)
```bash
npm install
npm run emu             # starts Firestore emulator
npm run seed:emu        # imports ./firebase/services_seed.json into 'services'
npm run api:emu         # launches example GET /api/service/:id
# try: http://localhost:5050/api/service/khayelitsha-day-hospital
```

## Files
- `firebase/services_seed.json` — example services
- `firebase/seed-services.mjs` — seeding script (Admin SDK)
- `firebase/firestore.rules` — public read on `services`, writes admin-only
- `firebase/firestore.indexes.json` — sample composite index
- `backend/example-express-route.mjs` — minimal `/api/service/:id`

## Deploying to production
1. Create a Firebase project and set `FIREBASE_PROJECT_ID`.
2. Use ADC or a `serviceAccount.json` file for Admin SDK.
3. Seed:
   ```bash
   FIREBASE_PROJECT_ID=your-project-id        GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json        node ./firebase/seed-services.mjs ./firebase/services_seed.json
   ```
4. Deploy rules/indexes:
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   ```

## Data shape (contract)
```ts
export type Service = {
  id: string;
  name: string;
  type: string;
  address: { line1: string; city: string; postalCode?: string; country: string };
  location: { lat: number; lng: number };
  hours: Record<string, { open: string; close: string }[]>;
  description?: string;
  contact?: { phone?: string; email?: string; website?: string };
  status?: 'active' | 'temporarily_closed';
  lastUpdated?: string | null;
}
```

## Handover checklist
- [ ] `services` collection seeded
- [ ] `/api/service/:id` works (emulator)
- [ ] Rules deployed (emulator/prod)
- [ ] Postman collection shared
- [ ] Type definition shared with FE/BE
```
