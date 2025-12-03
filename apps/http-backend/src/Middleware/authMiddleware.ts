import { JWT_SECRET } from "@repo/backend-common/secret";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["token"] ; 
    if(!token){
        res.status(404).json({
            message:"token not found" 
        })
        return 
    }

    try {
        const decoded = jwt.verify(token as string,JWT_SECRET) as JwtPayload
        if(decoded.userId){
            req.userId = decoded.userId ; 
            next()
        }else{
            res.status(401).json({
                message:"unauthorized user"
            })  
            return 
        }
    } catch (error) {
        console.log("error in the authmiddleware",error) 
        res.status(500).json({
            message:"internal server error" 
        })
    }
}