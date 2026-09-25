"use client"
import { useEffect, useState } from "react";
import Canvas from "./canvas";

export default function RoomCanvas({roomId}:{
    roomId:string
}){
    const [socket ,setSocket] = useState<WebSocket | null>(null)
    
    // useEffect(()=>{
    //     const ws= new WebSocket("") ;
    //     ws.onopen= ()=>{
    //         setSocket(ws) ;
    //     }  
    // },[]) ; 

    // if(!socket){
    //     return <div>
    //         connecting to server ... 
    //     </div>
    // }
    return <Canvas roomId={roomId}/>
}