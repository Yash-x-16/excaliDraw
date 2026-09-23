import  { Request, Response } from "express";
import {signupSchema} from "@repo/validations/validations" ; 
import { prisma } from "@repo/db/db" ;
export const signup = async(req: Request, res: Response) => {
    const data = signupSchema.safeParse(req.body) ;
    if(!data.success){
        return res.status(400).json({error:data.error}) ; 
    } 
    try { 
        const { email, password, username, profilePicture } = data.data ;
        const isUserExist = await prisma.user.findUnique({
            where:{
                email:data.data.email           
            }
        });
        if(isUserExist){
            return res.status(400).json({error:"User already exists"}) ; 
        }
        const user = await prisma.user.create({
            data:{
                email,      
                password,
                userName:username,
                profilePicture  
            }
        }); 
        return res.status(201).json({message:"User created successfully",username:user.userName,email:user.email,profilePicture:user.profilePicture}) ;
    } catch (error) {
        console.log("error in the signup controller",error) ;
        return res.status(500).json({error:"Internal Server Error"}) ; 
    }
}   
export const signin = async(req: Request, res: Response) => {
    const data = signupSchema.safeParse(req.body) ; 
    if(!data.success){
        return res.status(400).json({error:data.error}) ; 
    }   
    
}