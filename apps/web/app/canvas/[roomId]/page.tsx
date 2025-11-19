"use client"
import { useEffect, useRef } from "react"
export default function MainCanvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null) 
    const canvas = canvasRef.current ;   
    console.log("yash from useEffect")
    useEffect(()=>{
        if(!canvas){
        return 
    }
        let startX = 0 ,startY = 0 ,clicked = false 
        const ctx = canvas.getContext("2d") ;  
        
        if(!ctx){
            return 
        }
        canvas.addEventListener("mousedown",(e)=>{ 
            clicked = true ; 
            startX = e.clientX  ; 
            startY = e.clientY ; 
            console.log("startx is : ",startX)
        })
        canvas.addEventListener("mouseup",(e)=>{
            clicked = false ; 
        })
        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
                const height = e.clientY - startY  ; 
                const width = e.clientX -  startX ;  
                ctx?.clearRect(0,0,canvas.width,canvas.height) ; 
                ctx?.strokeRect(startX,startY,width,height) ;       
            }
        })
    },[canvas])
    return <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef}>
    </canvas>
}