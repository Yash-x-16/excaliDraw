import jwt, { decode } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"

export function checkAuth(token:string):string| null{
    const decoded = jwt.verify(token,JWT_SECRET)
        if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
            return null 
        }else{
            return decoded.id ;
        }
    }