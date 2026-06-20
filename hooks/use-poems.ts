"use client";

import { useEffect, useState } from "react";
import { Poem } from "@/types/poem";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
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
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Poem, "id">),
          }))
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

    await addDoc(collection(db, "poems"), poem);
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
