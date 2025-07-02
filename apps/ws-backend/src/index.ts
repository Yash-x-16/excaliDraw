import { WebSocketServer } from "ws"; 
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"


const wss = new WebSocketServer({port:8080})

try{
    wss.on('connection',function(socket,request){

        const url = request.url ;
        if(!url){
            return ; 
        }
        const queryParam = new URLSearchParams(url.split('?')[1])
        const token = queryParam.get('token')
        const decoded=   jwt.verify(token as string,JWT_SECRET)
      
        if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
            wss.close()
            return ; 
      }
    
        console.log("user connected !")
        
        socket.on('message',function(e){
    
        })
    })
    
}catch(e){
    console.log(`error in ws is : ${e}`)
}

console.log("yash from ws !!")