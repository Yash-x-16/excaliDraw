import jwt, { JwtPayload } from "jsonwebtoken" 
import dotenv from "dotenv" 
dotenv.config() 
const JWT_SECRET = process.env.JWT_SECRET
export const authMiddleware = (token :string)=>{
    try {
        const decoded = jwt.verify(token,JWT_SECRET as string) as JwtPayload  
        const userId = decoded.userId 
        if(!userId){
            return {
                message:"no userId found"
            }
        }else{
            return {
                userId 
            }
        }
        
    } catch (error) {
        console.log("error in ws authMiddleware",error) 
    }
}