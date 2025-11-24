import mongoose from "mongoose"; 

export const connectDb = async():Promise<string | null>=>{
    try {
        const connection = await mongoose.connect("")
        const  host = connection.connection.host 
        if(!host){
            return null 
        }  
        return host  
    } catch (error) {
        console.log("error in the connecting to the db",error) ; 
        return null 
    }
}