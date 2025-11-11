import { Request, Response } from "express";
import { Chat}from "@repo/db/chatModel"
export const getChats = async (req:Request,res:Response)=>{ 
    try {
        
            const roomId = req.params.roomId ; 
            if(!roomId){
                res.status(404).json({
                    message:"roomId not found"
                })
                return 
            }
            const chats =  await Chat.findById(roomId).sort({_id:-1}).limit(50).populate("userId").lean() 
            res.json({
                chats
            })  

    } catch (error) { 

            console.log("error in the getting chats",error) 
            res.status(500).json({
                message:"internal server error"
            })  

    }
}