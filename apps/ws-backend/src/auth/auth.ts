import { JWT_SECRET } from "@repo/backend-common/secret"
import jwt, {  JwtPayload } from "jsonwebtoken" 

export function isTokenValid(token :string){
    try {
        const decoded = jwt.verify(token , JWT_SECRET) as JwtPayload; 
        if(decoded.userId){ 
            const userId  = decoded.userId
            return userId ; 
        }else{
            return null 
        }
    } catch (error) {
        console.log("error in the auth in ws")
    }
}