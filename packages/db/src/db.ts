import mongoose from "mongoose"  


export const connectDb = async(url:string)=>{
    try{
        const connection = await mongoose.connect(url)  
        const host = connection.connection.host 
        return host 
    }catch(e){
        console.log("error in the connectDb function ",e)
    }
}