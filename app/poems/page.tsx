"use client";

import { usePoems } from "@/hooks/use-poems";
import PoemCard from "@/components/poem-card";

export default function PoemsPage() {
  const { poems } = usePoems();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      <header className="mb-10 flex flex-col gap-4">
        <h1 className="heading-font text-5xl md:text-6xl">Poems</h1>

        <p className="mt-2 max-w-3xl text-lg text-slate-400">
          Discover recent poems in a shareable, Instagram-like feed.
        </p>
      </header>

      {poems.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-400">
          There are no poems saved yet. Publish a poem from the admin dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <PoemCard
              key={poem.id}
              title={poem.title}
              slug={poem.slug}
              category={poem.category}
              excerpt={poem.content.slice(0, 220)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
