  import axios from "axios" 
  import {HTTP_URL} from "@repo/backend-common/secret"
  interface shape {
        startX:number , 
        startY:number , 
        width:number , 
        height:number
    }
     
export const initDraw  =async  (canvas:HTMLCanvasElement , ctx:CanvasRenderingContext2D,socket:WebSocket,roomId:string)=>{
  let allShapes:shape[]  = await  getAllShapes(roomId)
    
     let startX = 0 ,startY = 0 ,clicked = false 

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderAllShapes(canvas,ctx,allShapes)  
        canvas.addEventListener("mousedown",(e)=>{ 
            clicked = true ; 
            startX = e.clientX  ; 
            startY = e.clientY ;  
        })
        canvas.addEventListener("mouseup",(e)=>{
            clicked = false ;  
            const height = e.clientY - startY  ; 
            const width = e.clientX -  startX ;   
            allShapes.push({
                startX , 
                startY , 
                width , 
                height
            })
            socket.send(JSON.stringify({
                type:"chat" , 
                roomId , 
                message:JSON.stringify({startX  , 
                startY , 
                width , 
                height})
            }))
        })
        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){ 

                const height = e.clientY - startY  ; 
                const width = e.clientX -  startX ;  
                
                ctx.clearRect(0,0,canvas.width,canvas.height) ; 
                   ctx.fillStyle="black"
                ctx.fillRect(0,0,canvas.width,canvas.height) 
                ctx.strokeStyle="white" 
                renderAllShapes(canvas,ctx,allShapes)  
                ctx.strokeRect(startX,startY,width,height) ;      
            }
        })
}


function renderAllShapes(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,allshape:shape[]){
    ctx.clearRect(0,0,canvas.width,canvas.height) ; 
    ctx.fillStyle="black" ; 
    ctx.fillRect(0,0,canvas.width,canvas.height) ; 
    ctx.strokeStyle="white" ; 
    allshape.map(x=>ctx.strokeRect(x.startX,x.startY,x.width,x.height)) ; 
}

async function getAllShapes(roomId:string){
    const response = await axios.get(`${HTTP_URL}/chats/${roomId}`) 
    const chats = response.data.chats.map((x:{
        text:string 
    })=>{
        const parsedMessage = JSON.parse(x.text) ; 
        return parsedMessage
    }) 
    return chats ; 
}