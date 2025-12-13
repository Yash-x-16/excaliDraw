import { Request, Response } from "express";
import {roomSchema} from "@repo/validations/validations"
import { commonResponse } from "../utils/utils";
import {Room} from "@repo/db/room"

export const createRoom = async(req:Request,res:Response)=>{
    const result  = roomSchema.safeParse(req.body) ; 
    if(!result.success){
        commonResponse("invalid validation",400,res) ; 
        return ; 
    }
    try {
        const {slug} = result.data ; 
        const userId = req.userId ; 
        const room = await  Room.create({
            slug  ,
            adminId:userId 
        })
        commonResponse("room created",200,res,{
            roomId:room._id 
        })
        return 
    } catch (error) {
        console.log("error in creating room",error) ; 
        commonResponse("internal server error",500,res) ; 
        return 
    }
} ; 

export const deleteRoom = async(req:Request,res:Response)=>{
    try {
        const roomId = req.params.roomId ; 
        if(!roomId){
            commonResponse("roomId not found", 404,res) ; 
            return 
        }
        await Room.findByIdAndDelete(roomId) ;   
        commonResponse("room deleted",200,res) ; 
        return 
    } catch (error) {
        console.log("error in deleting room",error) ; 
        commonResponse("internal server error",500,res) ; 
        return 
    }
}

export const getRooms =async(req:Request,res:Response)=>{
    try {
        const userId = req.userId ; 
        const allRooms = await Room.find({
            adminId:userId 
        }).lean() 
        commonResponse("here are your rooms",200,res,{
            allRooms
        })
        return ; 
    } catch (error) {
        console.log("error in getting all rooms",error) ; 
        commonResponse("internal server error",500,res) ; 
        return  ; 
    }
}