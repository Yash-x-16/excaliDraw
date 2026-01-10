import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken" 
import {JWT_SECRET} from "@repo/backend-common/secret" 

export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers["token"] 
        if(!token){
            res.status(404).json({
                message:"token not found"
            })
            return 
        }
        const decoded = jwt.verify(token as string ,JWT_SECRET) as JwtPayload; 
        if(decoded.userId){
            req.userId = decoded.userId ; 
            next() ; 
        }else{
            res.status(400).json({
                message:"unauthorized"
            })
            return 
        }
    } catch (error) {
        console.log("error in the authMiddleware",error) ; 
        res.status(501).json({
            message:"internal server error"
        })
    }
}