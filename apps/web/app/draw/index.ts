export function initDraw(canvas:HTMLCanvasElement){
        const ctx = canvas.getContext("2d") ; 
        if(!ctx){
            return 
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let clicked:boolean ; 
        let startX:number ; 
        let startY:number ; 

        canvas.addEventListener("mousedown",(e)=>{
            clicked = true ; 
            startX = e.clientX ; 
            startY = e.clientY ; 
        })
        canvas.addEventListener("mouseup",(e)=>{
            clicked= false ; 
        })
        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
              const  x = e.clientX -startX
              const  y =  e.clientY - startY; 

              ctx.clearRect(0,0,canvas.width,canvas.height) ; 
              ctx.fillStyle = "black";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.strokeStyle = "white";
              ctx.strokeRect(0, 0, canvas.width, canvas.height);
              ctx.strokeRect(startX,startY,x,y) ; 
            }
        })
}