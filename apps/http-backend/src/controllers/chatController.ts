import { Request, Response } from "express";
import { commonResponse } from "../utils/utils";
import {Chat} from "@repo/db/chat"
export const getChats = async(req:Request,res:Response)=>{
    
    try {
        
        const roomId = req.params.roomId ; 
        
        if(!roomId){
            commonResponse("roomId not found",404,res) ; 
            return 
        }
        
        const chats = await Chat.find({
            roomId 
        }).lean().limit(50) ; 

        commonResponse("here are your chats",200,res) ; 
        return ; 
    } catch (error) {
        console.log("error in getting chats",error) ; 
        commonResponse("internal server error",500,res) ; 
        return 
    }
}