 export type shape = {
        type:"react" , 
        x:number , 
        y:number , 
        width:number , 
        height:number 
    }  | 
        {
            type:"circle" , 
            startX:number, 
            startY:number , 
            radius:number , 
        }  


export  type  tools = "rect" | "circle" | "pencil" | "arrow" 