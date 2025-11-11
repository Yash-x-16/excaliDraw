import { JWT_SECRET } from "@repo/backend-common/secret"
import jwt, {  JwtPayload } from "jsonwebtoken" 

export const isTokenValid=(token :string):string | null=>{
    try {
        const decoded = jwt.verify(token , JWT_SECRET) as JwtPayload; 
        if(decoded.userId){ 
            const userId  = decoded.userId
            return userId ; 
        }
        if(!decoded){
            return null 
        }
        return null 
    } catch (error) {
        console.log("error in the auth in ws") 
        return null 
    }
}