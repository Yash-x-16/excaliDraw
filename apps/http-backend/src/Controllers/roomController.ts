import { Request, Response } from "express";
import {roomValidation} from "@repo/validations/validation"
import {Room} from "@repo/db/room"

export const createRoom = async(req:Request,res:Response)=>{
    const result = roomValidation.safeParse(req.body) ; 
    if(!result.success){
        res.status(401).json({
            message:"invalid validation"
        })
        return 
    }
    try {
        const {slug} = result.data ; 
        const isRoomAlreadyExist = await Room.find({
            Name:slug
        })
        if(isRoomAlreadyExist){
            res.status(409).json({
                message:"room already exist"
            })
            return ; 
        }
        const room = await Room.create({
            Name:slug 
        }) 
        res.json({
            message:"room created" , 
            roomId:room._id , 
            roomName:room.Name 
        })
    } catch (error) {
        console.log("error in the createRoom",error)
        res.status(500).json({
            message:"internal server error"
        })
    }
}

export const deleteRoom = async (req:Request,res:Response)=>{
    try {
        const {roomId} = req.body ; 
        const isroomExist = await Room.findById(roomId) 
        if(isroomExist){
            await Room.findByIdAndDelete(roomId) 
            res.status(400).json({
                message:"room delted"
            })
            return 
        }
        res.status(404).json({
            message:"room not found"
        })
    } catch (error) {
        console.log("error in the deleteRoom",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
}