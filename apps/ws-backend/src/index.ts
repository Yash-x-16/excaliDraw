import WebSocket, { WebSocketServer } from "ws"; 
import {WS_PORT} from "@repo/backend-common/secret" 
import { isTokenValid } from "./auth/auth";

interface User{
    room:string[] , 
    socket :WebSocket  , 
    userId:string
}

const wss = new WebSocketServer({port:WS_PORT}) 


const allUser:User[] = []
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
        return 
    } 

  const result =   isTokenValid(token as string) ; 
    
  if(result){ 

    allUser.push({
        socket , 
        room:[] , 
        userId:result 
    }) 

    socket.on("message",(message)=>{ 
        
        const parsedPayload = JSON.parse(message.toString()) 
        
        if(parsedPayload.type==="join"){
          const user  = allUser.find(x=>x.socket===socket) 
          if(!user){
            return 
          } 
         user.room.push(parsedPayload.roomId) ; 
        }
        
        if(parsedPayload.type==="chat"){
            const message = parsedPayload.message ; 
            const roomId = parsedPayload.roomId ; 
            allUser.forEach(user=>{
                if(user.room.includes(roomId)){
                    user.socket.send(JSON.stringify({
                        type:"chat" , 
                        message , 
                        roomId 
                    }))
                }
            })
        }

        if(parsedPayload.type==="leave"){ 

            const user = allUser.find(x=>x.socket === socket) ; 
            if(!user){
                return 
            }
            user.room = user.room.filter(x=>x===parsedPayload.roomId)
        }
    })

    }
})

// if (parsedData.type === "join_room") {
// const user = users.find(x => x.ws === ws);
// user ?. rooms.push(parsedData.roomId);

// if (parsedData.type === "leave_room") {
// const user = users.find(x => x.ws === ws);
// if (!user) {
// return;

// user. rooms = user ?. rooms. filter(x => x === parsedData.room);

// 7

// if (parsedData.type === "chat") {
// const roomId = parsedData. roomId;
// const message = parsedData.message;

// await prismaClient.chat.create({
// data: {
// roomId,
// message,
// userId

// users.forEach(user => {
// if (user.rooms.includes(roomId) ) {
// user.ws.send(JSON.stringify({
// type: "chat",
// message: message,
// roomId