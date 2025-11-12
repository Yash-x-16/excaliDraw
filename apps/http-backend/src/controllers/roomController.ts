import { Request, Response } from "express";
import { createRoomValidations } from "@repo/validations/validate";
import {Room} from "@repo/db/roomModel" 
import { User } from "@repo/db/userModel";

export const createRoom = async(req:Request,res:Response)=>{
   
    const result = createRoomValidations.safeParse(req.body) ; 
    if(result.error){
        res.status(400).json({
            message:"invalid validation"
        }) 
        return 
    }
    try {
        const {title} = req.body ; 
        const userId= req.userId 
       ;  
        

        const room = await Room.create({
            admin:userId , 
            slug:title  ,
            createdAt:Date.now()
        })  
        
        await User.findByIdAndUpdate(userId,{$push:{
            room:room._id
        }}) 

        res.json({
            message:"room created" , 
            roomId:room._id 
        })
    } catch (error) {
        console.log("error in creating room",error) , 
        res.status(500).json({
            message:"internal server error"
        })
    }
}