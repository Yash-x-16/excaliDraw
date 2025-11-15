import { Request,Response } from "express";
import { signupSchema,signinSchema } from "@repo/validations/validations"

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
    } catch (error) {
        
    }
}