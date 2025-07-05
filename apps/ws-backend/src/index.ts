import { WebSocket, WebSocketServer } from "ws"; 
import {checkAuth} from "./auth/checkAuth";
import { client } from "@repo/db/client";


const wss = new WebSocketServer({port:8080})

interface Users{
    socket:WebSocket,
    room:string[],
    userId:string
}
const users :Users[]=[]

try{
    wss.on('connection',function(socket,request){

        const url = request.url ;
        if(!url){
            return ; 
        }
        const queryParam = new URLSearchParams(url.split('?')[1])
        const token = queryParam.get('token')
        const userId = checkAuth(token as string)
        if(!userId){
            wss.close()
            return null ;
        }


        users.push({
            userId,
            socket:socket,
            room:[]
        })

try{
    socket.on('message',async function(e){

        const parseData = JSON.parse(e as unknown as string)

        if(parseData.type==="join_room"){
            const user = users.find(x => x.socket===socket)  ; 
            user?.room.push(parseData.roomId)
        }
        if(parseData.type==="leave_room"){

            const user = users.find(x => x.socket===socket)  ; 
            if(!user){
                return
            }
            user.room = user?.room.filter(x=>x===parseData.room)
        }

        
        if(parseData.type==='chat'){
            const roomId = parseData.roomId  
            const message = parseData.message 
            
            await client.chat.create({
                data:{
                    roomId:parseData.roomId ,
                    message:parseData.message,
                    userId:Number(userId) 
                }
            })

            users.forEach((user)=>{
                if(user.room.includes(roomId)){
                    user.socket.send(JSON.stringify({
                        type:"chat",
                        message:message ,
                        room:roomId
                    }))
                }
            })
        }


    })
}catch(e){
console.log(e)
}
        
    })
    
}catch(e){
    console.log(`error in ws is : ${e}`)
}

console.log("yash from ws !!")