"use client"

import { WS_URL } from "@/config"
import { useEffect, useState } from "react"


export function RoomCanvas ({roomId}:{
    roomId:string
}){
    const [socket,setSocket]= useState<WebSocket | null>(null)

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}token=`)
        ws.onopen = ()=>{
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            })
        )}
    },[])

    if(!socket){
        return <div>
            connecting to ther server !
        </div>
    }

}