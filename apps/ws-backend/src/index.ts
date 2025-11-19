import {WebSocket, WebSocketServer} from "ws"; 
import {WS_PORT} from "@repo/backend-common/secret"
import { checkAuth } from "./auth/auth";
import {Chat} from "@repo/db/chat" 
import {connectDb} from "@repo/db/db"

interface Users {
    userId:string , 
    roomId:string[] , 
    socket:WebSocket
}

const wss = new WebSocketServer({port:WS_PORT}) ; 

const allUsers:Users[] = []

wss.on("error",(e)=>{
    console.log("error in the ws server",e) ; 

})

wss.on("connection",async(socket,request)=>{
    const host = await connectDb() ; 
    console.log(host) ; 
    const url = request.url ; 
    if(!url){
        return 
    }

    const queryParam = new URLSearchParams(url?.split('?')[1]) 
    const token = queryParam.get('token') ; 
    if(!token){
        wss.close() 
        return ; 
    }
    const userId = checkAuth(token as string) ; 
    socket.on("message",(data)=>{
        if(userId){
            allUsers.push({
                userId , 
                roomId:[] , 
                socket
            })
            try {
                const parsedMessage = JSON.parse(data.toString()) ; 
                if(parsedMessage.type==="join"){
                    const user = allUsers.find(x=>x.socket===socket) ; 
                    if(!user){
                        return ; 
                    }
                    user.roomId.push(parsedMessage.roomId);
                }    
                if(parsedMessage.type==="chat"){
                    const message = parsedMessage.message ; 
                    const roomId = parsedMessage.roomId ; 
                    allUsers.filter(async x=>{
                        await Chat.create({
                            roomId , 
                            text:message , 
                            userId 
                        })
                        if(x.roomId.includes(roomId)){
                            x.socket.send(message);
                        }  
                    })
                }
                if(parsedMessage.type==="leave"){
                    const user = allUsers.find(x=>x.socket===socket) ; 
                    if(!user){
                        wss.close() 
                        return ; 
                    }
                    user.roomId.filter(x =>x != parsedMessage.roomId) ; 
                }
            } catch (error) {
                console.log("error in parsing json",error) ; 
            }
        }     
        })
})