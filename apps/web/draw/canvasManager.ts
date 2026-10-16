
import { shape } from "./shapesTypes"
import { tools } from "./shapesTypes" 

export  class canvasManager { 

    private canvas :HTMLCanvasElement 
    private ctx :CanvasRenderingContext2D 
    private roomId:string 
    private existingShapes:shape[] ; 
    // private socket:WebSocket 
    private clicked:boolean 
    private startX = 0  
    private isDragging = false  
    private selectedShapeIndex:number   =  0 ; 
    private startY = 0  
    private endX = 0 ; 
    private endY = 0 ;  
    private currentTool :tools = "circle" ; 
    private circleRadius =0  
    private pencilPoints:{x:number,y:number}[]= [] ; 

    constructor (canvas:HTMLCanvasElement ,  roomId:string,){
        this.canvas = canvas   
        this.ctx = canvas.getContext("2d")! ; 
        this.roomId = roomId  
        this.existingShapes = [] ;  
        this.init() ;  
        this.initHandlers() ;  
        // this.socket = socket ; 
        this.mouseHandlers() 
        this.clicked  = false  
    }

    init(){
        //  this.existingShapes = getExistingShape()
    } 

    initHandlers(){
        //socket logic here
    } 

    setTool(tool:tools){
        this.currentTool=tool ; 
    }


    clearCanvas(){
        
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height) ; 
        this.ctx.fillStyle="rgb(0,0,0)"  
        this.ctx.lineWidth=3
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height) ; 

        this.existingShapes.map((shape)=>{
                if(shape.type==="rect"){
                    
                    this.ctx.strokeStyle="rgb(255,255,255)"
                    this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height) ;  

                }else if(shape.type==="circle"){

                    this.createCircle(shape.startX,shape.startY,shape.radius) ; 
                }else if(shape.type==="line"){
                    this.createLine(shape.startX,shape.startY,shape.endX,shape.endY) ; 
                }else if (shape.type==="pencil"){
                    this.createSketch(shape.points) ; 
                }else if (shape.type==="arrow"){
                    this.createArrow(shape.startX,shape.startY,shape.endX,shape.endY)
                }else if (shape.type==="text"){
                    this.createText(shape.x,shape.y,shape.text)
                }
            })
    }  

    mouseDownHandler = (e:MouseEvent)=>{
    

            if (this.currentTool === "text") {
                this.clicked = false;
                this.addTextArea(e.clientX, e.clientY);
                return;
            } 
            if(this.isDragging){
                this.clicked = false ; 
            }
            this.startX = e.clientX 
            this.startY = e.clientY  
            this.clicked = true 
            if (this.currentTool==="pencil"){
                this.pencilPoints=[{x:this.startX,y:this.startY}]
            } 

           if(this.currentTool==="select"){
             let index = 0 ; 
             for (let shape of this.existingShapes){
                if(this.isMouseInShape(this.startX,this.startY,shape)){ 
                    this.selectedShapeIndex = index 
                    this.isDragging = true ;   
                    return 
                }
                index ++ ; 
            }  
           }
           
            
    }

    mouseUpHandler =  (e:MouseEvent)=>{
           this.clicked = false  
           this.isDragging = false   
           let shape:shape | null = null 
          this.pencilPoints.push({x:e.clientX,y:e.clientY}) 
           let x = e.clientX -  this.startX ; 
           let y = e.clientY -  this.startY ; 
           if(this.currentTool=="rect") {
                 shape =    {
                    type:"rect" , 
                    x: this.startX, 
                    y: this.startY , 
                    width:x , 
                    height:y
                }
           }
           
           else if (this.currentTool=="circle"){  
            let radius =this.circleRadius
                shape = {
                    type:"circle" ,  
                    startX:this.startX , 
                    startY:this.startY,
                    radius
                }
           } 
           
           else if (this.currentTool==="line"){
            shape = {
                type:"line" , 
                startX:this.startX , 
                startY:this.startY , 
                endX:this.endX , 
                endY:this.endY
            }
           }
           
           else if (this.currentTool==="pencil"){
            shape ={
                type:"pencil" , 
                points:this.pencilPoints 
            } 
            this.pencilPoints=[] ; 
           } 
           
           else if (this.currentTool==="arrow"){
            shape = {
                type:"arrow" , 
                startX :this.startX, 
                startY:this.startY , 
                endX:this.endX , 
                endY:this.endY 
            }
           }
           if(!shape){
            return 
           } 
           
           this.existingShapes.push(shape)
    }

    mousemoveHandler = (e:MouseEvent)=>{
          let x = e.clientX - this.startX ; 
          let y = e.clientY - this.startY ; 
          this.endX = e.clientX ; 
          this.endY = e.clientY ;  
          if(this.clicked && this.currentTool==="rect"){ 
            console.log("clicked is true ")
             this.clearCanvas() ;   
             this.ctx.lineWidth = 2;
             this.ctx.strokeStyle = "rgb(255,255,255)"
             this.ctx.strokeRect(this.startX,this.startY,x,y) ;   
         }
         else if(this.clicked && this.currentTool==="circle"){ 
            this.clearCanvas() ;  
            this.circleRadius =  Math.abs(Math.sqrt(x*x +y*y)) ;  
            this.createCircle(this.startX,this.startY,this.circleRadius) ; 
         } else if(this.clicked && this.currentTool==="line"){
           this.clearCanvas()  ; 
           this.createLine(this.startX,this.startY,this.endX,this.endY) ; 
         } else if(this.clicked && this.currentTool==="pencil"){ 
            this.clearCanvas()  
            this.pencilPoints.push({x:e.clientX,y:e.clientY}) ; 
            this.createSketch(this.pencilPoints) ; 
         } else if (this.clicked && this.currentTool==="arrow"){
            this.clearCanvas() 
            this.createArrow(this.startX,this.startY,this.endX,this.endY) ;   
        } 

        if(this.isDragging){ 
            let currentShape = this.existingShapes[this.selectedShapeIndex] ;   
            switch(currentShape.type) {
                case "rect" :{
                currentShape.x +=x 
                currentShape.y +=y  
                this.clearCanvas()  
                this.startX = e.clientX 
                this.startY = e.clientY 

                break ; 
                } 
                case "circle" :{
                    currentShape.startX += x 
                    currentShape.startY += y 
                    this.clearCanvas() 
                    this.startX = e.clientX 
                    this.startY = e.clientY  

                    break ; 
                } 

                case "line" :{ 
                    currentShape.startX += x
                    currentShape.startY += y 
                    currentShape.endX += x 
                    currentShape.endY += y  
                    this.clearCanvas()
                    this.startX = e.clientX 
                    this.startY = e.clientY  
                    this.endX =   e.clientX ; 
                    this.endY =   e.clientY ;  
                }
            }
        }
    }

    mouseHandlers(){

        this.canvas.addEventListener("mousedown",this.mouseDownHandler)

        this.canvas.addEventListener("mouseup",this.mouseUpHandler) 

        this.canvas.addEventListener("mousemove",this.mousemoveHandler) 
    }

    setCurrentTool(tool:tools){
        this.currentTool = tool ; 
    } 

    destroy (){ 

        this.canvas.removeEventListener("mousedown",this.mouseDownHandler) ; 
        this.canvas.removeEventListener("mouseup",this.mouseUpHandler) ; 
        this.canvas.removeEventListener("mousemove",this.mousemoveHandler)  ; 
        const existingTextarea = document.getElementById("canvas-active-textarea");
        if (existingTextarea) {
            existingTextarea.remove();
        }
    } 

    private createCircle(startX:number,startY:number,radius:number){
            this.ctx.save() 
            this.ctx.beginPath()   
            this.ctx.strokeStyle ="white"  
            this.ctx.fillStyle="transparent"
            this.ctx.lineWidth=4
            this.ctx.arc(startX,startY,radius,0,Math.PI*2) ;  
            this.ctx.stroke()
            this.ctx.fill() 
            this.ctx.restore()
    } 

    private createLine (startX:number,startY:number,endX:number,endY:number){
        this.ctx.beginPath() 
        this.ctx.lineCap="round"
        this.ctx.moveTo(startX,startY) ; 
        this.ctx.lineTo(endX,endY) ;   
        this.ctx.strokeStyle="white"   
        this.ctx.stroke()
    } 

    private createSketch(points:{x:number,y:number}[]){
        this.ctx.beginPath()
        this.ctx.lineCap="round" 
        this.ctx.lineJoin="round" ; 
        this.ctx.moveTo(points[0].x,points[0].y) ;  
        for(let i =1 ; i<points.length;i++){
             this.ctx.lineTo(points[i].x,points[i].y) ; 
        }
        this.ctx.strokeStyle="white"   
        this.ctx.stroke()
    }  

    private createArrow(startX:number,startY:number,endX:number,endY:number,){ 
        
        const angle = Math.atan2(endY - startY, endX - startX);
        const headLength = 15 
        const headAngle = Math.PI /6 
        this.ctx.strokeStyle ="white"

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);

        this. ctx.moveTo(endX, endY);
        this. ctx.lineTo(
            endX - headLength * Math.cos(angle - headAngle),
            endY - headLength * Math.sin(angle - headAngle)
        );

        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - headLength * Math.cos(angle + headAngle),
            endY - headLength * Math.sin(angle + headAngle)
        );

        this.ctx.stroke();
    }

    private createText(x: number, y: number, text: string) {
        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px sans-serif";
        this.ctx.textBaseline = "top";
        const lines = text.split("\n");
        const lineHeight = 24;
        lines.forEach((line, index) => {
            this.ctx.fillText(line, x, y + index * lineHeight);
        });
        this.ctx.restore();
    }

    private addTextArea(x: number, y: number) {
        const existingTextarea = document.getElementById("canvas-active-textarea") as HTMLTextAreaElement | null;
        if (existingTextarea) {
            existingTextarea.blur();
        }

        const textarea = document.createElement("textarea");
        textarea.id = "canvas-active-textarea";
        textarea.placeholder = "Type text here...";
        textarea.style.position = "fixed";
        textarea.style.left = `${x}px`;
        textarea.style.top = `${y}px`;
        textarea.style.background = "transparent";
        textarea.style.color = "white";
        textarea.style.font = "20px sans-serif";
        textarea.style.lineHeight = "24px";
        textarea.style.border = "1px dashed rgba(255, 255, 255, 0.6)";
        textarea.style.outline = "none";
        textarea.style.padding = "2px 4px";
        textarea.style.margin = "0";
        textarea.style.zIndex = "100";
        textarea.style.resize = "none";
        textarea.style.overflow = "hidden";
        textarea.style.whiteSpace = "pre";
        textarea.rows = 1;

        const adjustSize = () => {
            textarea.style.width = "auto";
            textarea.style.height = "auto";
            textarea.style.width = `${Math.max(120, textarea.scrollWidth + 10)}px`;
            textarea.style.height = `${Math.max(30, textarea.scrollHeight)}px`;
        };

        textarea.addEventListener("input", adjustSize);

        let isCommitted = false;
        const commitText = () => {
            if (isCommitted) return;
            isCommitted = true;
            const textValue = textarea.value.trim();
            if (textValue.length > 0) {
                this.existingShapes.push({
                    type: "text",
                    x,
                    y,
                    text: textarea.value
                });
                this.clearCanvas();
            }
            if (textarea.parentNode) {
                textarea.parentNode.removeChild(textarea);
            }
        };

        textarea.addEventListener("blur", commitText);

        textarea.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                commitText();
            } else if (e.key === "Escape") {
                isCommitted = true;
                if (textarea.parentNode) {
                    textarea.parentNode.removeChild(textarea);
                }
            }
        });

        document.body.appendChild(textarea);
        adjustSize();
        setTimeout(() => {
            textarea.focus();
        }, 10);
    } 

    private isMouseInShape(x:number,y:number,shape:shape){   
          let shapeLeft  
          let shapeRight
          let shapetop  
          let shapeBottom  
        switch (shape.type) {
            case "rect" : {
                 shapeLeft = shape.x  
                shapeRight = shape.x +shape.width 
                shapetop = shape.y 
                shapeBottom = shape.y + shape.height  

                if(x > shapeLeft && x<shapeRight && y < shapeBottom && y > shapetop){
                    return true  
                } 
                break ; 

            }
               
            case "circle" : {
                
                shapeLeft = shape.startX  - shape.radius 
                shapeRight = shape.radius + shape.startX 
                shapetop = shape.startY  - shape.radius 
                shapeBottom = shape.radius + shape.startY  
                if(x > shapeLeft && x<shapeRight && y < shapeBottom && y > shapetop){
                    console.log("control reached and is false")
                    return true  
                }  
                break ;  

            }

            case "line" :{ 
                console.log("control reached line")
                const width = shape.startX - shape.endX ; 
                const height = shape.startY - shape.startY ; 
                const d = Math.sqrt(width*width + height *height) ; 

                const newWidth = x - shape.endX 
                const newHeight = y - shape.endY 
                const newDistance = Math.sqrt(newWidth * newWidth + newHeight * newHeight) ; 

                if(newDistance<d){
                    console.log("control reached line 2") ; 
                    return true 
                }
                 

                break ; 
            }
        }
       
         return false
    }

}