import { NextFunction, Request, Response } from "express";
import { commonResponse } from "../utils/utils";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/secret";

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers["token"] ; 
        if(!token){
            commonResponse("token not found",404,res) ; 
            return 
        }     
        const decoded  = jwt.verify(token as string,JWT_SECRET) as JwtPayload ; 
        if(decoded.userId){
            req.userId = decoded.userId ; 
            next() 
        }else{
            commonResponse("userId not found",404,res) ; 
            return 
        }
    } catch (error) {
        console.log("error by authMidlleware",error) ; 
        commonResponse("internal server error",500,res) ; 
    }
}