import { shape } from "./shapesypes"

class canvasManager {
    private canvas :HTMLCanvasElement 
    private ctx :CanvasRenderingContext2D 
    private roomId:string 
    private existingShapes:shape[] ; 

    constructor (canvas:HTMLCanvasElement ,ctx:CanvasRenderingContext2D , roomId:string){
        this.canvas = canvas   
        this.ctx = canvas.getContext("2d")! ; 
        this.roomId = roomId  
        this.existingShapes = [] ;  
        this.init() ; 
    }

    init(){
        //  this.existingShapes = getExistingShape()
    }
}