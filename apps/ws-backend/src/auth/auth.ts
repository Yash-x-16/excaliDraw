import { JWT_SECRET } from "@repo/backend-common/secret";
import jwt, { JwtPayload } from "jsonwebtoken" ; 
export const checkAuth = (token:string):string | null=>{ 
    try {
        const decoded = jwt.verify(token ,JWT_SECRET) as JwtPayload ; 
        if(decoded.userId){
            return decoded.userId as string 
        }
    } catch (error) {
        return null 
    }
    return null
}