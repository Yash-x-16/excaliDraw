"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, UsersIcon, SquareIcon } from "./Icons";
import CollaborativePreview from "./CollaborativePreview";

export default function Hero() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoom = roomId.trim() || "creative-space";
    router.push(`/canvas/${encodeURIComponent(targetRoom)}`);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Multiplayer whiteboard</span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-400">Simultaneous shape sync</span>
          </div>

          {/* Clean Main Title (not overly bold) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 leading-tight">
            Draw and create shapes together in{" "}
            <span className="text-blue-400">collabrativeDraw</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            A collaborative canvas where two or more users can create, position, and manipulate shapes
            at the exact same time. Fast, simple, and built for team brainstorming.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Open Workspace (No Sign-in needed)</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition"
            >
              Create Free Account
            </Link>
          </div>

          {/* Room Launcher Bar */}
          <div className="max-w-sm mx-auto mb-14">
            <form
              onSubmit={handleJoinRoom}
              className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900/90 border border-zinc-800"
            >
              <div className="flex-1 flex items-center px-2.5 gap-2">
                <UsersIcon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room name..."
                  className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none py-1"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition shrink-0"
              >
                Join Room
              </button>
            </form>
          </div>
        </div>

        {/* Live Collaborative Preview */}
        <div id="demo" className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2.5 px-1 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <SquareIcon className="w-3.5 h-3.5 text-zinc-500" />
              <span className="font-medium text-zinc-300">Live Interactive Canvas Preview</span>
            </div>
            <span>Click inside to place shapes &bull; Cursors sync concurrently</span>
          </div>

          <CollaborativePreview />

          {/* Key Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 text-center">
              <span className="text-sm font-semibold text-zinc-200 block">Simultaneous Editing</span>
              <span className="text-xs text-zinc-500">2 or more peers collaborate on the same canvas</span>
            </div>
            <div className="p-4 rounded-lg border border-zinc-800/80 bg-zinc-900/40 text-center">
              <span className="text-sm font-semibold text-blue-400 block">Instant WebSocket Sync</span>
              <span className="text-xs text-zinc-500">Zero perceived latency across connected rooms</span>
            </div>
            <div className="p-4 rounded-lg border border-zinc-800/80 bg-zinc-900/40 text-center">
              <span className="text-sm font-semibold text-zinc-200 block">Clean Architecture</span>
              <span className="text-xs text-zinc-500">Fast 2D canvas with simple shape primitives</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
