"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

      {/* Blur Effects */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <div className="max-w-4xl text-center">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              heading-font
              text-6xl
              md:text-8xl
              font-bold
              text-white
            "
          >
            Moheen's Poetry
          </motion.h1>

          <div className="mt-8 text-2xl text-slate-300">

            <TypeAnimation
              sequence={[
                "Words that heal the soul",
                2000,
                "Poetry beyond silence",
                2000,
                "Verses from the heart",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />

          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="
              mt-8
              text-lg
              text-slate-400
              max-w-2xl
              mx-auto
            "
          >
            A collection of poems, emotions,
            memories and reflections written
            by Moeen.
          </motion.p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              href="/poems"
              className="
                rounded-xl
                bg-white
                px-6
                py-3
                text-black
                font-semibold
                hover:scale-105
                transition
              "
            >
              Read Poems
            </Link>

            <Link
              href="/about"
              className="
                rounded-xl
                border
                border-white/30
                px-6
                py-3
                text-white
                hover:bg-white/10
                transition
              "
            >
              About Author
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
