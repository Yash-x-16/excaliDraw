import  { WebSocketServer } from "ws" 
import jwt, { decode, JwtPayload } from "jsonwebtoken"  
import dotenv from "dotenv"  
import {prisma} from "@repo/db/db"
import { authMiddleware } from "./middleware"

dotenv.config() 
const port = process.env.WS_PORT ;  
const wss = new WebSocketServer({port:Number(port)}) 


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
        return {
            message:"no userId found"
        }
    }
    ws.on("message",(data)=>{

    })
})