import {WebSocketServer} from "ws" ; 
import { WS_PORT} from "@repo/backend-common/secret"
const wss = new WebSocketServer({port:WS_PORT}) ; 

wss.on("error",(e)=>{
    console.log("error in ws",e) ; 
})

wss.on("connection",(socket,request)=>{
    const url = request.url ; 
    if(!url){
        console.log("url not found") ; 
        return
    }
    const queryParam = new URLSearchParams(url.split('?')[1]) ; 
    const token = queryParam.get("token") ; 
    if(!token){
        console.log("token not found") ; 
        return ; 
    }
    console.log("token is : ",token) ; 
     
})