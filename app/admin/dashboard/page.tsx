"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [poems, setPoems] = useState<any[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");

    if (auth !== "true") {
      router.push("/admin/login");
      return;
    }

    const saved = localStorage.getItem("poems");

    if (saved) {
      setPoems(JSON.parse(saved));
    }
  }, [router]);

  const savePoems = (updated: any[]) => {
    setPoems(updated);
    localStorage.setItem(
      "poems",
      JSON.stringify(updated)
    );
  };

  const addPoem = () => {
    if (!title || !content) return;

    const newPoem = {
      id: crypto.randomUUID(),
      title,
      category,
      content,
      slug: title
        .toLowerCase()
        .replace(/\s+/g, "-"),
      createdAt: new Date().toISOString(),
    };

    savePoems([...poems, newPoem]);

    setTitle("");
    setCategory("");
    setContent("");
  };

  const deletePoem = (id: string) => {
    savePoems(
      poems.filter((p) => p.id !== id)
    );
  };

  const logout = () => {
    localStorage.removeItem("admin-auth");
    router.push("/admin/login");
  };

  return (
    <main className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between mb-10">

        <h1 className="text-5xl heading-font">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
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
          onClick={addPoem}
          className="
          bg-white
          text-black
          px-6
          py-3
          rounded-xl
          "
        >
          Publish Poem
        </button>

      </div>

      <div className="mt-12">

        <h2 className="text-3xl mb-6">
          Published Poems
        </h2>

        {poems.map((poem) => (

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
                deletePoem(poem.id)
              }
              className="
              mt-3
              text-red-500
              "
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </main>
  );
}
