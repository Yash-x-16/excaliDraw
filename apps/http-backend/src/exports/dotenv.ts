import dotenv from "dotenv" 

dotenv.config() 

export const port = process.env.PORT as string 
export const salt = process.env.SALT_ROUNDS as string 
export const JWT_SECRET = process.env.JWT_SECRET as string