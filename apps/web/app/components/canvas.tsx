"use client";

import { canvasManager } from "@/draw/canvasManager";
import { initDraw } from "@/draw/draw";
import { tools } from "@/draw/shapesTypes";
import { Socket } from "dgram";
import { useEffect, useRef, useState } from "react";

export default function Canvas({ roomId }: { roomId: string }) {
  const [selectedShape, setSelectedShape] = useState<tools>("react");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game,setGame] = useState<canvasManager>() 
  // const [socket,setSocket] = useState<WebSocket>()
  
  useEffect(()=>{
    game?.setTool(selectedShape)
  },[selectedShape,game]) 

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;  
      // if(!socket){
      //   return 
      // }
      const g = new canvasManager(canvas,roomId ) 
      setGame(g) ; 
      return ()=>{
          g.destroy()
        }  
    }
  }, [canvasRef, roomId]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Top Center Shape Selection Bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-xl border border-zinc-800 bg-[#0e1117]/90 backdrop-blur-md shadow-xl">
        {/* Rectangle Shape */}
        <button
          type="button"
          onClick={() => setSelectedShape("react")}
          className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
            selectedShape === "react"
              ? "bg-zinc-800 text-blue-400 border border-zinc-700/80 shadow-xs ring-1 ring-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          }`}
          title="Rectangle"
          aria-label="Rectangle"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
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
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
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
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L20 4m0 0H10m10 0v10" />
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
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>

      <canvas
        height={ window.innerHeight }
        ref={canvasRef}
        width={ window.innerWidth }
      />
    </div>
  );
}