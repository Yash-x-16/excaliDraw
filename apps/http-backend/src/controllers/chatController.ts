import { Request,Response } from "express";
import {Room} from "@repo/db/room"
export const getChats  =  (req:Request,res:Response)=>{ 
    try {    
        const roomId = req.params.roomId ; 
        if(!roomId){
            res.status(404).json({
                message:"roomId not found"
            })
            return 
        }
        const chats = Room.aggregate([
            {
                $match:{roomId:roomId} , 
                $lookup:{
                    from:"chats" , 
                    localField:"chats" ,  
                    foreignField:"_id" , 
                    as:"messages"
                } , 
                $limit:50
            }
        ])
        res.json({
            messages:chats
        })   
    } catch (error) {
        console.log("error in the chatController",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
}