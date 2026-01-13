import { ReactNode } from "react"

interface prop{
    text:string , 
  
    isOutlined?:boolean  , 
    classname?:string , 
    iconAtTheStart?:ReactNode ,  
    iconAtTheEnd?:ReactNode , 
} 



export default function Button(prop:prop){
    return <button 
    className={`btn  
    ${prop.isOutlined?"btn-outline":""} 
    ${prop.classname}`}>
        <span className="flex items-center gap-2">
            {prop.iconAtTheStart?prop.iconAtTheStart:""} 
            {prop.text} 
            {prop.iconAtTheEnd?prop.iconAtTheEnd:""}
        </span>
        </button>
}

function DefaultText ({text}:{text:string}){
    return <span>
        {text}
    </span>
} 