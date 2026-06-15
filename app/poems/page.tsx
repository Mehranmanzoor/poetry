"use client";

import { usePoems } from "@/hooks/use-poems";

export default function PoemsPage() {
  const { poems } = usePoems();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      <header className="mb-10">
        <h1 className="heading-font text-5xl md:text-6xl">
          Poems
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          Read every poem in full here. Each poem is shown directly on this page so visitors can enjoy the complete verse without navigating away.
        </p>
      </header>

      {poems.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-400">
          There are no poems saved yet. Write or add poems first, and they will appear here in full.
        </div>
      ) : (
        <div className="space-y-10">
          {poems.map((poem) => (
            <article
              key={poem.id}
              className="glass overflow-hidden rounded-3xl border border-white/10 shadow-[0_35px_60px_-25px_rgba(15,23,42,0.7)]"
            >
              <div className="bg-gradient-to-br from-purple-700 via-slate-950 to-black p-8">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-purple-200">
                    {poem.category}
                  </span>
                  <h2 className="heading-font text-4xl font-bold text-white">
                    {poem.title}
                  </h2>
                  <p className="text-sm text-slate-300">
                    Written by Moeen • {new Date(poem.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="p-8 text-slate-100 leading-8 whitespace-pre-line">
                {poem.content}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
