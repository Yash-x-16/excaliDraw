import  { Request, Response } from "express";
import {signupSchema} from "@repo/validations/validations" ; 
import { prisma } from "@repo/db/db" ; 
import bcrypt from "bcrypt" ; 
import { SALT } from "../utils/envExports"; 
import jwt from "jsonwebtoken" ;
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
    const { email, password } = data.data ;
    try {
        const user = await prisma.user.findUnique({ 
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

        return res.status(200).json({ message: "Signin successful", token });
    } catch (error) {
        console.log("error in the signin controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};  