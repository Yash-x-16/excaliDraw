import { WebSocket, WebSocketServer } from "ws"; 
import {WS_PORT} from "@repo/backend-common/secret" 
import { tokenAuth } from "./auth/wsAuth";

interface Users{
    socket:WebSocket , 
    rooms:string[] , 
    userId:string 
}

const wss = new WebSocketServer({port:WS_PORT}) ; 

let allUsers:Users[] = [] 

wss.on("error",(error)=>{
    console.log("error in the ws server",error)
})

wss.on("connection",(socket,request)=>{
    const searchUrl = request.url 
    if(!searchUrl){ 
        wss.close() ; 
        return 
    }
    
    const queryParam = new URLSearchParams(searchUrl.split('?')[1])  ; 
    const token = queryParam.get("token") ; 
    if(!token){
        wss.close() 
        return ; 
    }
    const userId = tokenAuth(token as string) ; 
    if(userId){ 
        allUsers.push({
            userId , 
            socket , 
            rooms:[]
        }) ; 

        socket.on("message",(data)=>{
            const parsedMessage = JSON.parse(data.toString()) ; 
            if(parsedMessage.type==="join"){
                const user = allUsers.find(x=>x.socket===socket) ; 
                if(!user){
                    return 
                }
                user.rooms.push(parsedMessage.roomId) ; 
            }
            if(parsedMessage.type==="chat"){
                const roomId = parsedMessage.roomId ; 
                const message = parsedMessage.message ; 
                const user = allUsers.find(x=>{
                    if(x.rooms.includes(roomId)){
                        x.socket.send(message) ; 
                    }
                })
            }
            if(parsedMessage.type==="leave"){
                const user  = allUsers.find(x=>x.socket===socket) ; 
                if(!user)
                    return 
                user.rooms.filter(x=>x != parsedMessage.roomId) ; 
            }
        })
    } 
})