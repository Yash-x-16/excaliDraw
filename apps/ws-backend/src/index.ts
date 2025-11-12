import WebSocket, { WebSocketServer } from "ws"; 
import {WS_PORT} from "@repo/backend-common/secret" 
import { isTokenValid } from "./auth/auth";
import {Chat} from "@repo/db/chatModel"
interface User{
    roomId:string[] , 
    socket :WebSocket  , 
    userId:string
}

const wss = new WebSocketServer({port:WS_PORT}) 


const allUser:User[] = []
wss.on("error",(e)=>{
    console.log("error in  ws",e)
})


wss.on("connection", (socket,request)=>{ 
    const url  = request.url ; 

    if(!url){
        socket.close() 
        return ; 
    }

    const queryParam = new URLSearchParams(url.split('?')[1]) 
    const token = queryParam.get('token') ; 
    if(!token){
        socket.close() 
        return 
    } 

  const result =   isTokenValid(token as string) ; 
    
  if(result){ 

    allUser.push({
        socket , 
        roomId:[] , 
        userId:result 
    })
    //socket function starts from here 
    socket.on("message",async (message)=>{ 
        
    const parsedPayload = JSON.parse(message.toString())  
    //event handlers starts from here 

   if(parsedPayload.type==="join"){
        const user = allUser.find(x=>x.socket===socket) ; 
        if(!user){
            return
        }
        user.roomId.push(parsedPayload.room)
    }

    if(parsedPayload.type==="chat"){
        const message= parsedPayload.message ; 
        const roomId = parsedPayload.roomId ; 
        await Chat.create({
            text:message , 
            roomId,
            userId:result
        }) 

        allUser.forEach(x=>{
            if(x.roomId.includes(roomId)){
                x.socket.send(message)
            }
        }) 
        
    }

    })
    }
})

