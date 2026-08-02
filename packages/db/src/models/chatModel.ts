import { model, Schema } from "mongoose";

const chatSchema = new Schema({
    adminId:{
        type:Schema.Types.ObjectId , 
        required:true  
    } , 
    roomId :{
        type:Schema.Types.ObjectId , 
        required:true  
    } , 
    message:{
        type:String , 
        required:true 
    }
}) 

export const Chat = model("Chat", chatSchema) ; 