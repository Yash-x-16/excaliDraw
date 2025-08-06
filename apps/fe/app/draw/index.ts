export function initDraw(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
        ctx.fillStyle = "rgba(255,255,255)"
        ctx.fillRect(0,0,canvas.width,canvas.height)
        let startX = 0 ; 
        let startY = 0 
        let clicked = false
       
        canvas.addEventListener('mousedown',(e)=>{
        clicked = true
        startX = e.clientX  ;
        startY = e.clientY ;  

       })
       canvas.addEventListener('mouseup',(e)=>{
        clicked = false ; 
       })
       
       canvas.addEventListener('mousemove',(e)=>{
        
            if(clicked){
                const width = e.clientX - startX ; 
                const height = e.clientY - startY ;  
        
                ctx.clearRect(0,0,canvas.width,canvas.height)  
                ctx.fillStyle='rgba(0,0,0)' 
                ctx.fillRect(0,0,canvas.width,canvas.height) ; 
                ctx.strokeStyle='rgba(255,255,255)' ;
                ctx.strokeRect(startX,startY,width,height) ;           
            }

       })
        
}