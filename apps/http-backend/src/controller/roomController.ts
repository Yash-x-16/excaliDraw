import { client } from "@repo/db/client";
import { Request, Response } from "express";

export const roomController = async (req:Request,res:Response)=>{
    const slug :string = req.body.slug
    try{
        const userId= Number(req.userId) 
        
      const room =  await client.room.create({
            data:{
                slug,
                adminId:userId
            }
        })

        res.status(200).send({
            message:"room created succesfully !!",
            rooId:room.Id
        })

    }catch(e){
        res.status(401).send({
            message:`error in roomController is : ${e}`
        })
    }
}