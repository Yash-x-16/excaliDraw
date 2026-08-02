import  { WebSocketServer } from "ws" 
import dotenv from "dotenv"  
import jwt from "jsonwebtoken"  

dotenv.config() 

const port = process.env.WS_PORT as string
const JWT_SECRET = process.env.JWT_SECRET as string
const wss  = new WebSocketServer({port:Number(port)}) 


wss.on("connection",(ws,request)=>{
    const url = request.url 
    if(!url){
        return ; 
    }
    const queryParam = new URLSearchParams(url.split('?')[1]);
    const token = queryParam.get("token") || "" 
    const decoded = jwt.verify(token,JWT_SECRET) ;  
    console.log(decoded) ; 
})