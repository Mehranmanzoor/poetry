"use client";

import { useEffect, useState } from "react";
import { Poem } from "@/types/poem";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { getFirestoreClient, isFirebaseReady } from "@/lib/firebase";

function getFirebaseErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("permission-denied")) {
      return "Firestore permission denied. Update your Firestore security rules to allow public reads and authenticated writes.";
    }
    return error.message;
  }

  return "Something went wrong while talking to Firebase.";
}

export function usePoems() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseReady()) {
      setError(
        "Firebase is not configured. Add your NEXT_PUBLIC_FIREBASE_* values to .env.local."
      );
      setLoading(false);
      return;
    }

    const db = getFirestoreClient();
    if (!db) {
      setError("Could not connect to Firebase.");
      setLoading(false);
      return;
    }

    const poemsQuery = query(
      collection(db, "poems"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      poemsQuery,
      (snapshot) => {
        setPoems(
          snapshot.docs.map((doc) => {
            const data = doc.data() as Record<string, unknown>;

            let createdAt: string;
            const rawCreatedAt = data.createdAt as
              | { toDate?: () => Date }
              | string
              | undefined;

            if (
              rawCreatedAt &&
              typeof rawCreatedAt === "object" &&
              typeof rawCreatedAt.toDate === "function"
            ) {
              createdAt = rawCreatedAt.toDate().toISOString();
            } else if (typeof rawCreatedAt === "string") {
              createdAt = rawCreatedAt;
            } else {
              createdAt = new Date().toISOString();
            }

            return {
              id: doc.id,
              title: data.title as string,
              slug: data.slug as string,
              category: data.category as string,
              content: data.content as string,
              createdAt,
            } as Poem;
          })
        );
        setError(null);
        setLoading(false);
      },
      (snapshotError) => {
        console.error("Failed to load poems:", snapshotError);
        setError(getFirebaseErrorMessage(snapshotError));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const addPoem = async (poem: Omit<Poem, "id">) => {
    if (!isFirebaseReady()) {
      throw new Error(
        "Firebase is not configured. Add your NEXT_PUBLIC_FIREBASE_* values to .env.local."
      );
    }

    const db = getFirestoreClient();
    if (!db) {
      throw new Error("Could not connect to Firebase.");
    }

    const payload = {
      title: poem.title,
      slug: poem.slug,
      category: poem.category,
      content: poem.content,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "poems"), payload);
    } catch (err) {
      console.error("Failed to add poem:", err);
      throw new Error(getFirebaseErrorMessage(err));
    }
  };

  const deletePoem = async (id: string) => {
    if (!isFirebaseReady()) {
      throw new Error(
        "Firebase is not configured. Add your NEXT_PUBLIC_FIREBASE_* values to .env.local."
      );
    }

    const db = getFirestoreClient();
    if (!db) {
      throw new Error("Could not connect to Firebase.");
    }

    try {
      await deleteDoc(doc(db, "poems", id));
    } catch (err) {
      console.error("Failed to delete poem:", err);
      throw new Error(getFirebaseErrorMessage(err));
    }
  };

  return {
    poems,
    loading,
    error,
    addPoem,
    deletePoem,
  };
}
