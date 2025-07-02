import { WebSocketServer } from "ws"; 

const wss = new WebSocketServer({port:8080})

wss.on('connection',function(socket){
    console.log("user connected !")
    
    socket.on('message',function(e){

    })
})

console.log("yash from ws !!")