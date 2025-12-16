"use client"

import { Draw } from "@/app/draw/draw";
import { useEffect, useRef } from "react"

interface shapes{
    startX:number,
    startY:number,
    width:number,
    height:number,
}
let allShapes:shapes[]= []
export default function  Canvas(){
    const canvasRef = useRef<null | HTMLCanvasElement>(null) ; 
    useEffect(()=>{
        const canvas= canvasRef.current 
        if(!canvas){
        return 
        }
    const ctx = canvas.getContext("2d") ;  
    if(!ctx){
        return ; 
    }
    Draw(ctx,canvas,allShapes) ; 
    },[canvasRef])
  
    return <canvas ref={canvasRef} height={window.innerHeight} width={window.innerWidth}></canvas>
}


