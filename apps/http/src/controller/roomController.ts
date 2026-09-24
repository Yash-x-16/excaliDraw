import { Request, Response } from "express";
import{ prisma }from "@repo/db/db" ;

export const getRooms = async(req:Request,res:Response) => {
    try{
        const userId = req.userId ;
        if(!userId){
            return res.status(401).json({error:"Unauthorized"}) ; 
        }   
        const rooms = await prisma.room.findMany({
            where:{
                    adminId:userId
            }
        }) ;     
        return res.status(200).json({message:"Rooms fetched successfully",rooms}) ;
    }catch(error){
        console.log("error in the getRooms controller",error) ; 
        return res.status(500).json({error:"Internal Server Error"}) ; 
    }
} 

export const createRoom = async(req:Request,res:Response) => {
    try{
        const userId = req.userId ;
        if(!userId){
            return res.status(401).json({error:"Unauthorized"}) ; 
        }
        const { slug } = req.body ;
        const room = await prisma.room.create({
            data:{  
                slug,
                adminId:userId
            }
        }) ; 
        return res.status(201).json({message:"Room created successfully"}) ; 
    }catch(error){
        console.log("error in the createRoom controller",error) ; 
        return res.status(500).json({error:"Internal Server Error"}) ; 
    }
}

export const deleteRoom = async(req:Request,res:Response) => {
    try{
        const userId = req.userId ; 
        if(!userId){
            return res.status(401).json({error:"Unauthorized"}) ; 
        }
        const { roomId } = req.body ;
        const room = await prisma.room.findUnique({
            where:{ 
                roomId
            } 
        }) 
        if(!room){
            return res.status(404).json({
                message:"room not found"
            })
        } 
        await prisma.room.delete({
            where:{
                roomId:room.roomId
            }
        })
        return res.status(200).json({
            message:"room deleted"
        })
        
    }catch(error){
        console.log("error in the deleteRoom",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
}