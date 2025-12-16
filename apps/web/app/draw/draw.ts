

interface shapes{
    startX:number,
    startY:number,
    width:number,
    height:number,
}
export function Draw(ctx:CanvasRenderingContext2D ,canvas:HTMLCanvasElement,allShapes:shapes[], ){
    

    if(!ctx){
        return 
    }
    let move = false
    let startX:number ; 
    let startY:number ; 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
       
    canvas.addEventListener("mousemove",(e)=>{
  
        if(move){ 
            renderAllShapes(canvas,ctx,allShapes)
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
}

function renderAllShapes(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,allShapes:shapes[]){
    ctx.clearRect(0,0,canvas.width,canvas.height) ; 
    ctx.fillStyle="black" ; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    allShapes.map((x)=>{

    ctx.strokeStyle="white" , 
    ctx.strokeRect(x.startX,x.startY,x.width,x.height) ; 
    }) 

}