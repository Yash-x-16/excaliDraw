import jwt, { JwtPayload } from "jsonwebtoken" 
import {JWT_SECRET} from "@repo/backend-common/secret" 

export const checkAuth = (token:string):string |null=>{
    try {
        const decoded = jwt.verify(token as string ,JWT_SECRET) as JwtPayload ; 
        if(decoded.userId){
            return decoded.userId as string ; 
        }else{
            return null ; 
        }
    } catch (error) {
        console.log("Error in auth") ; 
        return null 
    }
}