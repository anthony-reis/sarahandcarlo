/**
 * Desmarca todos os presentes no Firestore.
 * Uso: node scripts/reset-presentes.mjs
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

// Parse .env.local manually
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => l.split('=').map((s) => s.trim())),
);

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

const snap = await getDocs(collection(db, 'presentes'));

if (snap.empty) {
  console.log('Nenhum presente encontrado na coleção.');
  process.exit(0);
}

// Firestore batch supports up to 500 ops — split if needed
const chunks = [];
for (let i = 0; i < snap.docs.length; i += 499) {
  chunks.push(snap.docs.slice(i, i + 499));
}

for (const chunk of chunks) {
  const batch = writeBatch(db);
  for (const d of chunk) {
    batch.update(doc(db, 'presentes', d.id), { assinado: false, quemAssinou: '' });
  }
  await batch.commit();
}

console.log(`✓ ${snap.docs.length} presente(s) desmarcado(s).`);
process.exit(0);
