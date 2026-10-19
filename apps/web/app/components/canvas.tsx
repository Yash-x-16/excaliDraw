"use client";

import { canvasManager } from "@/draw/canvasManager";
import { tools } from "@/draw/shapesTypes";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoIcon } from "./Icons";

const COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Yellow", value: "#eab308" },
  { name: "Orange", value: "#f97316" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
];

export default function Canvas({ roomId }: { roomId: string }) {
  const [selectedShape, setSelectedShape] = useState<tools>("rect");
  const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<canvasManager>();
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        game?.clearCanvas();
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [game]);

  useEffect(() => {
    game?.setTool(selectedShape);
  }, [selectedShape, game]);

  useEffect(() => {
    game?.setColor(selectedColor);
  }, [selectedColor, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const g = new canvasManager(canvas, roomId);
      setGame(g);
      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, roomId]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* Top Left Navigation & Room Info */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2.5 bg-[#0e1117]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800 shadow-lg text-xs">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition">
          <LogoIcon className="w-4 h-4" />
          <span className="font-semibold text-white">collabrativeDraw</span>
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400 font-mono text-[11px] truncate max-w-[120px]">
          #{roomId}
        </span>
      </div>

      {/* Top Center Shape & Color Selection Bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-xl border border-zinc-800 bg-[#0e1117]/90 backdrop-blur-md shadow-2xl">
        {/* Select Tool */}
        <button
          type="button"
          onClick={() => setSelectedShape("select")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "select"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Select tool"
          aria-label="Select tool"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2V10.5L3.5 12L6.33579 9.16421L12.5858 15.4142L15.4142 12.5858L9.16421 6.33579L12 3.5L10.5 2H2Z" />
          </svg>
        </button>

        {/* Rectangle Shape */}
        <button
          type="button"
          onClick={() => setSelectedShape("rect")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "rect"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Rectangle"
          aria-label="Rectangle"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </button>

        {/* Circle Shape */}
        <button
          type="button"
          onClick={() => setSelectedShape("circle")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "circle"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Circle"
          aria-label="Circle"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <circle cx="12" cy="12" r="9" />
          </svg>
        </button>

        {/* Arrow Shape */}
        <button
          type="button"
          onClick={() => setSelectedShape("arrow")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "arrow"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Arrow"
          aria-label="Arrow"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L20 4m0 0H10m10 0v10" />
          </svg>
        </button>

        {/* Line Tool */}
        <button
          type="button"
          onClick={() => setSelectedShape("line")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "line"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Line"
          aria-label="Line"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        {/* Pencil Tool */}
        <button
          type="button"
          onClick={() => setSelectedShape("pencil")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "pencil"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Pencil"
          aria-label="Pencil"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>

        {/* Text Tool */}
        <button
          type="button"
          onClick={() => setSelectedShape("text")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "text"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Text"
          aria-label="Text"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M12 6v14" />
          </svg>
        </button>

        {/* Section Divider */}
        <div className="w-px h-6 bg-zinc-800 mx-1" />

        {/* Color Palette Swatches */}
        <div className="flex items-center gap-1.5 px-1">
          {COLORS.map((c) => {
            const isActive = selectedColor.toLowerCase() === c.value.toLowerCase();
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedColor(c.value)}
                className={`w-5 h-5 rounded-full transition-transform duration-100 flex items-center justify-center relative ${
                  isActive
                    ? "scale-125 ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-900 z-10"
                    : "hover:scale-110 opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.value }}
                title={`Color: ${c.name}`}
                aria-label={`Color: ${c.name}`}
              >
                {isActive && (
                  <span
                    className={`block w-1.5 h-1.5 rounded-full ${
                      c.value === "#ffffff" || c.value === "#eab308" ? "bg-black" : "bg-white"
                    }`}
                  />
                )}
              </button>
            );
          })}

          {/* Custom Color Input */}
          <label
            className="w-5 h-5 rounded-full cursor-pointer relative flex items-center justify-center border border-zinc-700 bg-gradient-to-tr from-pink-500 via-emerald-400 to-blue-500 hover:scale-110 transition-transform"
            title="Custom Color"
          >
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
          </label>
        </div>
      </div>

      <canvas
        height={dimensions.height}
        ref={canvasRef}
        width={dimensions.width}
        className="block cursor-crosshair bg-black"
      />
    </div>
  );
}