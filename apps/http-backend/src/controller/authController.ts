import { Request, Response } from "express";
import {signinSchema,signupSchema} from "@repo/validations/validation" 
import {User} from "@repo/db/User"
import bcrypt from "bcrypt" 
import {saltRounds,JWT_SECRET} from "@repo/backend-common/secret" 
import jwt, { JwtPayload } from "jsonwebtoken"

export const signup = async(req:Request,res:Response)=>{
    const result = signupSchema.safeParse(req.body) 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation"
        })
        return 
    }
    try {
        const {username,password,email} = result.data ; 
        const isUserExist = await User.findOne({
            email
        })  
        if(isUserExist){
            res.status(400).json({
                message:"user already exist"
            })
            return 
        }
        const salt = await bcrypt.genSalt(saltRounds) ; 
        const hashedPassword =await bcrypt.hash(password,salt) ;
        const user = await User.create({
            username , 
            email , 
            password:hashedPassword , 
            rooms:[] , 
            chats:[]
        })
        res.status(201).json({
            message:"user created" , 
            username:user.username , 
            email:user.email , 
        })
    } catch (error) {
        console.log("error in the signup ",error)
        res.status(501).json({
            message:"internal server error"
        })
    }
}

export const signin = async(req:Request,res:Response)=>{
    const result = signinSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation" ,
        })
        return 
    }
    try {
        const {email,password} = result.data ; 
        const isUserExist = await User.findOne({
            email
        })
        if(isUserExist){
            const hashedPassword = await bcrypt.compare(password,isUserExist.password) ; 
            if(hashedPassword){
                const token = jwt.sign({userId:isUserExist._id} as JwtPayload,JWT_SECRET as string)  ; 
                res.status(200).json({
                    message:"user logged in" , 
                    token
                }) 
                return 
            }else{
                res.status(401).json({
                    message:"unauthorized"
                })
                return 
            }
        }else{
            res.status(404).json({
                message:"user not found"
            })
            return 
        }
    } catch (error) {
        console.log("error in the signin ",error) ; 
        res.status(501).json({
            message:"internal server error"
        })
    }
}

export const isUser = async(req:Request,res:Response)=>{
    try {
        const userId = req.userId 
        const user = await User.findById(userId) 
        if(user){
            res.status(200).json({
                username:user.username , 
                email:user.email , 
                rooms:user.rooms , 
                chats:user.chats 
            })
            return 
        }else{
            res.status(404).json({
                message:"user not found"
            })
            return 
        }
    } catch (error) {
        console.log("error in the isUser",error) 
        res.status(501).json({
            message:"internal server error"
        })
    }
}