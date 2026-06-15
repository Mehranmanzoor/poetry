"use client";

import Link from "next/link";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface PoemCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
}

export default function PoemCard({
  title,
  slug,
  excerpt,
  category,
}: PoemCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="
      glass
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      "
    >
      <div
        className="
        h-64
        bg-gradient-to-br
        from-purple-700
        via-slate-800
        to-black
        flex
        items-center
        justify-center
        p-6
        "
      >
        <h2
          className="
          heading-font
          text-3xl
          text-center
          text-white
          "
        >
          {title}
        </h2>
      </div>

      <div className="p-5">

        <span
          className="
          text-xs
          px-3
          py-1
          rounded-full
          bg-purple-600/20
          "
        >
          {category}
        </span>

        <p
          className="
          mt-4
          text-slate-400
          line-clamp-3
          "
        >
          {excerpt}
        </p>

        <div
          className="
          mt-5
          flex
          justify-between
          items-center
          "
        >

          <div className="flex gap-4">

            <Heart
              size={20}
              className="cursor-pointer"
            />

            <MessageCircle
              size={20}
              className="cursor-pointer"
            />

            <Share2
              size={20}
              className="cursor-pointer"
            />

          </div>

          <Bookmark
            size={20}
            className="cursor-pointer"
          />

        </div>

        <Link
          href={`/poems/${slug}`}
          className="
          block
          mt-5
          text-center
          bg-white
          text-black
          py-3
          rounded-xl
          font-semibold
          "
        >
          Read Poem
        </Link>

      </div>
    </motion.div>
  );
}
