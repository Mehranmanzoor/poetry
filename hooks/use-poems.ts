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
import { getFirestoreClient } from "@/lib/firebase";

export function usePoems() {
  const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    const db = getFirestoreClient();
    if (!db) {
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
            const data = doc.data() as any;

            // Normalize createdAt: Firestore may return a Timestamp.
            let createdAt: string;
            if (data?.createdAt && typeof data.createdAt.toDate === "function") {
              createdAt = data.createdAt.toDate().toISOString();
            } else if (typeof data?.createdAt === "string") {
              createdAt = data.createdAt;
            } else {
              createdAt = new Date().toISOString();
            }

            return {
              id: doc.id,
              title: data.title,
              slug: data.slug,
              category: data.category,
              content: data.content,
              createdAt,
            } as Poem;
          })
        );
      },
      (error) => {
        console.error("Failed to load poems:", error);
      }
    );

    return unsubscribe;
  }, []);

  const addPoem = async (poem: Omit<Poem, "id">) => {
    const db = getFirestoreClient();
    if (!db) {
      return;
    }

    try {
      // Use server timestamp for createdAt to ensure consistent ordering and
      // avoid client-side clock issues.
      const payload = {
        ...poem,
        createdAt: serverTimestamp(),
      } as any;

      await addDoc(collection(db, "poems"), payload);
    } catch (err) {
      console.error("Failed to add poem:", err);
      throw err;
    }
  };

  const deletePoem = async (id: string) => {
    const db = getFirestoreClient();
    if (!db) {
      return;
    }

    await deleteDoc(doc(db, "poems", id));
  };

  return {
    poems,
    addPoem,
    deletePoem,
  };
}
