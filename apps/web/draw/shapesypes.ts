 export interface shape{
        type:"react" , 
        x:number , 
        y:number , 
        width:number , 
        height:number  | 
        {
            type:"circle" , 
            centerX:number, 
            centerY:number , 
            radius:number , 
        } 
    }