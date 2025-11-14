import CanvasComponent from "@/app/component/roomCanvas";

export default async function Canvas ({params}:{
    params:{
         roomId:string
    }
}){
    const roomId = (await params).roomId ;  
    console.log("roomId is ..",roomId) ;
    return <CanvasComponent roomId={roomId}/>
}