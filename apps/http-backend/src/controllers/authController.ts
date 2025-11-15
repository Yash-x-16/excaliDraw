import { Request,Response } from "express";
import { signupSchema,signinSchema } from "@repo/validations/validations"
import {User} from "@repo/db/user" 
import bcrypt from "bcrypt"  
import {JWT_SECRET,DEFAULT_PROFILE_PICTURE} from "@repo/backend-common/secret"
import jwt from "jsonwebtoken" 

export const signup = async(req:Request,res:Response)=>{
    const result = signupSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation"
        })
        return 
    }    
    try {
        const {username,password,email}  = result.data 
        const isUserAlreadyExist = await User.findOne({email})  
        if(isUserAlreadyExist){
            res.status(403).json({
                message:"user already exist !"
            })
            return 
        }
        const salt = await bcrypt.genSalt(8) ; 
        const hashedPassword = await bcrypt.hash(password,salt) ; 
        const user = await User.create({
            username , 
            password:hashedPassword , 
            email , 
            createdAt:Date.now() , 
            profilePicture:DEFAULT_PROFILE_PICTURE
         }) 
        const token = jwt.sign({userId:user._id},JWT_SECRET) ;
        res.json({
            token , 
            message:"user created"
         })
    } catch (error) {
        console.log("error in the signup controller",error) ; 
        res.status(500).json({
            message:"internal server error"
        })
    }
} 

export const signin = async (req:Request,res:Response)=>{
    const result = signinSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation"
        }) 
        return 
    }
    try {
        const {email,password} = result.data  
        const isUserAlreadyExist = await User.findOne({email}) ; 
        if(isUserAlreadyExist){
            const checkPassword = await bcrypt.compare(password,isUserAlreadyExist.password) ; 
            if(checkPassword){
                const token = jwt.sign({userId:isUserAlreadyExist._id},JWT_SECRET) 
                res.json({
                    token , 
                    message:"user logged in"
                })
                return 
            }else{
                res.status(400).json({
                    message:"unauthorized !"
                }) 
                return 
            }
        } else{
            res.status(404).json({
                message:"user not found :) "
            })
        }

    } catch (error) {
        console.log("error in the signup controller ",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
}

export const isUser = async (req:Request,res:Response)=>{
    try {
        const userId = req.userId  ; 
        if(!userId){
            res.status(400).json({
                message:"unauthorized"
            })
            return 
        }
        const user = await User.findById(userId) ; 
        if(user){
            res.json({
                username:user.username , 
                email:user.email , 
                profilePicture:user.profilePicture  , 
                room:user.room , 
                chats:user.chat
            })
            return 
        }
        res.status(404).json({
            message:"user not found"
        })
    } catch (error) {
        console.log("error in the isUser controller ",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
}