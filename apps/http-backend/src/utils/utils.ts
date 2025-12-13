import { Response } from "express";

export function commonResponse(message:string,statusCode:number,res:Response ,data?:any){
    res.status(statusCode).json({
        message ,
        data
    })
    return 
}