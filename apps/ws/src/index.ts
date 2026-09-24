import  { WebSocketServer ,WebSocket} from "ws" 
import dotenv from "dotenv"  
import {prisma} from "@repo/db/db"
import { authMiddleware, parseMessage } from "./middleware"

let count = 0 ;  
dotenv.config() 
const port = process.env.WS_PORT ;  
console.log("port is ",port)
const wss = new WebSocketServer({port:Number(port)}) 


interface allUsers {
    userId :string , 
    roomId:Number | null , 
    webSocket:WebSocket
} 

let allUser:allUsers[] = [] ; 
wss.on("error",()=>{
    console.log("error in ws server")
})
wss.on("connection",(ws,request)=>{ 
    const url =  request.url 
    if(!url){ 
        return {
            message :"no url found"
        } 
    }
    const queryParams = new URLSearchParams(url.split('?')[1]) ; 
    const token = queryParams.get("token") || "" 
    const userId = authMiddleware(token)?.userId 
    if(!userId){ 
        ws.close() 
        return {
            message:"no userId found"
        }
    } 
    
    allUser.push({
        webSocket:ws  , 
        userId :userId as string , 
        roomId:null ,
    }) 
   


    ws.on("message",async(message)=>{  
        const parsedData =parseMessage(message) ;  
        const roomId = Number(parsedData.roomId)

        if(parsedData.type=="join"){
            const user = allUser.find(x=>x.webSocket == ws) ; 
            if(!user){ 
                ws.close(404)
                return
            }
            user.roomId = roomId ; 
        }

        if(parsedData.type=="leave"){
            const user = allUser.find(x=>x.roomId == roomId) 
            if(!user){
                ws.close() 
                return 
            } 
            user.roomId = null ; 
        }

        if(parsedData.type=="chat"){ 
            const message = parsedData.message ; 
            await prisma.chat.create({
                data:{
                    roomId , 
                    message ,
                    userId
                }
            })
            allUser.forEach(user=>{
                if(user.roomId==roomId){ 
                    user.webSocket.send(JSON.stringify({ 
                        message
                    })) 
                    console.log("line ran")
                }
            }) 
           
        }
    })
})