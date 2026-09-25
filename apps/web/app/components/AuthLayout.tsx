import React from "react";
import Link from "next/link";
import { LogoIcon, CheckIcon } from "./Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-[#090a0f] text-zinc-100 font-sans">
      {/* Form side */}
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-12 py-8 max-w-lg mx-auto w-full">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <LogoIcon className="w-5 h-5" />
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-blue-400 transition">
              collabrativeDraw
            </span>
          </Link>
        </div>

        <div className="my-auto py-8">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{title}</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">{subtitle}</p>
          </div>

          {children}
        </div>

        <div className="pt-4 border-t border-zinc-800/80 text-xs text-zinc-500 flex items-center justify-between">
          <Link href="/" className="hover:text-zinc-300 transition">
            &larr; Back to landing page
          </Link>
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 transition">
            Direct Workspace &rarr;
          </Link>
        </div>
      </div>

      {/* Clean side information panel for desktop */}
      <div className="hidden lg:flex flex-1 relative bg-[#0d0f15] border-l border-zinc-800/80 p-12 items-center justify-center">
        <div className="max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Real-time Multi-User Whiteboard</span>
          </div>

          <h2 className="text-xl font-semibold text-white leading-snug">
            Create, brainstorm, and use shapes together at the same time.
          </h2>

          <p className="text-xs text-zinc-400 leading-relaxed">
            collabrativeDraw lets two or more collaborators join a room and build system diagrams,
            wireframes, and shapes with instant synchronization.
          </p>

          <div className="space-y-2.5 pt-2">
            {[
              "Concurrent shape placement & manipulation",
              "Instant room links with zero friction",
              "Lightweight HTML5 2D canvas engine",
              "Room history and workspace preview",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Clean room indicator badge */}
          <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <div>
                <span className="text-xs font-medium text-white block">Current Room: #creative-space</span>
                <span className="text-[11px] text-zinc-400">3 peers connected live</span>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-medium text-blue-400 hover:text-blue-300 transition"
            >
              Preview &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
