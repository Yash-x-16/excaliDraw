import { Request, Response } from "express";
import { client } from "@repo/db/client";
import bcrypt, { hash } from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

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

export const signin = async (req:Request,res:Response)=>{
    const {email,password}=req.body
    try{
        
        if(!email || !password){
            res.status(401).send({
                message:"all fields are required !!"
            })
            return ; 
        }

        const user  = await client.user.findUnique({
            where:{
                email
            }
        })

        const hashedPassword = await bcrypt.compare(password,user?.password as string)

        if(hashedPassword===false){
            res.status(400).send({
                message:"unauthorized"
            })
            return
        }else{

           const token = jwt.sign(user?.id as Number ,JWT_SECRET)
            res.status(201).send({
                message:"user logged in succesfully !!",
                token
            })
        }
    }catch(e){
        res.status(401).send({
            message:`the error is :\n${e}`
        })
    }
}