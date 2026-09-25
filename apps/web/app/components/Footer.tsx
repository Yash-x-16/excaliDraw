import React from "react";
import Link from "next/link";
import { LogoIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#090a0f] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-5 h-5" />
            <span className="font-semibold text-xs text-zinc-300">
              collabrativeDraw
            </span>
            <span className="text-zinc-600 text-xs">&bull;</span>
            <span className="text-xs text-zinc-500">Real-time collaborative whiteboard</span>
          </div>

          <div className="flex items-center gap-5 text-xs text-zinc-400">
            <Link href="/dashboard" className="hover:text-zinc-200 transition">
              Workspace
            </Link>
            <Link href="#features" className="hover:text-zinc-200 transition">
              Features
            </Link>
            <Link href="/signin" className="hover:text-zinc-200 transition">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-zinc-200 transition">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} collabrativeDraw</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>WebSocket server online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
