"use client"
import { useEffect, useRef } from "react";
import { initDraw } from "./Draw";

export const MainCanvas = ({roomId , socket}:{roomId:string,socket:WebSocket})=>{
    const canvasRef = useRef<HTMLCanvasElement>(null) 
   
  
    useEffect(()=>{
        const canvas = canvasRef.current ; 
          if(!canvas){
        return 
    }
         const ctx = canvas.getContext("2d") ;  
        if(!ctx){
            return 
        } 
        initDraw(canvas,ctx,socket,roomId) ; 
    },[canvasRef])
    return <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef}>
    </canvas>
}