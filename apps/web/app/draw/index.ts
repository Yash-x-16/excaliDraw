import axios from "axios" 
import {HTTP_URL} from "@repo/backend-common/secret"

interface Shape{
    type:"react" , 
    x:number , 
    y:number , 
    width:number , 
    height:number
}


export async function initDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
        let existingShapes:Shape[]= await getAllShapes(roomId) 
        const ctx = canvas.getContext("2d") ; 
        if(!ctx){
            return 
        }

        socket.onmessage= (event)=>{
            const parsedMessage  = JSON.parse(event.data) ; 
            if(parsedMessage.type==="chat"){
                const parsedTexts  = JSON.parse(parsedMessage.message) ; 
                existingShapes.push(parsedTexts) ; 
                renderAllShapes(existingShapes,ctx,canvas) ;
            } 
        }
        renderAllShapes(existingShapes,ctx,canvas) ; 
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let clicked:boolean ; 
        let startX:number ; 
        let startY:number ; 

        canvas.addEventListener("mousedown",(e)=>{
            clicked = true ; 
            startX = e.clientX ; 
            startY = e.clientY ;  
            console.log("start x is ",startX)
            console.log("start y is ",startY)
        })
        canvas.addEventListener("mouseup",(e)=>{
            clicked= false ; 
            const width=e.clientX - startX 
            const  height= e.clientY - startY
            existingShapes.push({
                type:"react" , 
                x:startX , 
                y:startY , 
                width , 
                height
            })  

            socket.send(JSON.stringify({
                type:"chat" , 
                roomId,
                message:JSON.stringify({
                x:startX , 
                y:startY , 
                width , 
                height 
                })
            })) 
        })
        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
                const height = e.clientY - startY 
                const width = e.clientX - startX 
              renderAllShapes(existingShapes,ctx,canvas);
              ctx.strokeRect(startX,startY,width,height) ; 
            }
        })
}

function renderAllShapes(allShape:Shape[],ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
      ctx.clearRect(0,0,canvas.width,canvas.height) ; 
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "white"; 
      if(allShape===null){
        return 
      }
    allShape.map(x=>{
        ctx.strokeRect(x.x, x.y, x.width, x.height);
    })
} 

async function getAllShapes(roomId:string){
    const response = await axios.get(`${HTTP_URL}/chat/getChats/${roomId}`) 
    const messages = response.data.chats 
    console.log("messages is ::",messages) 
    console.log("data from db is ",response.data) ; 
    if(!messages){
        return null 
    }
    const shapes = messages.map((x:{text:string})=>{
        const parsedMessage = JSON.parse(x.text) ; 
        return parsedMessage ; 
    }) 

    console.log("shapes is ",shapes)
    return shapes
}