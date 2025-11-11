import mongoose from "mongoose";
import {DB_URL} from "@repo/backend-common/secret" 

export const connectDb =async()=>{
    const connection = await mongoose.connect(DB_URL) 
    return connection.connection.host
}