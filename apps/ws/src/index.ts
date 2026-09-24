import  { WebSocketServer ,WebSocket} from "ws" 
import dotenv from "dotenv"  
import {prisma} from "@repo/db/db"
import { authMiddleware } from "./middleware"

dotenv.config() 
const port = process.env.WS_PORT ;  
const wss = new WebSocketServer({port:Number(port)}) 


interface allUsers {
    userId :string , 
    roomId:Number | null , 
    webSocket:WebSocket
} 

let allUser:allUsers[] = [] ; 

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
        const data = JSON.stringify(message) ; 
        const parsedData = JSON.parse(data) ; 
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
                    ws.send(JSON.stringify({ 
                        message
                    }))
                }
            })
        }
    })
})