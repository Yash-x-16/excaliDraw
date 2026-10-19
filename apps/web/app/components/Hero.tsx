"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, UsersIcon } from "./Icons";
import CollaborativePreview from "./CollaborativePreview";

export default function Hero() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const targetRoom = roomId.trim() || "creative-space";
    if (!token) {
      router.push(`/signin?redirect=/canvas/${encodeURIComponent(targetRoom)}`);
      return;
    }
    router.push(`/canvas/${encodeURIComponent(targetRoom)}`);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* GitHub Star Pill Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-medium hover:bg-amber-500/20 transition cursor-pointer">
            <svg className="w-4 h-4 fill-current text-amber-400" viewBox="0 0 24 24">
              <path d="M12 17.75l-6.172 3.245 1.179-6.873-5-4.867 6.9-1 3.086-6.253 3.086 6.253 6.9 1-5 4.867 1.179 6.873z" />
            </svg>
            <span>Give us a star on GitHub</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300">Free &amp; Open Source</span>
          </div>

          {/* Excalidraw Iconic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-5 leading-[1.1]">
            Online <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 font-serif">Whiteboard</span> made simple
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Ideate, Collaborate, Share. Simply with <strong className="text-zinc-200 font-medium">collabrative draw</strong>.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
            <Link
              href="/canvas/creative-space"
              className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-lg shadow-blue-600/25 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <span>Start drawing</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <Link
              href="/signup"
              className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white font-medium text-sm transition relative group flex items-center gap-2"
            >
              <span>Try collabrative draw</span>
              <span className="text-[11px] text-emerald-400 font-normal">Free trial</span>
            </Link>
          </div>

          {/* Quick Room Launcher Bar */}
          <div className="max-w-md mx-auto mb-14">
            <form
              onSubmit={handleJoinRoom}
              className="flex items-center gap-2 p-1.5 rounded-full bg-[#12151d] border border-zinc-800 shadow-xl"
            >
              <div className="flex-1 flex items-center px-3.5 gap-2.5">
                <UsersIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room name (e.g. system-design)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none py-1"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-medium transition shrink-0 border border-zinc-700"
              >
                Join Room
              </button>
            </form>
            <p className="text-[11px] text-zinc-500 mt-2 text-center">
              No account is needed to join. Real-time multiplayer synchronization.
            </p>
          </div>
        </div>

        {/* Excalidraw Editor Playground Window */}
        <div id="demo" className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-zinc-800 bg-[#0e1117] shadow-2xl overflow-hidden">
            {/* Browser top chrome */}
            <div className="h-10 border-b border-zinc-800/80 bg-[#12151d] px-4 flex items-center justify-between">
              {/* Colored Window Dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#eab308]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 inline-block" />
              </div>

              {/* Centered URL pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-600">https://</span>
                <span className="text-zinc-200">collabrative-draw.com</span>
                <span className="text-blue-400">/canvas/creative-space</span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Multiplayer</span>
              </div>
            </div>

            {/* Simulated Excalidraw Tool Rack */}
            <div className="py-2.5 px-4 bg-[#090a0f] border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1 mx-auto bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl">
                <span className="p-1.5 rounded-lg text-blue-400 bg-zinc-800 border border-zinc-700/80 text-xs">
                  Selection
                </span>
                <span className="p-1.5 rounded-lg text-zinc-400 text-xs">Rectangle</span>
                <span className="p-1.5 rounded-lg text-zinc-400 text-xs">Diamond</span>
                <span className="p-1.5 rounded-lg text-zinc-400 text-xs">Ellipse</span>
                <span className="p-1.5 rounded-lg text-zinc-400 text-xs">Arrow</span>
                <span className="p-1.5 rounded-lg text-zinc-400 text-xs">Line</span>
                <span className="p-1.5 rounded-lg text-zinc-400 text-xs">Draw</span>
                <span className="p-1.5 rounded-lg text-zinc-400 text-xs">Text</span>
              </div>
            </div>

            {/* Interactive Canvas Canvas */}
            <div className="relative">
              <CollaborativePreview />
            </div>
          </div>
        </div>

        {/* Trusted by companies section */}
        <div className="mt-16 pt-12 border-t border-zinc-800/60 text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-6">
            Trusted by developers and creators at leading tech companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 hover:opacity-90 transition-opacity">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Netflix</span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Meta</span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Microsoft</span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Stripe</span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Supabase</span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Reddit</span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Intel</span>
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-400">Netlify</span>
          </div>
        </div>

        {/* Say hi to collabrative draw callout */}
        <div className="mt-20 py-12 px-6 rounded-2xl bg-gradient-to-b from-[#12151e] to-[#0c0e14] border border-zinc-800 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Free &amp; Open Source</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
            Say hi to <span className="text-blue-400">collabrative draw</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mb-6">
            No account is needed. Just open a whiteboard and start sketching diagrams with zero friction.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/canvas/creative-space"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition shadow-sm"
            >
              Start drawing
            </Link>
            <Link
              href="/signin"
              className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 font-medium text-xs sm:text-sm transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
