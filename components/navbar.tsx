"use client";

import Link from "next/link";
import { Menu, PenTool } from "lucide-react";
import ThemeToggle from "./theme-toggle";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <PenTool size={20} />
          </div>

          <div>
            <h1 className="heading-font text-xl md:text-2xl font-semibold tracking-tight">
              MOHEEN'S POETRY
            </h1>

            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Moeen Mukhtar
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">

          <Link href="/" className="transition hover:text-white">
            Home
          </Link>

          <Link href="/poems" className="transition hover:text-white">
            Poems
          </Link>

          <Link href="/about" className="transition hover:text-white">
            About
          </Link>

          <Link
            href="/admin/login"
            className="px-4 py-2 rounded-2xl bg-white text-black transition hover:bg-slate-100"
          >
            Admin
          </Link>

          <ThemeToggle />

        </div>

        <div className="md:hidden flex items-center gap-3">

          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/20"
              >
                <Menu size={20} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="px-6 py-8">
              <SheetHeader className="border-b border-white/10 pb-4">
                <SheetTitle className="text-lg font-semibold text-white">
                  Menu
                </SheetTitle>
                <SheetDescription className="mt-1 text-sm text-slate-400">
                  Quick navigation for mobile.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-6 text-lg font-medium text-white">
                <Link href="/" className="rounded-2xl px-4 py-3 transition hover:bg-white/5">
                  Home
                </Link>
                <Link href="/poems" className="rounded-2xl px-4 py-3 transition hover:bg-white/5">
                  Poems
                </Link>
                <Link href="/about" className="rounded-2xl px-4 py-3 transition hover:bg-white/5">
                  About
                </Link>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <Link
                  href="/admin/login"
                  className="inline-flex w-full justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-slate-100"
                >
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
