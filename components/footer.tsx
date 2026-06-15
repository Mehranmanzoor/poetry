import Link from "next/link";
import {
  Mail,
  Phone,
  PenTool,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          <div>

            <div className="flex items-center gap-3">

              <div className="p-2 rounded-xl bg-white/10">
                <PenTool size={20} />
              </div>

              <div>
                <h2 className="heading-font text-2xl font-bold">
                  Moheen's Poetry
                </h2>

                <p className="text-slate-400">
                  Poetry by Moeen Mukhtar
                </p>
              </div>

            </div>

            <p className="mt-5 text-slate-400">
              A home for poems, emotions,
              memories and reflections.
            </p>

          </div>

          <div>

            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link href="/">
                Home
              </Link>

              <Link href="/poems">
                Poems
              </Link>

              <Link href="/about">
                About
              </Link>

              <Link href="/contact">
                Contact
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <Mail size={18} />

                <span>
                  moeenmukhtar14@gmail.com
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone size={18} />

                <span>
                  8494011912
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-slate-500">

          © 2026 Moheen's Poetry.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}
