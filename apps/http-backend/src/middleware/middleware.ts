import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

export const Middleware = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.headers["authorization"]
        const decoded = jwt.verify(token as string, JWT_SECRET);

        if (typeof decoded === "object" && "id" in decoded) {
            req.userId = (decoded as JwtPayload).id;
            next()
        } else {
            res.status(401).send({
                message:"unauthorized by middleware !!"
            })
        }
    }catch(e){
        res.status(401).send({
            message:`error in middleware is : \n${e}`
        })
    }
}