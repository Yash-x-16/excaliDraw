 export type shape = {
        type:"react" , 
        x:number , 
        y:number , 
        width:number , 
        height:number 
    }  | 
        {
            type:"circle" , 
            centerX:number, 
            centerY:number , 
            radius:number , 
        }  


export  type  tools = "react" | "circle" | "pencil" | "arrow" 