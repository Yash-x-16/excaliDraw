import { ReactNode } from "react"

interface prop{
    text?:string , 
    size?:size , 
    isOutlined?:boolean  , 
    classname?:string , 
    iconAtTheStart?:boolean ,  
    iconAtTheEnd?:boolean , 
    icon?:ReactNode
} 


type  size = "btn-xs" | "btn-xl" | "btn-md" | "btn-lg" 

export default function Button(prop:prop){
    return <button className={`btn btn-${prop.size}  
    ${prop.isOutlined?"btn-outline":""} 
    ${prop.classname}`}>
        <DefaultText/>
            {prop.iconAtTheStart?
            <span className="flex items-center gap-3">
           {prop.icon}
            {prop.text}
            </span>:<DefaultText />} 
    

        </button>
}

function DefaultText (prop:prop){
    return <span>
        {prop.text}
    </span>
} 