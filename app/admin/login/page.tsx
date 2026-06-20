"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        "Invalid credentials. Make sure the account exists in Firebase Auth."
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={handleLogin}
        className="
        glass
        w-full
        max-w-md
        p-8
        rounded-3xl
        "
      >

        <h1
          className="
          text-4xl
          heading-font
          mb-6
          text-center
          "
        >
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          border
          p-3
          rounded-xl
          mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          border
          p-3
          rounded-xl
          mb-4
          "
        />

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="
          w-full
          bg-white
          text-black
          py-3
          rounded-xl
          font-semibold
          "
        >
          Login
        </button>

      </form>

    </main>
  );
}
