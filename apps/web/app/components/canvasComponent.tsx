"use client"
import { useEffect, useState } from "react"
import {WS_URL} from "@repo/backend-common/secret"
import { MainCanvas } from "./mainCanvas";
export const CanvasComponent = ({roomId}:{roomId:string})=>{
    const [socket,setSocket] = useState<WebSocket | null>(null) ; 

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token="asasdasdasdasdasdads"`) 
        ws.onopen = ()=>{
            setSocket(ws) ; 
            ws.send(JSON.stringify({
                roomId , 
                type:"join"
            }))
        }

    },[])  
    
    if(socket===null){
        return <div>
             connecting to the server :) 
          </div>
       } 

    return <MainCanvas roomId={roomId} socket={socket}></MainCanvas>
}