import { Request, Response } from "express";
import { client } from "@repo/db/client";
import bcrypt from "bcrypt"

export const signup =async (req:Request,res:Response)=>{
    const {email,password,username}=req.body
    try{
        if(!email || !password || !username){
             res.status(401).send({
                message:"all fields are required"
            })
            return ;
        }


        const alreadyExist = await client.user.findUnique({
            where:{
                email
            }
        })

        if(alreadyExist){
            res.send(402).send({
                message:"user already exist !!"
            })
        }

        const hashedPassword =await bcrypt.hash(password,7)
        
        const response = await client.user.create({
            data:{
                username,
                email,
                password:hashedPassword
            }
        })

        res.status(200).send({
            message:"account created succesfully !!",
            user:{...response,
                password:null}
        })
        
    }catch(e){
        res.send({
            message:`error in the signup function is :\n${e}`
        })

    }
}