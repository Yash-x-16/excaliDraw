"use client"
import { initDraw } from "@/app/draw"
import { useRef } from "react"
import { useEffect } from "react"

export default function Canvas (){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        const canvas = canvasRef.current ; 
        if(!canvas){
            return
        } 
        initDraw(canvas)
    },[canvasRef])

    return <canvas ref={canvasRef} className="" height={window.innerHeight} width={window.innerWidth}></canvas>
}