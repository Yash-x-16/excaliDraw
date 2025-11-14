"use client"
import {WS_URL} from "@repo/backend-common/secret"
import { useEffect, useState } from "react"; 
import { initDraw } from "../draw";
import { MainCanvas } from "./mainCanvas";
export default function CanvasComponent({roomId}:{roomId:string}){
    
    let [socket,setSocket] = useState<WebSocket | null>(null) ; 
    
    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTE3MGFlYWNlZThkOTQ2Y2NjNTVjYzYiLCJpYXQiOjE3NjMxMTc4MDJ9.vioVtYq55I_DzIAOciabEl95P0QuS0cdyCcNqxZ7IDM`) ;    
     
        ws.onopen = ()=>{
            setSocket(ws) ; 
            ws.send(JSON.stringify({
            type:"join" , 
            roomId , 
        }))
        }
      
    },[])

    if(!socket){
        return <div>
            connecting to the server .. .
        </div>
    }
    return <MainCanvas roomId={roomId} socket={socket}/>
}