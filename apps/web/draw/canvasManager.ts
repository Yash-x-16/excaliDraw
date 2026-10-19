
import { shape } from "./shapesTypes"
import { tools } from "./shapesTypes" 
import { getExistingShapes } from "./http"

export  class canvasManager { 

    private canvas :HTMLCanvasElement 
    private ctx :CanvasRenderingContext2D 
    private roomId:string 
    private existingShapes:shape[] ; 
    private socket:WebSocket | null = null  
    private clicked:boolean 
    private startX = 0  
    private isDragging = false  
    private selectedShapeIndex:number   =  0 ; 
    private startY = 0  
    private endX = 0 ; 
    private endY = 0 ;  
    private currentTool :tools = "circle" ; 
    private currentColor :string = "#ffffff" ; 
    private circleRadius =0  
    private pencilPoints:{x:number,y:number}[]= [] ; 

    constructor (canvas:HTMLCanvasElement ,  roomId:string,){
        this.canvas = canvas   
        this.ctx = canvas.getContext("2d")! ; 
        this.roomId = roomId  
        this.existingShapes = [] ;  
        this.init() ;  
        this.initHandlers() ;  
        this.mouseHandlers() 
        this.clicked  = false  
    }

    async init(){
        try {
            this.existingShapes = await getExistingShapes(this.roomId);
            this.clearCanvas();
        } catch (error) {
            console.error("Error loading existing shapes:", error);
        }
    } 

    initHandlers(){
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("token") || "";
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

        try {
            this.socket = new WebSocket(`${wsUrl}${token ? `?token=${token}` : ""}`);

            this.socket.onopen = () => {
                if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify({
                        type: "join",
                        roomId: this.roomId
                    }));
                }
            };

            this.socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.message) {
                        const parsedShape = typeof data.message === "string" ? JSON.parse(data.message) : data.message;
                        if (parsedShape && parsedShape.type) {
                            if (parsedShape.id && this.existingShapes.some(s => s.id === parsedShape.id)) {
                                return;
                            }
                            this.existingShapes.push(parsedShape);
                            this.clearCanvas();
                        }
                    }
                } catch (err) {
                    console.error("Error processing websocket message:", err);
                }
            };

            this.socket.onerror = (err) => {
                console.warn("WebSocket error:", err);
            };

            this.socket.onclose = () => {
                console.log("WebSocket disconnected from room:", this.roomId);
            };
        } catch (err) {
            console.warn("Could not initialize WebSocket:", err);
        }
    } 

    setTool(tool:tools){
        this.currentTool=tool ; 
    }

    setColor(color:string){
        this.currentColor = color ;
    }

    getColor(): string {
        return this.currentColor;
    }


    clearCanvas(){
        
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height) ; 
        this.ctx.fillStyle="rgb(0,0,0)"  
        this.ctx.lineWidth=3
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height) ; 

        this.existingShapes.map((shape)=>{
                const color = shape.color || "rgb(255,255,255)";
                if(shape.type==="rect"){
                    this.ctx.strokeStyle = color;
                    this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height) ;  

                }else if(shape.type==="circle"){
                    this.createCircle(shape.startX,shape.startY,shape.radius, color) ; 
                }else if(shape.type==="line"){
                    this.createLine(shape.startX,shape.startY,shape.endX,shape.endY, color) ; 
                }else if (shape.type==="pencil"){
                    this.createSketch(shape.points, color) ; 
                }else if (shape.type==="arrow"){
                    this.createArrow(shape.startX,shape.startY,shape.endX,shape.endY, color)
                }else if (shape.type==="text"){
                    this.createText(shape.x,shape.y,shape.text, color)
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
           if (this.currentTool === "text") {
                this.clicked = false;
                return;
           }
           this.clicked = false  
           this.isDragging = false   
           let shape:shape | null = null 
           this.pencilPoints.push({x:e.clientX,y:e.clientY}) 
           let x = e.clientX -  this.startX ; 
           let y = e.clientY -  this.startY ; 
           const shapeId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

           if(this.currentTool=="rect") {
                 shape =    {
                    id: shapeId,
                    type:"rect" , 
                    x: this.startX, 
                    y: this.startY , 
                    width:x , 
                    height:y,
                    color: this.currentColor
                }
           }
           
           else if (this.currentTool=="circle"){  
            let radius =this.circleRadius
                shape = {
                    id: shapeId,
                    type:"circle" ,  
                    startX:this.startX , 
                    startY:this.startY,
                    radius,
                    color: this.currentColor
                }
           } 
           
           else if (this.currentTool==="line"){
            shape = {
                id: shapeId,
                type:"line" , 
                startX:this.startX , 
                startY:this.startY , 
                endX:this.endX , 
                endY:this.endY,
                color: this.currentColor
            }
           }
           
           else if (this.currentTool==="pencil"){
            shape ={
                id: shapeId,
                type:"pencil" , 
                points:this.pencilPoints,
                color: this.currentColor
            } 
            this.pencilPoints=[] ; 
           } 
           
           else if (this.currentTool==="arrow"){
            shape = {
                id: shapeId,
                type:"arrow" , 
                startX :this.startX, 
                startY:this.startY , 
                endX:this.endX , 
                endY:this.endY,
                color: this.currentColor
            }
           }
           if(!shape){
            return 
           } 
           
           this.existingShapes.push(shape)

           if (this.socket && this.socket.readyState === WebSocket.OPEN) {
               this.socket.send(JSON.stringify({
                   type: "chat",
                   roomId: this.roomId,
                   message: JSON.stringify(shape)
               }));
           }
    }

    mousemoveHandler = (e:MouseEvent)=>{
          let x = e.clientX - this.startX ; 
          let y = e.clientY - this.startY ; 
          this.endX = e.clientX ; 
          this.endY = e.clientY ;  
          if(this.clicked && this.currentTool==="rect"){ 
             this.clearCanvas() ;   
             this.ctx.lineWidth = 3;
             this.ctx.strokeStyle = this.currentColor;
             this.ctx.strokeRect(this.startX,this.startY,x,y) ;   
         }
         else if(this.clicked && this.currentTool==="circle"){ 
            this.clearCanvas() ;  
            this.circleRadius =  Math.abs(Math.sqrt(x*x +y*y)) ;  
            this.createCircle(this.startX,this.startY,this.circleRadius, this.currentColor) ; 
         } else if(this.clicked && this.currentTool==="line"){
           this.clearCanvas()  ; 
           this.createLine(this.startX,this.startY,this.endX,this.endY, this.currentColor) ; 
         } else if(this.clicked && this.currentTool==="pencil"){ 
            this.clearCanvas()  
            this.pencilPoints.push({x:e.clientX,y:e.clientY}) ; 
            this.createSketch(this.pencilPoints, this.currentColor) ; 
         } else if (this.clicked && this.currentTool==="arrow"){
            this.clearCanvas() 
            this.createArrow(this.startX,this.startY,this.endX,this.endY, this.currentColor) ;   
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
        if (this.socket) {
            try {
                if (this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify({
                        type: "leave",
                        roomId: this.roomId
                    }));
                }
                this.socket.close();
            } catch (e) {
                console.error("Error closing websocket", e);
            }
        }
        this.canvas.removeEventListener("mousedown",this.mouseDownHandler) ; 
        this.canvas.removeEventListener("mouseup",this.mouseUpHandler) ; 
        this.canvas.removeEventListener("mousemove",this.mousemoveHandler)  ; 
        const existingTextarea = document.getElementById("canvas-active-textarea");
        if (existingTextarea) {
            existingTextarea.remove();
        }
    } 

    private createCircle(startX:number,startY:number,radius:number, color: string = "white"){
            this.ctx.save() 
            this.ctx.beginPath()   
            this.ctx.strokeStyle = color  
            this.ctx.fillStyle="transparent"
            this.ctx.lineWidth=3
            this.ctx.arc(startX,startY,radius,0,Math.PI*2) ;  
            this.ctx.stroke()
            this.ctx.restore()
    } 

    private createLine (startX:number,startY:number,endX:number,endY:number, color: string = "white"){
        this.ctx.save()
        this.ctx.beginPath() 
        this.ctx.lineCap="round"
        this.ctx.moveTo(startX,startY) ; 
        this.ctx.lineTo(endX,endY) ;   
        this.ctx.strokeStyle=color   
        this.ctx.lineWidth=3
        this.ctx.stroke()
        this.ctx.restore()
    } 

    private createSketch(points:{x:number,y:number}[], color: string = "white"){
        if (points.length === 0) return;
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.lineCap="round" 
        this.ctx.lineJoin="round" ; 
        this.ctx.moveTo(points[0].x,points[0].y) ;  
        for(let i =1 ; i<points.length;i++){
             this.ctx.lineTo(points[i].x,points[i].y) ; 
        }
        this.ctx.strokeStyle=color   
        this.ctx.lineWidth=3
        this.ctx.stroke()
        this.ctx.restore()
    }  

    private createArrow(startX:number,startY:number,endX:number,endY:number, color: string = "white"){ 
        const angle = Math.atan2(endY - startY, endX - startX);
        const headLength = 15 
        const headAngle = Math.PI /6 
        this.ctx.save()
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = 3

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);

        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - headLength * Math.cos(angle - headAngle),
            endY - headLength * Math.sin(angle - headAngle)
        );

        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - headLength * Math.cos(angle + headAngle),
            endY - headLength * Math.sin(angle + headAngle)
        );

        this.ctx.stroke();
        this.ctx.restore()
    }

    private createText(x: number, y: number, text: string, color: string = "white") {
        this.ctx.save();
        this.ctx.fillStyle = color;
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
        textarea.style.color = this.currentColor;
        textarea.style.font = "20px sans-serif";
        textarea.style.lineHeight = "24px";
        textarea.style.border = `1px dashed ${this.currentColor}`;
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
                const shapeId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
                const textShape: shape = {
                    id: shapeId,
                    type: "text",
                    x,
                    y,
                    text: textarea.value,
                    color: this.currentColor
                };
                this.existingShapes.push(textShape);
                this.clearCanvas();

                if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify({
                        type: "chat",
                        roomId: this.roomId,
                        message: JSON.stringify(textShape)
                    }));
                }
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
                const height = shape.startY - shape.endY ; 
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