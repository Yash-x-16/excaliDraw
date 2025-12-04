import { Request, Response } from "express";
import {Chat} from "@repo/db/chat"
export const getChats = async (req:Request,res:Response)=>{
    try {
        const roomId = req.params.roomId ; 
        if(!roomId){
            res.status(404).json({
                message:"roomId not found"
            })
            return 
        }
        const chats = await Chat.find({roomId}).lean().limit(50) 
        res.json({
            chats 
        })    
    } catch (error) {
        console.log("error in the getting chats",error) ; 
        res.status(500).json({
            message:"internal server error"
        })
    }   
}