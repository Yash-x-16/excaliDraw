import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken" 
import { JWT_SECRET } from "../exports/dotenv";
import { authRequest } from "../types/express";
export const authMiddleware = (req:authRequest,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers["token"]
        const decoded = jwt.verify(token as string , JWT_SECRET) as JwtPayload 
        if(decoded.userId){
            req.userId = decoded.userId 
            next()
        }else{
            res.status(400).json({
                message:"unauthorized user"
            })
            return 
        }
    } catch (error) {
        console.log("error in the authMiddleware") 
        res.status(500).json({
            message:"internal server error"
        })
    }
}