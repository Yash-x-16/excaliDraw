"use client"

import { useEffect, useRef } from "react"

interface shapes{
    startX:number,
    startY:number,
    width:number,
    height:number,
}
let allShapes:shapes[]= []

export default function  Canvas(){
    const canvasRef = useRef<null | HTMLCanvasElement>(null) ; 
    useEffect(()=>{
        const canvas= canvasRef.current 
        if(!canvas){
        return 
        }
    const ctx = canvas.getContext("2d") ; 
    if(!ctx){
        return 
    }
    renderAllShapes(canvas,ctx,allShapes) ; 
    let move = false
    let startX:number ; 
    let startY:number ; 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
       
    canvas.addEventListener("mousemove",(e)=>{
  
        if(move){
            ctx.clearRect(0,0,canvas.width,canvas.height) ;  
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle="white" ; 
            ctx.strokeRect(startX,startY,e.clientX-startX,e.clientY-startY) ;   
        } 

    })

    canvas.addEventListener("mouseup",(e)=>{
        move = false ;  
        const height = e.clientY - startY ; 
        const width = e.clientX - startX ; 
        allShapes.push({
            startX , 
            startY , 
            width , 
            height
        })
              
        console.log("length is ",allShapes.length) ; 
        console.log("length is ",allShapes) ; 
    })

    canvas.addEventListener("mousedown",(e)=>{
        move = true 
        startX = e.clientX ; 
        startY = e.clientY ; 
        renderAllShapes(canvas,ctx,allShapes)
    })
    },[canvasRef])
  
    return <canvas ref={canvasRef} height={window.innerHeight} width={window.innerWidth}></canvas>
}


function renderAllShapes(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,allShapes:shapes[]){
    return allShapes.map(x=>{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle="white" , 
    ctx.strokeRect(x.startX,x.startY,x.width,x.height) ; 
    })
}