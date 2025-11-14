import {WebSocket, WebSocketServer} from "ws";
import {WS_PORT} from "@repo/backend-common/secret" 
import { isTokenValid } from "./auth/auth"; 
import {Chat}from "@repo/db/chatModel"  
import {Room} from  "@repo/db/roomModel"
import {connectDb} from "@repo/db/db"
const wss = new WebSocketServer({port:WS_PORT}) 
interface User{
    roomId:string[] , 
    userId:string , 
    socket:WebSocket
}
let allUser:User[] = []

wss.on("error",(e)=>{
    console.log("error in the ws")
}) ; 

wss.on("connection",(socket,request)=>{
    const url = request.url ; 
    if(!url){
        wss.close() 
        return 
    }
    const queryParam = new URLSearchParams(url.split('?')[1]) ; 
    const token = queryParam.get("token") ; 
    if(!token){
        wss.close()
        return 
    } 
    const result = isTokenValid(token) ;  
    if(result===null){
        wss.close()
        return 
    }
        
    if(result){
        allUser.push({
            userId:result , 
            roomId:[] , 
            socket
        })
        socket.on("message",async(data)=>{
            await connectDb()
            const parsedMessage = JSON.parse(data.toString()) ;  
            console.log("parsed message is ",parsedMessage)
            if(parsedMessage.type==="join"){ 
                console.log("user reached is :)") ; 
                const user  = allUser.find(x=>x.socket===socket) ;  
              
                if(!user){
                    return 
                }
                user.roomId.push(parsedMessage.roomId) ; 
            }

            if(parsedMessage.type==="chat"){ 
                const message = parsedMessage.message ; 
                const roomId = parsedMessage.roomId ; 
                try {
                  const chats =   await Chat.create({
                    userId:result , 
                    roomId , 
                    text:message
                })

                await Room.findByIdAndUpdate(roomId,{$push:{
                    chats
                }})  

                } catch (error) {
                    console.log("error in connection in db",error)
                }
              
                allUser.forEach(x=>{
                    if(x.roomId.includes(roomId)){
                        x.socket.send(JSON.stringify({
                            type:"chat" , 
                            message , 
                            roomId
                        }))
                    }
                })
            }
            if(parsedMessage.type==="leave"){
                const user = allUser.find(x=>x.socket===socket) ; 
                if (!user) {
                    return
                }
                user.roomId = user.roomId.filter(x=>x!=parsedMessage.roomId) ; 
            }
        })
    }
})