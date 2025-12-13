import { WebSocket, WebSocketServer } from "ws";
import {WS_PORT} from "@repo/backend-common/secret"
import { connectDb}from "@repo/db/db"
import {Chat} from "@repo/db/chat"
import { tokenValidator } from "./auth/auth";

interface user {
    userId:string , 
    rooms:string[] , 
    socket:WebSocket
}

let allUsers:user[]= [] ;

const wss = new WebSocketServer({port:WS_PORT}) ; 

wss.on("connection",async(socket,request)=>{
     await connectDb()
    const url = request.url 
    if(!url){
        return ; 
    }
    const queryParam = new URLSearchParams(url.split('?')[1]) ; 
    const token = queryParam.get("token") ; 
    if(!token){
        socket.close() ; 
        return ; 
    }
   const userId =  tokenValidator(token) ;  
   if(userId===null){
    socket.close() 
    return 
   }
 
    allUsers.push({
        userId , 
        rooms:[] , 
        socket
    })
    socket.on("message",async(data)=>{
        try {
            const parsedMessage = JSON.parse(data.toString()) ;  
            if(parsedMessage.type==="join"){
                const user  = allUsers.find(x=>x.socket===socket) ; 
                if(!user){
                    socket.close() ; 
                    return 
                }
                user.rooms.push(parsedMessage.roomId) ; 
            }
            if(parsedMessage.type==="chat"){
                const message = parsedMessage.message ; 
                const roomId = parsedMessage.roomId ;  
                await Chat.create({
                    adminId:userId , 
                    text:message , 
                    roomId
                })
                allUsers.find(x=>{
                    if(x.rooms.includes(roomId)){
                        wss.clients.forEach((clients)=>{//by using wss.client.send ensuring that the message 
                            if(clients !== socket){// sent by sender does not recieved by himself ...
                                clients.send(message) ; 
                            }
                        })
                    }
                })
            }
            if(parsedMessage.type==="leave"){
                const user = allUsers.find(x=>x.socket ===socket) ; 
                if(!user){
                    socket.close() ; 
                    return ; 
                }
                user.rooms.filter(x=> x != parsedMessage.roomId) ; 
            }
        } catch (error) {
            console.log("error in parsing json",error) ; 
        }
    })
   }
)

wss.on("error",()=>{
    console.log("error in ws server") ; 
})