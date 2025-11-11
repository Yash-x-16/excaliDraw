import { Request, Response } from "express";
import { createRoomValidations } from "@repo/validations/validate";
import {Room} from "@repo/db/roomModel" 

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
        const room = await Room.create({
            admin:userId , 
            slug:title 
        })
        res.json({
            message:"room created"
        })
    } catch (error) {
        console.log("error in creating room") , 
        res.status(500).json({
            message:"internal server error"
        })
    }
}