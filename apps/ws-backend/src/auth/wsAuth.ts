import { JWT_SECRET } from "@repo/backend-common/secret";
import jwt, { JwtPayload } from "jsonwebtoken" ; 

export const tokenAuth = (token :string):string | null=>{
    try {
        const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload  
        if(decoded.userId){
            return decoded.userId as string 
        }
        return null
    } catch (error) {
        console.log("error in the authToken",error) ; 
        return null
    }
}