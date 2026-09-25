"use client"
import { initDraw } from "@/draw/draw";
import { useEffect, useRef } from "react";

export default function Canvas({roomId}:{
    roomId:string
}){ 
     const canvasRef = useRef<HTMLCanvasElement>(null) ;  
    useEffect(()=>{
        if(canvasRef.current){ 
            const canvas = canvasRef.current 
           
           initDraw(canvas,roomId) ; 
        }
    },[canvasRef])
     return <div>
        <canvas  height={window.innerHeight} ref={canvasRef} width={window.innerWidth} ></canvas>
    </div>
}