import mongoose from "mongoose";
import {DB_URL} from "@repo/backend-common/secret"
export  const connectDb  = async()=>{
    try {
        const connection = await mongoose.connect(DB_URL); 
        return connection.connection.host ; 
    } catch (error) {
        console.log("error in connecting in db",error) ;
        return  
    }
}