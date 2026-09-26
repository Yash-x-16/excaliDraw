import { shape } from "./shapesypes"

class canvasManager { 

    private canvas :HTMLCanvasElement 
    private ctx :CanvasRenderingContext2D 
    private roomId:string 
    private existingShapes:shape[] ; 
    private socket:WebSocket 
    private clicked:boolean 
    private startX = 0 
    private startY = 0 

    constructor (canvas:HTMLCanvasElement ,ctx:CanvasRenderingContext2D , roomId:string,socket:WebSocket){
        this.canvas = canvas   
        this.ctx = canvas.getContext("2d")! ; 
        this.roomId = roomId  
        this.existingShapes = [] ;  
        this.init() ;  
        this.initHandlers() ;  
        this.socket = socket ; 
        this.mouseHandlers() 
        this.clicked  = false
    }

    init(){
        //  this.existingShapes = getExistingShape()
    } 

    initHandlers(){
        //socket logic here
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

    mouseHandlers(){

           this.canvas.addEventListener("mousedown",(e)=>{  
                this.startX = e.clientX 
                this.startY = e.clientY 
                this.clicked = true
                console.log("mouseDown x",e.clientX)
                console.log("mouseDown y",e.clientY)
            })

            this.canvas.addEventListener("mouseup",(e)=>{ 
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
            }) 

            this.canvas.addEventListener("mousemove",(e)=>{ 
                 let x = e.clientX - this.startX ; 
                 let y = e.clientY - this.startY ; 
                 if(this.clicked){
                    this.clearCanvas() ;  
                    this.ctx.strokeStyle = "rgb(255,255,255)" 
                    this.ctx.strokeRect(this.startX,this.startY,x,y) ;  
                } 
      
            })
    }

}