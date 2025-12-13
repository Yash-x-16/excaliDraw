import { Request, Response } from "express";
import {signinSchema,signupSchema} from "@repo/validations/validations"
import { commonResponse } from "../utils/utils";
import bcrypt from "bcrypt"
import {User} from "@repo/db/user" 
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/secret";

export const signup = async (req:Request,res:Response)=>{
    const result  = signupSchema.safeParse(req.body) ; 
    
    if(!result.success){
        commonResponse("invalid validation",400,res) ; 
        return 
    } ; 

    try {
        const {username,email,password} =result.data ; 
        const isUserAlreadyExist = await User.findOne({
            email
        }) ; 
        if(isUserAlreadyExist){
            commonResponse("user Already exist",400 ,res) ; 
            return 
        }
        const salt = await bcrypt.genSalt(7) ; 
        const hashedPassword = await bcrypt.hash(password,salt) ; 

        await User.create({
            email , 
            username , 
            password:hashedPassword
         }) 
        commonResponse("user created",201,res,{
            username , 
            email  
        })
        return 
    } catch (error) {
        console.log("error in the signup function",error) ; 
        commonResponse("internal server error",500,res) ; 
    }
}

export const signin = async (req:Request,res:Response)=>{
    const result = signupSchema.safeParse(req.body) ; 
    if(!result.success){
        commonResponse("invalid validation",400,res) ; 
        return 
    }
    try {
        const {username,password} = result.data ; 
        const isUserExist  = await User.findOne({
            username
        }) ;   
        if(isUserExist){
            const checkPassword = await bcrypt.compare(password,isUserExist.password) ; 
            if(checkPassword){
                const token =jwt.sign({userId:isUserExist._id}as JwtPayload,JWT_SECRET) ; 
                commonResponse("user logged in",200,res,{
                    token 
                }) 
                return 
            }
            commonResponse("unauthorized",400,res) ; 
            return 
        }
        commonResponse("user not found",404,res) ; 
        return 
    } catch (error) {
        console.log("error in the signin ",error) ; 
        commonResponse("internal server error",500,res) ; 
        return 
    }
}

export const isUser = async (req:Request,res:Response)=>{
    try {
        const userId = req.userId ; 
        const user = await User.findById(userId) ; 
        if(user){
            commonResponse("here is your user",200,res,{
                username:user.username , 
                email:user.email , 
                rooms:user.rooms , 
                chats:user.chats
            }) ; 
            return ; 
        } 
        commonResponse("user not found",404,res) ; 
    } catch (error) {
        console.log("error in is User",error) ; 
        commonResponse("internal server error",500,res) ; 
    }
}