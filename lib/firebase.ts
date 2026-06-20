import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function isFirebaseConfigValid(config: Record<string, string | undefined>) {
  return Object.values(config).every((value) => typeof value === "string" && value.length > 0);
}

function logMissingFirebaseConfig() {
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length) {
    console.error(
      "[Firebase] Missing environment variables:",
      missingKeys.join(", "),
      "\nPlease set the NEXT_PUBLIC_FIREBASE_* variables locally and in Vercel."
    );
  }
}

function initializeFirebaseApp() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!isFirebaseConfigValid(firebaseConfig)) {
    logMissingFirebaseConfig();
    return null;
  }

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  return true;
}

export function getAuthClient() {
  if (typeof window === "undefined") {
    return null;
  }

  initializeFirebaseApp();
  return getAuth();
}

export function getFirestoreClient() {
  if (typeof window === "undefined") {
    return null;
  }

  initializeFirebaseApp();
  return getFirestore();
}
