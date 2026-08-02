import {  Response } from "express";
import { authRequest } from "../types/express";
import { client } from "@repo/db/client";

export const createRoom = async(req:authRequest,res:Response)=>{ 
    const slug = req.body.slug
    try {
        const userId = req.userId  
        const slugAlreadyExist = await client.room.findUnique({where:{slug}}) 
        if(slugAlreadyExist){
            res.status(400).json({
                message:"slug already exist !!"
            })
            return 
        }
        await client.room.create({
            data:{
                slug , 
                adminId:userId as number
            }
        })
    } catch (error) {
        console.log("error in the create Room ",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
} 

export const deleteRoom = async (req:authRequest,res:Response)=>{
    const slug = req.body.slug
    try {
         const slugAlreadyExist = await client.room.findUnique({where:{slug}}) 
        if(slugAlreadyExist){
            await client.room.delete({
                where:{
                    id : slugAlreadyExist.id
                }
            }) 
            res.status(200).json({
                message:"room deleted succesfully"
            })
        }else{
        res.status(404).json({
                message:"room doesn't  exist !!"
            })
            return
        } 
    } catch (error) {
        console.log("error in the deleteRoom ",error) ; 
        res.status(500).json({
            message:"internal server error"
        })
    }
} 


export const getRoom = async(req:authRequest,res:Response)=>{
    try {
        const userId = req.userId ; 
        const allRooms  = client.room.findMany({
            where:{
                adminId:userId as number
            }
        })
        res.status(200).json({
            message:"rooms fetched succesfully" , 
            rooms : {...allRooms}
        })
    } catch (error) {
        console.log("error in the getRooms ",error) 
        res.status(501).json({
            message:"internal server error"
        })
    }
}