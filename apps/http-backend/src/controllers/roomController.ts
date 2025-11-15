import { Request, Response } from "express";
import {createRoomSchema}from "@repo/validations/validations" 
import {Room} from "@repo/db/room"

export const createRoom = async(req:Request,res:Response)=>{
    const result = createRoomSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation"
        })
        return 
    }
    try {
        const {title} = result.data 
        const isRoomExist = await Room.findOne({title}) 
        if(isRoomExist){
            res.status(400).json({
                message:"room already exist"
            })
            return 
        }
        const room = await Room.create({
            title , 
            createdAt:Date.now()  , 
            adminId:req.userId 
        }) 
        res.json({
            message:"created room" , 
            roomId:room._id , 
        })
    } catch (error) {
        console.log("error in the roomController is ",error) ; 
        res.status(500).json({
            message:"internal server error"
        })
    }
}