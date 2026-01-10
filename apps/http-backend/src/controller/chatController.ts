import { Request, Response } from "express";
import {Chat} from "@repo/db/Chat" 

export const getChats = async(req:Request,res:Response)=>{
    try {
        const userId  = req.userId 
        const chats = await Chat.findById(userId).lean() ; 
        if(chats){
            res.json({
                message:"here are your chats" , 
                chats
            })
            return
        }else{
            res.status(404).json({
                message:"unable to find a chat"
            }) ; 
            return
        }
    } catch (error) {
        console.log("error in getChats",error) ; 
        res.status(501).json({
            message:"internal server error"
        })
    }
}