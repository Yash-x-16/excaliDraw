import WebSocket, { WebSocketServer } from "ws"; 
import {WS_PORT} from "@repo/backend-common/secret" 
import { checkAuth } from "./auth/auth";
import {connectDb}from "@repo/db/db"
import {Chat} from "@repo/db/chat"
interface allUsersType{
    userId:String , 
    roomId:String[] , 
    socket:WebSocket
}
const wss = new WebSocketServer({port:WS_PORT})

let allUsers:allUsersType[] = [] ; 
wss.on("error",(e)=>{
    console.log("error occured in ws server",e) ; 
})  

wss.on("connection",async (socket,request)=>{
    await connectDb() ; 
    const url = request.url ; 
    if(!url){
        return 
    }
    const queryParam = new URLSearchParams(url.split('?')[1]) ; 
    const token = queryParam.get("token") 
    if(!token){
        wss.close()
        return   ; 
    }
    socket.on("message",async (data)=>{
        const userId = checkAuth(token as string) ;  
        if(!userId){
            socket.close() 
            return
        }
        allUsers.push({
                userId , 
                roomId:[] , 
                socket
            })
        try {
            const parsedMessage= JSON.parse(data.toString())  ;    
            if(parsedMessage.type==="join"){
                const user  =allUsers.find(x=>x.socket===socket) ; 
                if(!user){
                    return 
                }
                user.roomId.push(parsedMessage.roomId) ; 
            }  
            if(parsedMessage.type==="chat"){
                const roomId = parsedMessage.roomId 
                const message = parsedMessage.message
                allUsers.filter(x=>{
                    if(x.roomId.includes(roomId)){
                        x.socket.send(message)
                    }
                }) ; 
                await Chat.create({
                    userId , 
                    roomId , 
                    text:message 
                 })
            }
            if(parsedMessage.type==="leave"){
               const user =   allUsers.find(x=>x.socket===socket) ; 
               if(!user){
                return
               } 
               user.roomId = user.roomId.filter(x=>x!=parsedMessage.roomId) ; 
            }
        } catch (error) {
            console.log("error in parsing json")
        }
    })
})