import { Request , Response } from "express";
import {signinValidation,signupValidation} from "@repo/validations/validation" 
import {User} from "@repo/db/user"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/secret";

export const Signup = async(req:Request,res:Response)=>{
    const result = signupValidation.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validations"
        })
        return ; 
    }
    try {
        const {username,password,email}=result.data
        const isUserAlreadyExist = await User.findOne({
            email
        }) 
        if(isUserAlreadyExist){
            res.status(409).json({
                message:"user already exists"
            })
            return 
        }
        const salt  =  await bcrypt.genSalt(8) ; 
        const hashedPassword = await bcrypt.hash(password,salt) ; 
        const user = await User.create({
            email , 
            username , 
            password:hashedPassword 
        })
        res.json({
            message:"user created" , 
            username:user.username , 
            email:user.email ,
            rooms:user.rooms , 
            chats:user.chats 
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })
        console.log("error in signup",error) ; 
    }
}

export const Signin = async(req:Request,res:Response)=>{
    const result = signinValidation.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validations"
        })
        return 
    }
    try {
        const {email,password} = result.data ; 
        const isUserAlreadyExist = await User.findOne({email}) 
        if(isUserAlreadyExist){
            const hashedPassword = await bcrypt.compare(password,isUserAlreadyExist.password) ; 
            if(hashedPassword){
                const token = jwt.sign({userId:isUserAlreadyExist._id} as JwtPayload,JWT_SECRET as string) ;
                res.json({
                    message:"user logged in" , 
                    token 
                })  
                return 
            }
            res.status(401).json({
                message:"unauthorized"
            }) 
            return 
        }          
    } catch (error) {
        console.log("error in the signin",error)
        res.status(500).json({
            message:"internal server error"
        }) 
    }
}

export const IsUser = async(req:Request,res:Response)=>{
    const userId = req.userId
    try {
        const user = await User.findById(userId) 
        if(user){
            res.json({
                username:user.username ,
                email:user.email , 
                rooms:user.rooms , 
                chats:user.chats  
            })
        }   
    } catch (error) {
        console.log("error in the IsUser",error) 
        res.status(500).json({
            message:"internal server error" 
        })
    }
}