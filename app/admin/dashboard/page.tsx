"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { usePoems } from "@/hooks/use-poems";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { poems, loading: poemsLoading, error, addPoem, deletePoem } = usePoems();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddPoem = async () => {
    if (!title || !content) {
      toast.error("Title and poem content are required.");
      return;
    }

    setPublishing(true);

    try {
      await addPoem({
        title,
        category,
        content,
        slug: title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-"),
        createdAt: new Date().toISOString(),
      });

      setTitle("");
      setCategory("");
      setContent("");
      toast.success("Poem published. It is now visible on the poems page.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to publish poem."
      );
    } finally {
      setPublishing(false);
    }
  };

  const handleDeletePoem = async (id: string) => {
    try {
      await deletePoem(id);
      toast.success("Poem deleted.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete poem."
      );
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto p-8">
        <p>Loading dashboard…</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between mb-10">

        <h1 className="text-5xl heading-font">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-xl"
        >
          Logout
        </button>

      </div>

      <div className="glass p-6 rounded-3xl">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Poem Title"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="Category"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Write your poem..."
          rows={10}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button
          onClick={handleAddPoem}
          disabled={publishing}
          className="
          bg-white
          text-black
          px-6
          py-3
          rounded-xl
          disabled:opacity-60
          "
        >
          {publishing ? "Publishing..." : "Publish Poem"}
        </button>

      </div>

      <div className="mt-12">

        <h2 className="text-3xl mb-6">
          Published Poems
        </h2>

        {poemsLoading ? (
          <p className="text-slate-400">Loading poems...</p>
        ) : poems.length === 0 ? (
          <p className="text-slate-400">
            No poems yet. Publish one above and it will appear here and on the public poems page.
          </p>
        ) : (
          poems.map((poem) => (

            <div
              key={poem.id}
              className="
              glass
              p-5
              rounded-2xl
              mb-4
              "
            >

              <h3 className="text-xl font-bold">
                {poem.title}
              </h3>

              <p>{poem.category}</p>

              <button
                onClick={() =>
                  handleDeletePoem(poem.id)
                }
                className="
                mt-3
                text-red-500
                "
              >
                Delete
              </button>

            </div>

          ))
        )}

      </div>

    </main>
  );
}
