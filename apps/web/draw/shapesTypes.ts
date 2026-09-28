 export type shape = {
        type:"rect" , 
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
        }  | {
            type:"line" , 
            startX  :number
            startY:  number
            endX:   number
            endY:   number
        } |{
            type:"pencil" , 
            points:{x:number,y:number}[] 
        }

export  type  tools = "rect" | "circle" | "pencil" | "arrow" |"line"