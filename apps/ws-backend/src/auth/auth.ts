import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET}from "@repo/backend-common/secret"
export const tokenValidator = (token :string):string | null=>{
    try {
        const decoded = jwt.verify(token as string , JWT_SECRET) as JwtPayload ; 
        if(decoded.userId){
            return decoded.userId
        } else{
            return null ; 
        }
    } catch (error) {
        console.log("error in the auth",error) ; 
        return null ; 
    }
}