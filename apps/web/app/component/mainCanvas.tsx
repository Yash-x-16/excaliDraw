"use client"

import { useEffect, useRef } from "react"
import { initDraw } from "../draw";

export function MainCanvas({roomId,socket}:{
    roomId:string , 
    socket:WebSocket
}){ 

    const canvasRef = useRef<HTMLCanvasElement>(null) ;
    useEffect(()=>{
        const canvas = canvasRef.current ; 
        if(!canvas){
                return
        } 
        initDraw(canvas,roomId ,socket)
    },[canvasRef])
    return  <canvas ref={canvasRef}  height={window.innerHeight} width={window.innerWidth}></canvas>
}