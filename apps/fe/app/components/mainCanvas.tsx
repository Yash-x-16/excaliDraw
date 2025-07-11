import { useEffect, useRef} from "react"
import { Drawing } from "../draw"


export function MainCanvas({roomId}:{
    roomId:string
}){
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

        if(canvasRef.current){//@ts-ignore
          Drawing(canvasRef.current,roomId,socket)
        }

    },[canvasRef])

    return <div className="h-screen w-screen bg-white">
        <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef}>
        </canvas>
    </div>
}