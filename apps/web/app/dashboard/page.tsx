"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogoIcon,
  UsersIcon,
  PlusIcon,
  ShareIcon,
  CopyIcon,
  CheckIcon,
  ClockIcon,
  SettingsIcon,
  LogOutIcon,
  GridIcon,
  ArrowRightIcon,
} from "../components/Icons";

interface RoomItem {
  id: string;
  name: string;
  shapesCount: number;
  updatedAt: string;
  collaborators: { name: string; color: string }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [currentRoom, setCurrentRoom] = useState("creative-space");
  const [newRoomInput, setNewRoomInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Sample recent rooms for this workspace
  const [rooms, setRooms] = useState<RoomItem[]>([
    {
      id: "creative-space",
      name: "Current Active Room: Creative Space",
      shapesCount: 34,
      updatedAt: "Active now",
      collaborators: [
        { name: "You", color: "#3b82f6" },
        { name: "Alex", color: "#8b5cf6" },
        { name: "Sarah", color: "#10b981" },
      ],
    },
    {
      id: "architecture-v2",
      name: "Distributed System Architecture",
      shapesCount: 68,
      updatedAt: "25 minutes ago",
      collaborators: [
        { name: "Devon", color: "#f59e0b" },
        { name: "Sarah", color: "#10b981" },
      ],
    },
    {
      id: "sprint-wireframes",
      name: "Mobile App Wireframe Sketches",
      shapesCount: 19,
      updatedAt: "2 hours ago",
      collaborators: [{ name: "Alex", color: "#8b5cf6" }],
    },
    {
      id: "brainstorm-session",
      name: "Product Roadmap Ideation",
      shapesCount: 42,
      updatedAt: "Yesterday",
      collaborators: [
        { name: "Mia", color: "#ec4899" },
        { name: "You", color: "#3b82f6" },
      ],
    },
  ]);

  const handleCopyLink = (roomId: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/canvas/${roomId}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreateOrJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const target = newRoomInput.trim() || `room-${Date.now().toString().slice(-4)}`;
    router.push(`/canvas/${encodeURIComponent(target)}`);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#0d0f15]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Left: Brand & Workspace */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <LogoIcon className="w-6 h-6" />
              <span className="font-semibold text-sm tracking-tight text-white group-hover:text-blue-400 transition">
                collabrativeDraw
              </span>
            </Link>

            <span className="text-zinc-600">/</span>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-300 font-medium">Workspace</span>
            </div>
          </div>

          {/* Center: Current Room Quick Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-zinc-400">Current Room:</span>
            <Link
              href={`/canvas/${currentRoom}`}
              className="font-mono text-blue-400 bg-blue-950/40 border border-blue-800/40 px-2 py-0.5 rounded hover:bg-blue-900/40 transition flex items-center gap-1"
            >
              <span>#{currentRoom}</span>
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-3">
            <Link
              href={`/canvas/${currentRoom}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              <span>Enter Canvas</span>
            </Link>

            {/* Profile Dropdown Component */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-zinc-700 bg-zinc-800/70 hover:bg-zinc-800 transition focus:outline-none"
                aria-label="User Profile"
              >
                {/* Profile Icon with status */}
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-medium">
                    YD
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-zinc-900"></span>
                </div>
                <span className="text-xs font-medium text-zinc-300 hidden sm:inline">Yash</span>
                <svg
                  className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-zinc-800 bg-[#12151d] shadow-2xl p-2 z-50 text-xs">
                  {/* User details */}
                  <div className="px-3 py-2.5 border-b border-zinc-800/80 mb-1">
                    <p className="font-semibold text-zinc-200">Yash</p>
                    <p className="text-zinc-400 text-[11px] truncate">yash@example.com</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Online &bull; Ready to collaborate</span>
                    </div>
                  </div>

                  {/* Room status */}
                  <div className="px-3 py-2 bg-zinc-900/60 rounded-lg border border-zinc-800 mb-2">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider block">
                      Active Room
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-300 font-medium">#{currentRoom}</span>
                      <Link
                        href={`/canvas/${currentRoom}`}
                        onClick={() => setProfileOpen(false)}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        Join &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Menu options */}
                  <div className="space-y-0.5">
                    <Link
                      href="/"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition"
                    >
                      <GridIcon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Back to Landing Page</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        alert("Settings modal: Custom canvas settings, grid snap, and keybindings.");
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition"
                    >
                      <SettingsIcon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Preferences &amp; Canvas Settings</span>
                    </button>
                    <Link
                      href="/signin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-950/30 transition"
                    >
                      <LogOutIcon className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Whiteboard Workspace
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select an active room or launch a new shared canvas to draw shapes simultaneously.
            </p>
          </div>

          {/* Quick Room Jump Form */}
          <form onSubmit={handleCreateOrJoin} className="flex items-center gap-2">
            <input
              type="text"
              value={newRoomInput}
              onChange={(e) => setNewRoomInput(e.target.value)}
              placeholder="Enter room name..."
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 w-44 sm:w-56"
            />
            <button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition active:scale-95"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              <span>Launch</span>
            </button>
          </form>
        </div>

        {/* Current Active Room Banner Card */}
        <section className="rounded-xl border border-zinc-800 bg-[#0e1117] p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Current Active Room
                </span>
                <span className="font-mono text-xs text-zinc-400">ID: {currentRoom}</span>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Creative Space Whiteboard
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Collaborative shape canvas with live multi-user synchronization.
                </p>
              </div>

              {/* Active Collaborators */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <UsersIcon className="w-3.5 h-3.5 text-zinc-400" />
                  Collaborators:
                </span>
                <div className="flex items-center gap-1.5">
                  {[
                    { name: "You", color: "#3b82f6" },
                    { name: "Alex (Drawing)", color: "#8b5cf6" },
                    { name: "Sarah (Editing)", color: "#10b981" },
                  ].map((peer, i) => (
                    <span
                      key={i}
                      style={{ borderColor: peer.color }}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-zinc-900 border text-zinc-300"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: peer.color }}
                      ></span>
                      {peer.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start md:self-center">
              <button
                type="button"
                onClick={() => handleCopyLink(currentRoom)}
                className="px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    <span>Copy Room Link</span>
                  </>
                )}
              </button>

              <Link
                href={`/canvas/${currentRoom}`}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white flex items-center gap-1.5 transition shadow-sm"
              >
                <span>Enter Canvas</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Rooms Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-200 tracking-tight flex items-center gap-2">
              <GridIcon className="w-4 h-4 text-zinc-400" />
              Recent Shared Rooms
            </h3>
            <span className="text-xs text-zinc-500">{rooms.length} rooms available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => {
              const isSelected = room.id === currentRoom;
              return (
                <div
                  key={room.id}
                  className={`rounded-xl border transition p-4.5 flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-900/80 bg-[#0f131c]"
                      : "border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-blue-400 font-medium">
                          #{room.id}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-400 border border-blue-800/50">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                        <ClockIcon className="w-3 h-3 text-zinc-500" />
                        <span>{room.updatedAt}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-white">{room.name}</h4>

                    <p className="text-xs text-zinc-400 mt-1">
                      {room.shapesCount} shapes drawn &bull; Multi-user synced
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    {/* Collaborator dots */}
                    <div className="flex items-center -space-x-1.5">
                      {room.collaborators.map((c, idx) => (
                        <div
                          key={idx}
                          title={c.name}
                          style={{ backgroundColor: c.color }}
                          className="w-5 h-5 rounded-full border border-zinc-900 text-[9px] font-bold text-white flex items-center justify-center"
                        >
                          {c.name.slice(0, 1)}
                        </div>
                      ))}
                    </div>

                    {/* Join / select action */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentRoom(room.id)}
                        className={`text-xs px-2.5 py-1 rounded transition ${
                          isSelected
                            ? "text-zinc-500 cursor-default"
                            : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                        }`}
                      >
                        {isSelected ? "Active" : "Set as Current"}
                      </button>
                      <Link
                        href={`/canvas/${room.id}`}
                        className="text-xs px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition flex items-center gap-1"
                      >
                        <span>Join</span>
                        <ArrowRightIcon className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Tips on Multi-User Drawing */}
        <section className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5">
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Simultaneous Shape Usage
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            In <span className="text-zinc-200 font-medium">collabrativeDraw</span>, any user can open the same room
            link in another tab or send it to a friend. Shapes created on one screen will appear on the other in real time.
            Try opening your current room <span className="font-mono text-blue-400">#{currentRoom}</span> in two separate browser windows to test live drawing!
          </p>
        </section>
      </main>
    </div>
  );
}
