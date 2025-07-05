import { client } from "@repo/db/client";
import { Request, Response } from "express";

export const chatController = async(req:Request,res:Response)=>{
    const roomID = req.params.roomId
    try{
        const messages =await client.chat.findMany({
            where:{
                roomId :Number(roomID)
            },orderBy:{
                id:"desc"
            },
            take:50
        })

        res.json({
            messages
        })
    }catch(e){
        console.log(e)
        res.status(401).send({
            message: `error in chat Controller is ${e}`
        })
    }
}