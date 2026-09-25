import Canvas from "@/app/components/canvas";

export default async function CanvasPage ({ params }:{params:{roomId:string}}){
   const roomId =  (await params).roomId ;  

    return <Canvas roomId={roomId}/>
}