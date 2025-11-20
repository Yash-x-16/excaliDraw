import { CanvasComponent } from "@/app/components/canvasComponent"

export default async function Canvas({params}:{
    params:{
        roomId:string
    }
}){
    const roomId = (await params).roomId 
    
    return <CanvasComponent roomId={roomId}></CanvasComponent>
}
