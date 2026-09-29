
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
    private startY = 0  
    private endX = 0 ; 
    private endY = 0 ;  
    private pencilX = 0 ;
    private pencilY = 0 ;
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
                }
            })
    }  

    mouseDownHandler = (e:MouseEvent)=>{
            this.startX = e.clientX 
            this.startY = e.clientY  
            this.pencilX = e.clientX
            this.pencilY = e.clientY
            this.clicked = true 
            if (this.currentTool==="pencil"){
                this.pencilPoints=[{x:this.startX,y:this.startY}]
            }
            
    }

    mouseUpHandler =  (e:MouseEvent)=>{
           this.clicked = false 
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
           }else if (this.currentTool=="circle"){  
            let radius =this.circleRadius
                shape = {
                    type:"circle" ,  
                    startX:this.startX , 
                    startY:this.startY,
                    radius
                }
           } else if (this.currentTool==="line"){
            shape = {
                type:"line" , 
                startX:this.startX , 
                startY:this.startY , 
                endX:this.endX , 
                endY:this.endY
            }
           }else if (this.currentTool==="pencil"){
            shape ={
                type:"pencil" , 
                points:this.pencilPoints 
            } 
            console.log("existing shape : ",this.existingShapes)
            console.log("mouse up points : ",this.pencilPoints)
            this.pencilPoints=[] ; 
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
            // this.clearCanvas() 
            // this.createArrow(this.startX,this.startY,this.endX,this.endY)
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

    // private createArrow (startX:number,startY:number,endX:number,endY:number) {
    //     let headLength = 10 ; 
    //     let width = startX-endX 
    //     let height = startY-endY 
    //     let angle = Math.atan2(height,width) ;  
    //     this.ctx.beginPath()
    //     this.ctx.moveTo(startX, startY);
    //     this.ctx.lineTo(endX, endY);
    //     this.ctx.strokeStyle = 'white';
    //     this.ctx.stroke(); 

    //     this.ctx.beginPath();
    //     this.ctx.moveTo(endX, endY);
    //     this.ctx.lineTo(
    //         endX - headLength * Math.cos(angle - Math.PI / 6),
    //         endX - headLength * Math.sin(angle - Math.PI / 6)
    //                 );
    //     this.ctx.lineTo(
    //         endX - headLength * Math.cos(angle + Math.PI / 6),
    //         endY - headLength * Math.sin(angle + Math.PI / 6)
    //             );
    //     this.ctx.lineTo(endX, endY);
    //     this.ctx.fillStyle = 'white';
    //     this.ctx.fill(); 
        
    // }

    
}