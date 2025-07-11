"use client"

import { Drawing } from "@/app/draw"
import { WS_URL } from "@/config"
import { useEffect, useRef, useState } from "react"
export function Canvas ({roomId}:{
    roomId:string
}){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [socket,setSocket]= useState<WebSocket | null>(null)

    useEffect(()=>{
        const ws = new WebSocket(WS_URL)
        ws.onopen = ()=>{
            setSocket(ws)
        }
    },[])
    useEffect(()=>{

        if(canvasRef.current){
          Drawing(canvasRef.current,roomId)
        }

    },[canvasRef])

    if(!socket){
        return <div>
            connecting to ther server !
        </div>
    }

    return <div className="h-screen w-screen bg-white">
        <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef}>
        </canvas>
    </div>
}