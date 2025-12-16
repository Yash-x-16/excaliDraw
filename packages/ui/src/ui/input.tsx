import { ReactNode } from "react";

interface input{
    type:"text" | "password" , 
    iconOnStart?:ReactNode , 
    iconOnEnd?:ReactNode  , 
    text?:string  , 
    label?:string , 
    variant:"primary" | "secondary"
}

export function InputBox(prop:input){
    return <div className="flex">
        <span>
            {prop.label}
        </span>
    </div> ; 
}