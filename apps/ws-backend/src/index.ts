import {WebSocket, WebSocketServer} from "ws" ; 
import { WS_PORT} from "@repo/backend-common/secret" 
import { verifyToken } from "./auth/auth";
import {Chat} from "@repo/db/Chat"
import {connectDb} from "@repo/db/db"
const wss = new WebSocketServer({port:WS_PORT}) ; 

interface allUsers{
    userId:string , 
    room:string[] , 
    socket:WebSocket
}

let allUser:allUsers[] =[] ; 

wss.on("connection",async(socket,request)=>{ 
    const host  = await connectDb() 
    console.log("ws is connected with db at",host)
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
    const userId = verifyToken(token as string) ; 
    if(!userId){
        socket.close() ; 
        return 
    }
    if(userId){ 
        allUser.push({
            socket , 
            room:[] , 
            userId
        })

        socket.on("message",async(data)=>{
           try {
                const parsedMessage = JSON.parse(data.toString()) ; 
                
                if(parsedMessage.type==="join"){
                   const user = allUser.find(x=>x.socket===socket) ; 
                   if(!user){
                    console.log("user not found from allusers")
                    return ; 
                   } 
                   user.room.push(parsedMessage.roomId) ; 
                }

                if(parsedMessage.type==="chat"){
                    const message = parsedMessage.message 
                    const roomId = parsedMessage.roomId
                    await Chat.create({
                        userId , 
                        message , 
                        roomId
                    })
                    allUser.find((x)=>{
                        if(x.room.includes(roomId)){
                            x.socket.send(message) ; 
                        }
                    })
                } 

                if(parsedMessage.type==="leave"){
                    const user = allUser.find(x=>x.socket===socket) ; 
                    if(!user){
                        console.log("user not found")
                        return 
                    }
                    user.room.filter(x=>x!=parsedMessage.roomId) ;  
                }
           } catch (error) {
            console.log("error in parsing the message",error) ; 
           } 
        })
        
    }else{
        console.log("userId not found") ; 
        return 
    }
})


wss.on("error",(e)=>{
    console.log("error in ws",e) ; 
})
