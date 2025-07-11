import { BACKEND_URL } from "@/config";
import axios from "axios";

type Shapes={
    type : "react" ; 
    x : number ; 
    y : number ; 
    height: number ; 
    width : number ;
} | {
    type :"circle" ; 
    radius : Number ; 
    centerX :Number ; 
    centerY :Number ; 

}


export async function Drawing(canvas:HTMLCanvasElement ,roomId:string){

let existingShape:Shapes[]= await getExistingShapes(roomId)

    let clicked = false
    let startX = 0 
    let startY = 0 
    const ctx = canvas.getContext("2d") 
    if(!ctx){
        return
    }  

    clearCanvas(existingShape,ctx,canvas)
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)           

    canvas.addEventListener("mousedown",(e)=>{
        clicked = true
        startX = e.clientX 
        startY = e.clientY
    })

    canvas.addEventListener("mouseup",(e)=>{
        clicked = false 
        const width = e.clientX - startX
        const height = e.clientY - startY

        existingShape.push({
            type:"react" ,
            height,
            width,
            x:startX , 
            y : startY
        })
    })

    canvas.addEventListener("mousemove",(e)=>{
        if(clicked){
        
        const width = e.clientX - startX                    
        const height = e.clientY - startY
        
        clearCanvas(existingShape,ctx,canvas)

        ctx.strokeStyle = "rgba(255,255,255)"
        ctx.strokeRect(startX,startY,width,height)

        }
    })
}

function clearCanvas(existingShape:Shapes[],ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    existingShape.map((shape)=>{
        if(shape.type =="react"){
              ctx.strokeStyle = "rgba(255,255,255)"
              ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
        }
    })
}


 async function  getExistingShapes(roomId:string){
    const res = await axios.get(`${BACKEND_URL}/api/chat/${roomId}`)
    const message = res.data.messages

    const shapes = message.map((x:{messages:string})=>{
       const messagesData = JSON.parse(x.messages) 
       return messagesData
    })
    return shapes  ; 
}

