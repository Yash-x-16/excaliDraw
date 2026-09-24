import jwt, { JwtPayload } from "jsonwebtoken" 
import dotenv from "dotenv" 
import { RawData } from "ws"
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


export const parseMessage = (message:RawData)=>{
    try {
        const data = message.toString() ;  
        const parsedMessage = JSON.parse(data)
        return parsedMessage 
    } catch (error) {
        console.log("error in parsing the message") ; 
        return 
    }
}