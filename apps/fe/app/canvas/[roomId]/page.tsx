"use client"

import { Drawing } from "@/app/draw"
import { useEffect, useRef } from "react"

export default function Canvas (){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{

        if(canvasRef.current){
          Drawing(canvasRef.current)
        }

  


    },[canvasRef])

    return <div className="h-screen w-screen bg-white">
        <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef}>
        </canvas>
    </div>

}