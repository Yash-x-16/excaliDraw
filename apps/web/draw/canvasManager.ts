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
    private currentTool :tools = "circle" ; 


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
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height) ; 

        this.existingShapes.map((shape)=>{
                if(shape.type=="react"){
                    this.ctx.strokeStyle="rgb(255,255,255)"
                    this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height) ;  
                }else if(shape.type=="circle"){
                    //circle logic
                }
            })
    }  

    mouseDownHandler = (e:MouseEvent)=>{
         this.startX = e.clientX 
            this.startY = e.clientY 
            this.clicked = true
    }

    mouseUpHandler =  (e:MouseEvent)=>{
           this.clicked = false
           let x = e.clientX -  this.startX ; 
           let y = e.clientY -  this.startY ; 
           this.existingShapes.push({
               type:"react" , 
               x: this.startX, 
               y: this.startY , 
               width:x , 
               height:y
           })
    }

    mousemoveHandler = (e:MouseEvent)=>{
          let x = e.clientX - this.startX ; 
          let y = e.clientY - this.startY ; 
          if(this.clicked){
             this.clearCanvas() ;  
             this.ctx.strokeStyle = "rgb(255,255,255)" 
             this.ctx.strokeRect(this.startX,this.startY,x,y) ;  
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
        this.canvas.removeEventListener("mousemove",this.mousemoveHandler) ; 
    }

}