import { Request, Response } from "express";
import {signinSchema,signupSchema} from "@repo/validations/validations" 
import bcrypt from "bcrypt" 
import {client }from "@repo/db/client"
import { salt  , JWT_SECRET} from "../exports/dotenv";
import { authRequest } from "../types/express"; 
import jwt from "jsonwebtoken"

export const signup  = async(req:Request,res:Response)=>{
    const parsedData = signupSchema.safeParse(req.body) ; 
    if(!parsedData.success){
            res.status(400).json({
                message:"inValid input"
            }) 
        return ;  
        } 
        try {
                const {username,email,password,profilePicture} = parsedData.data
                const userAlreadyExist = await client.user.findFirst({
                    where:{
                        
                    } 
                }) ; 
                if(userAlreadyExist){
                    res.status(404).json({
                        message:"user already exists" ,
                    })
                    return 
                } 
                const hashedPassword = await bcrypt.hash(password,salt) 
                const createdUser = await client.user.create({
                    data:{
                        email , 
                        username , 
                        password :hashedPassword , 
                        profilePicture ,
                    }
                })
                res.status(201).json({
                    message:"user created" , 
                    user : {...createdUser ,
                        password:null
                    }
                })
    } catch (error) {
        console.log("error in the signup controller ",error)
        res.status(501).json({
            message:"server error"
        })
    }
} 

export const signin = async(req:authRequest,res:Response)=>{
    const parsedData = signinSchema.safeParse(req.body) ; 
    if(!parsedData.success){
        res.status(400).json({
           message:"invalid validation"
        })
        return
    }

    try {
        const {email,password} = parsedData.data
        const isUserAlreadyExist = await client.user.findFirst({
            where:{
                email
            }
        })
        if(isUserAlreadyExist){
            const checkedPassword = await bcrypt.compare(password,isUserAlreadyExist.password) ; 
            const userId = isUserAlreadyExist.id
            if(checkedPassword){
               const token =   jwt.sign({userId},JWT_SECRET)
               res.status(200).json({
                message:"user logged in succesfully" , 
                token
               })
               return 
            }else{
                res.status(404).json({
                    message:"user not found please signup" 
                })
            }
        }
    } catch (error) {
        console.log("error in the signinshcma",error)
    }
}