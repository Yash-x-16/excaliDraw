"use client"

import { useEffect, useRef } from "react"

export default function Canvas (){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{

        if(canvasRef.current){
            let clicked = false
            let startX = 0 
            let startY = 0 

            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")   
            ctx?.strokeRect(25,25,100,100)             

            canvas.addEventListener("mousedown",(e)=>{
                clicked = true
                startX = e.clientX 
                startY = e.clientY
            })

            canvas.addEventListener("mouseup",(e)=>{
                clicked = false
            })

            canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                const width = e.clientX - startX                    
                const height = e.clientY - startY 

                ctx?.clearRect(0,0,canvas.height,canvas.width)
                ctx?.strokeRect(startX,startY,height,width)
                
                }
            })
        }

  


    },[canvasRef])

    return <div className="h-screen w-screen bg-white">
        <canvas height={500} width={500} ref={canvasRef}>
        </canvas>
    </div>

}