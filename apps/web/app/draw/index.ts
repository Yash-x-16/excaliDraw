interface Shape{
    type:"react" , 
    x:number , 
    y:number , 
    width:number , 
    height:number
}

let existingShapes:Shape[]= [] ; 
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
            existingShapes.push({
                type:"react" , 
                x:startX , 
                y:startY , 
                width:e.clientX - startX , 
                height: e.clientY - startY
            }) 
        })
        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
                const height = e.clientY - startY 
                const width = e.clientX - startX 
              renderAllShapes(existingShapes,ctx,canvas);
              ctx.strokeRect(startX,startY,width,height) ; 
            }
        })
}

function renderAllShapes(allShape:Shape[],ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
      ctx.clearRect(0,0,canvas.width,canvas.height) ; 
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "white";
    allShape.map(x=>{
        ctx.strokeRect(x.x, x.y, x.width, x.height);
    })
}