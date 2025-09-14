import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAb3cvaLqufRZFtZGaVZpAVY3lF18ShWco",
  authDomain: "smt5-a4628.firebaseapp.com",
  databaseURL: "https://smt5-a4628-default-rtdb.firebaseio.com",
  projectId: "smt5-a4628",
  storageBucket: "smt5-a4628.firebasestorage.app",
  messagingSenderId: "253305887457",
  appId: "1:253305887457:web:c36586b6f87fb356a1f5a0"
};

// Initialize Firebase
let app;
let auth;
let database;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

export { auth, database };
export default app;