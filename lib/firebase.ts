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

const firebaseEnvKeys: Record<keyof typeof firebaseConfig, string> = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
  measurementId: "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
};

function isFirebaseConfigValid(config: Record<string, string | undefined>) {
  return Object.values(config).every((value) => typeof value === "string" && value.length > 0);
}

function logMissingFirebaseConfig() {
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => firebaseEnvKeys[key as keyof typeof firebaseConfig]);

  if (missingKeys.length) {
    console.error(
      "[Firebase] Missing environment variables:",
      missingKeys.join(", "),
      "\nPlease set these values locally and in your Vercel project settings."
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

  const appInitialized = initializeFirebaseApp();
  if (!appInitialized) {
    return null;
  }

  return getAuth();
}

export function getFirestoreClient() {
  if (typeof window === "undefined") {
    return null;
  }

  const appInitialized = initializeFirebaseApp();
  if (!appInitialized) {
    return null;
  }

  return getFirestore();
}
