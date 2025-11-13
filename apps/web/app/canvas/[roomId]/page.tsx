"use client"

import { useEffect ,useRef } from "react"

export default function Canvas (){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        const canvas = canvasRef.current ; 
        if(!canvas){
            return
        } 
        const context = canvas.getContext("2d") ; 
        if(!context)
            return 
        let clicked:boolean ; 
        let startX:number ; 
        let startY:number ; 

        canvas.addEventListener("mousedown",(e)=>{
            clicked = true 
            startX = e.clientX  ; 
            startY = e.clientY ; 
            console.log("client x is : ", e.clientX)
            console.log("client Y is : ", e.clientY) 
        })

        canvas.addEventListener("mouseup",(e)=>{
            clicked = false  
            console.log("client x is : up  ", e.clientX)
            console.log("client Y is :  up ", e.clientY) 
        })

        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
                context.clearRect(0,0,canvas.width,canvas.height) ; 
                context.strokeRect(startX,startY,e.clientX-startX,e.clientY-startY) ; 

                console.log("x while moving is : ",e.clientX) ; 
                console.log("Y while moving is : ",e.clientY) ; 
            }
        })
    },[canvasRef])

    return <canvas ref={canvasRef} className="bg-black display-block" height={window.innerHeight} width={window.innerWidth}>
    </canvas>
}