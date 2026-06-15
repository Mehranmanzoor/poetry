"use client";

import { useEffect, useState } from "react";
import { Poem } from "@/types/poem";

export function usePoems() {
  const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    const saved =
      localStorage.getItem("poems");

    if (saved) {
      setPoems(JSON.parse(saved));
    }
  }, []);

  const savePoems = (
    updatedPoems: Poem[]
  ) => {
    setPoems(updatedPoems);

    localStorage.setItem(
      "poems",
      JSON.stringify(updatedPoems)
    );
  };

  const addPoem = (poem: Poem) => {
    savePoems([...poems, poem]);
  };

  const deletePoem = (id: string) => {
    savePoems(
      poems.filter(
        (p) => p.id !== id
      )
    );
  };

  return {
    poems,
    addPoem,
    deletePoem,
  };
}
