import { model, Schema } from "mongoose";

const chatSchema = new Schema({
    text:{
        type:String , 
        required:true 
    } , 
    roomId:{
        type:Schema.Types.ObjectId , 
        ref:"Room"
    } , 
    userId:{
        type:Schema.Types.ObjectId , 
        ref:"User"
    } , 
}) 

export const Chat = model("Chat",chatSchema)