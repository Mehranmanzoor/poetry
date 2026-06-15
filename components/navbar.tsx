"use client";

import Link from "next/link";
import { Menu, PenTool } from "lucide-react";
import ThemeToggle from "./theme-toggle";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-white/10">
            <PenTool size={20} />
          </div>

          <div>
            <h1 className="heading-font text-xl md:text-2xl font-bold">
              MOHEEN'S POETRY
            </h1>

            <p className="text-xs text-slate-400">
              Moeen Mukhtar
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <Link href="/">Home</Link>

          <Link href="/poems">
            Poems
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link
            href="/admin/login"
            className="
            px-4
            py-2
            rounded-xl
            bg-white
            text-black
            "
          >
            Admin
          </Link>

          <ThemeToggle />

        </div>

        <div className="md:hidden flex items-center gap-3">

          <ThemeToggle />

          <Sheet>

            <SheetTrigger>

              <Menu size={24} />

            </SheetTrigger>

            <SheetContent>

              <div className="flex flex-col gap-6 mt-10">

                <Link href="/">
                  Home
                </Link>

                <Link href="/poems">
                  Poems
                </Link>

                <Link href="/about">
                  About
                </Link>

                <Link href="/admin/login">
                  Admin
                </Link>

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </nav>

    </header>
  );
}
