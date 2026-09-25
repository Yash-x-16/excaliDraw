"use client"
import { useEffect, useRef } from "react"

export default function Canvas (){
    const canvasRef = useRef<HTMLCanvasElement>(null) ;  
    useEffect(()=>{
        if(canvasRef.current){ 
            const canvas = canvasRef.current 
            const ctx = canvas.getContext("2d") 
            
            if(!ctx){
                return 
            }  
            let clicked = false 
            let startX = 0 ; 
            let startY = 0 ;
            ctx.fillStyle = "rgb(0,0,0)" 
            ctx.fillRect(0,0,canvas.width,canvas.height) ;  
            canvas.addEventListener("mousedown",(e)=>{  
                startX = e.clientX 
                startY = e.clientY 
                clicked = true
                console.log("mouseDown x",e.clientX)
                console.log("mouseDown y",e.clientY)
            })
            canvas.addEventListener("mouseup",(e)=>{ 
                clicked = false
                console.log("mouseup x",e.clientX)
                console.log("mouseup y",e.clientY)
            })

            canvas.addEventListener("mousemove",(e)=>{ 
                 let x = e.clientX - startX ; 
                 let y = e.clientY - startY ; 
                if(clicked){
                    ctx.clearRect(0,0,canvas.width,canvas.height) ;  
                    ctx.fillStyle = "rgb(0,0,0)" 
                    ctx.fillRect(0,0,canvas.width,canvas.height) ;  
                    ctx.strokeStyle = "rgb(255,255,255)"
                    ctx.strokeRect(startX,startY,x,y) ;  
                }
            })
 
        }
    },[canvasRef])

    return <div>
        <canvas height={window.innerHeight} ref={canvasRef} width={window.innerWidth}></canvas>
    </div>
}