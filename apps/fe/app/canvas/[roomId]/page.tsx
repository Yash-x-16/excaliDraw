"use client"
import { initDraw } from "@/app/draw"
import { useEffect, useRef } from "react"

 

export default function Canvas (){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        const canvas = canvasRef.current 
        if(!canvas){
            return
        }
        const ctx = canvas.getContext("2d") 
                if(!ctx){
            return
        } 

      initDraw(ctx,canvas) 

    },[canvasRef])

    return <canvas height={window.innerHeight}ref={canvasRef} width={window.innerWidth}></canvas>
}