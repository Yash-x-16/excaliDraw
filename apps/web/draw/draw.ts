import axios from "axios";

// const http_url =  process.env.HTTP_URL ;

 interface shape{
        type:"react" , 
        x:number , 
        y:number , 
        width:number , 
        height:number  
    }

export async function initDraw(canvas:HTMLCanvasElement ,roomId:string){ 
    


    let existingShape:shape[] = [] ; 
    const ctx = canvas.getContext("2d")
            if(!ctx){
                return 
            }   
            clearCanvas(canvas,ctx,existingShape) ; 
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
                let x = e.clientX - startX ; 
                let y = e.clientY - startY ; 
                existingShape.push({
                    type:"react" , 
                    x:startX, 
                    y:startY , 
                    width:x , 
                    height:y
                })
            })

            canvas.addEventListener("mousemove",(e)=>{ 
                 let x = e.clientX - startX ; 
                 let y = e.clientY - startY ; 
                if(clicked){
                    clearCanvas(canvas,ctx,existingShape) ;  
                    ctx.strokeStyle = "rgb(255,255,255)" 
                    ctx.strokeRect(startX,startY,x,y) ;  
                } 
      
            })
}

function clearCanvas(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,existingShapes:shape[]){
    ctx.clearRect(0,0,canvas.width,canvas.height) ; 
    ctx.fillStyle="rgb(0,0,0)" 
    ctx.fillRect(0,0,canvas.width,canvas.height) ; 

    existingShapes.map((shape)=>{
        if(shape.type=="react"){
            ctx.strokeStyle="rgb(255,255,255)"
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height) ;  
        }
    })
} 

