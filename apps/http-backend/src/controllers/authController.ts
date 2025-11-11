import { Request, Response } from "express";
import {signinValidations, signupValidation} from "@repo/validations/validate"
import {User}from"@repo/db/userModel"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/secret";

export const Signup = async(req:Request,res:Response)=>{
    const result = signupValidation.safeParse(req.body) 
    if(result.error){
        res.status(400).json({
            message:"invalid validation"
        })
        console.log("error in validation",result.error) ;  
        return
    }

    try {
        const {email,username,password} = result.data 
        const isUserAlreadyExist = await User.findOne({
            email
        })

        if(isUserAlreadyExist){
            res.status(400).json({
                message:"user already exist"
            })
            return 
        }
        const salt = await bcrypt.genSalt(8) ; 
        const hashedPassword = await bcrypt.hash(password,salt)  ; 
        const newUser = await User.create({
            username , 
            email , 
            password:hashedPassword , 
            createdAt:Date.now()
        })
        const token = jwt.sign({userId:newUser._id}as JwtPayload,JWT_SECRET as string) 
        res.json({
            token , 
            user:{
                username:newUser.username , 
                email:newUser.email , 
                createdAt:newUser.createdAt  ,
                rooms:newUser.rooms
            }
        }) 
    } catch (error) {
        console.log("error in the signup controller")
        res.status(500).json({
            message:"internal server error"
        })
    }
}

export const signin = async (req:Request,res:Response)=>{
    const result = signinValidations.safeParse(req.body) 
    if(result.error){
        
        console.log("validation error",result.error) 
        
        res.status(400).json({
            message:"invalid validation"
        })

        return; 
    }

    try {
        const {email,password} = result.data 
        const isUserAlreadyExist = await User.findOne({
            email
        }) 
        if(isUserAlreadyExist){
            
        }
    } catch (error) {
        console.log("error in the signup controller")
        res.status(500).json({
            message:"internal server error"
        })
    }
}