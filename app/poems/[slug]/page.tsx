"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePoems } from "@/hooks/use-poems";

export default function PoemDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const { poems, loading, error } = usePoems();

  const poem = poems.find((item) => item.slug === slug);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-slate-400">Loading poem...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-red-200">
          <p className="font-semibold">Could not load poem</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      </main>
    );
  }

  if (!poem) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="heading-font text-4xl mb-4">Poem not found</h1>
        <p className="text-slate-400 mb-8">
          This poem may have been removed or the link is incorrect.
        </p>
        <Link
          href="/poems"
          className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold"
        >
          Back to Poems
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link
        href="/poems"
        className="text-sm text-slate-400 hover:text-white transition-colors"
      >
        ← Back to Poems
      </Link>

      <header className="mt-6 mb-8">
        <span className="text-xs px-3 py-1 rounded-full bg-purple-600/20">
          {poem.category}
        </span>
        <h1 className="heading-font text-5xl mt-4">{poem.title}</h1>
      </header>

      <article className="glass rounded-3xl border border-white/10 p-8">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-slate-200">
          {poem.content}
        </p>
      </article>
    </main>
  );
}
