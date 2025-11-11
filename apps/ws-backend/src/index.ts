import { WebSocketServer } from "ws"; 
import {WS_PORT} from "@repo/backend-common/secret" 
import { isTokenValid } from "./auth/auth";

const wss = new WebSocketServer({port:WS_PORT}) 

wss.on("error",(e)=>{
    console.log("error in  ws",e)
})


wss.on("connection",(socket,request)=>{ 
    const url  = request.url ; 

    if(!url){
        socket.close() 
        return ; 
    }

    const queryParam = new URLSearchParams(url.split('?')[1]) 
    const token = queryParam.get('token') ; 
    if(!token){
        socket.close()
    } 

  const result =   isTokenValid(token as string) ; 
    
  if(result){

    socket.on("message",()=>{
        socket.send("pong")
    })

    }
})