"use client";

import React, { useState, useEffect } from "react";
import {
  SquareIcon,
  CircleIcon,
  CursorPointerIcon,
} from "./Icons";

interface PreviewShape {
  id: string;
  type: "rect" | "circle" | "note";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  borderColor: string;
  text?: string;
  author: string;
}

export default function CollaborativePreview() {
  const [activeTool, setActiveTool] = useState<"rect" | "circle" | "note">("rect");
  const [selectedColor, setSelectedColor] = useState("#3b82f6");

  // Simulated peer cursors
  const [cursorAlex, setCursorAlex] = useState({ x: 170, y: 110 });
  const [cursorSarah, setCursorSarah] = useState({ x: 410, y: 190 });

  // Initial shapes
  const [shapes, setShapes] = useState<PreviewShape[]>([
    {
      id: "1",
      type: "rect",
      x: 60,
      y: 60,
      width: 130,
      height: 75,
      color: "rgba(59, 130, 246, 0.08)",
      borderColor: "#3b82f6",
      text: "Auth Gateway",
      author: "Alex",
    },
    {
      id: "2",
      type: "circle",
      x: 240,
      y: 65,
      width: 80,
      height: 80,
      color: "rgba(16, 185, 129, 0.08)",
      borderColor: "#10b981",
      text: "WebSocket",
      author: "Sarah",
    },
    {
      id: "3",
      type: "rect",
      x: 370,
      y: 60,
      width: 140,
      height: 75,
      color: "rgba(139, 92, 246, 0.08)",
      borderColor: "#8b5cf6",
      text: "Canvas Sync",
      author: "Alex",
    },
    {
      id: "4",
      type: "note",
      x: 170,
      y: 190,
      width: 170,
      height: 85,
      color: "rgba(245, 158, 11, 0.08)",
      borderColor: "#f59e0b",
      text: "Simultaneous shapes sync across users",
      author: "Sarah",
    },
  ]);

  // Peer cursor movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorAlex((prev) => ({
        x: Math.max(40, Math.min(480, prev.x + (Math.random() * 20 - 10))),
        y: Math.max(40, Math.min(260, prev.y + (Math.random() * 16 - 8))),
      }));
      setCursorSarah((prev) => ({
        x: Math.max(90, Math.min(500, prev.x + (Math.random() * 18 - 9))),
        y: Math.max(50, Math.min(270, prev.y + (Math.random() * 20 - 10))),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newShape: PreviewShape = {
      id: Date.now().toString(),
      type: activeTool,
      x: Math.max(20, Math.min(rect.width - 120, clickX - 50)),
      y: Math.max(20, Math.min(rect.height - 70, clickY - 35)),
      width: activeTool === "circle" ? 75 : 105,
      height: activeTool === "circle" ? 75 : 65,
      color: `${selectedColor}18`,
      borderColor: selectedColor,
      text: activeTool === "note" ? "New Idea" : "Rectangle",
      author: "You",
    };

    setShapes((prev) => [...prev.slice(-6), newShape]);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0c0e14] shadow-md overflow-hidden">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-zinc-800 bg-[#0e1017]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400 pl-2 border-l border-zinc-800">
            #collab-room-01
          </span>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTool("rect")}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition ${
              activeTool === "rect"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <SquareIcon className="w-3.5 h-3.5" />
            <span>Rectangle</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool("circle")}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition ${
              activeTool === "circle"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <CircleIcon className="w-3.5 h-3.5" />
            <span>Circle</span>
          </button>

          {/* Color picks */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-800 ml-1">
            {[
              { color: "#3b82f6", label: "Blue" },
              { color: "#10b981", label: "Emerald" },
              { color: "#f59e0b", label: "Amber" },
              { color: "#8b5cf6", label: "Purple" },
            ].map((c) => (
              <button
                key={c.color}
                type="button"
                onClick={() => setSelectedColor(c.color)}
                style={{ backgroundColor: c.color }}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  selectedColor === c.color ? "scale-125 ring-1 ring-white" : "opacity-70 hover:opacity-100"
                }`}
                title={c.label}
              />
            ))}
          </div>
        </div>

        {/* Peer avatars */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            <span
              className="w-5 h-5 rounded-full bg-purple-600 text-[9px] font-medium text-white flex items-center justify-center border border-zinc-900"
              title="Alex (Online)"
            >
              A
            </span>
            <span
              className="w-5 h-5 rounded-full bg-emerald-600 text-[9px] font-medium text-white flex items-center justify-center border border-zinc-900"
              title="Sarah (Online)"
            >
              S
            </span>
            <span
              className="w-5 h-5 rounded-full bg-blue-600 text-[9px] font-medium text-white flex items-center justify-center border border-zinc-900"
              title="You (Active)"
            >
              Y
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShapes([])}
            className="text-[11px] text-zinc-500 hover:text-zinc-300"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Interactive Canvas Area */}
      <div
        onClick={handleCanvasClick}
        className="relative w-full h-[320px] sm:h-[380px] bg-[#090b10] cursor-crosshair overflow-hidden select-none draft-grid"
      >
        <div className="absolute bottom-3 left-3 pointer-events-none text-[11px] text-zinc-500 bg-zinc-900/90 px-2.5 py-1 rounded border border-zinc-800">
          Click canvas to place a shape &bull; Peer cursors live
        </div>

        {/* Rendered shapes */}
        {shapes.map((s) => (
          <div
            key={s.id}
            style={{
              transform: `translate(${s.x}px, ${s.y}px)`,
              width: `${s.width}px`,
              height: `${s.height}px`,
              backgroundColor: s.color,
              borderColor: s.borderColor,
            }}
            className={`absolute flex flex-col items-center justify-center border transition-all duration-150 ${
              s.type === "circle" ? "rounded-full" : "rounded-md"
            }`}
          >
            <span className="text-[11px] font-medium text-zinc-300 px-2 text-center pointer-events-none">
              {s.text}
            </span>
            <span className="text-[9px] text-zinc-500 font-mono mt-0.5">
              by {s.author}
            </span>
          </div>
        ))}

        {/* Peer Cursor 1: Alex */}
        <div
          className="absolute z-30 pointer-events-none transition-all duration-700 ease-out"
          style={{
            transform: `translate(${cursorAlex.x}px, ${cursorAlex.y}px)`,
          }}
        >
          <CursorPointerIcon className="w-4 h-4 text-purple-400" />
          <div className="ml-2.5 -mt-1 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-[10px] font-medium whitespace-nowrap">
            Alex <span className="text-zinc-500 text-[9px]">&bull; drawing</span>
          </div>
        </div>

        {/* Peer Cursor 2: Sarah */}
        <div
          className="absolute z-30 pointer-events-none transition-all duration-700 ease-out"
          style={{
            transform: `translate(${cursorSarah.x}px, ${cursorSarah.y}px)`,
          }}
        >
          <CursorPointerIcon className="w-4 h-4 text-emerald-400" />
          <div className="ml-2.5 -mt-1 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-[10px] font-medium whitespace-nowrap">
            Sarah <span className="text-zinc-500 text-[9px]">&bull; moving</span>
          </div>
        </div>
      </div>
    </div>
  );
}
