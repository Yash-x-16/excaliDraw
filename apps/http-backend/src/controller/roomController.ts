import {roomSchema} from "@repo/validations/validation"
import { Request,  Response } from "express" 
import {Room} from "@repo/db/Room" 


export const createRoom = async(req:Request,res:Response)=>{
    const result = roomSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(404).json({
            message:"invalid validation"
        })
        return
    }

    try {
        const {slug} =result.data 
        const userId = req.userId ; 
        const room = await Room.create({
            slug , 
            adminId:userId , 
        })
        res.status(201).json({
            message:"room Created",
            roomId:room._id , 
            slug
        })
        return 
    } catch (error) {
        console.log("error in the createRoom",error) ; 
        res.status(501).json({
            message:"internal server error"
        }) 
    }
}

export const deleteRoom = async(req:Request,res:Response)=>{
    try {
        const roomId = req.params.roomId ; 
        if(!roomId){
            res.status(404).json({
                message:"roomId not found"  
            })
            return
        }
        const deletedRoom = await Room.findByIdAndDelete({
           
                _id:roomId 

        }) ; 
        if(deletedRoom){
            res.json({
                deletedRoom,
                message:"room deleted" 
            })
            return
        }else{
            res.status(501).json({
                message:"some error occured"
            })
            return
        }
    } catch (error) {
        console.log("error in the deleting room",error) ; 
        res.status(501).json({
            message:"internal server error"
        })
    }
}

export const getRoom = async (req:Request,res:Response)=>{
    try {
        const userId = req.userId ; 
        const allRooms = await Room.find({
            adminId:userId
        }).lean()
        if(allRooms.length>0){
            res.json({
                message:"rooms are" , 
                allRooms
            })
        }else{
            res.status(404).json({
                message:"no room available"
            })
        }
    } catch (error) {
        console.log("error in the getRoom",error) 
        res.status(501).json({
            message:"internal server error"
        })   
    }
}