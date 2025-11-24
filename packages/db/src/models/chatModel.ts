import { model, Schema } from "mongoose";

const chatSchema  = new Schema({
    adminId:{
        type:Schema.Types.ObjectId , 
        ref:"User"
    } , 
    text:{
        type:String , 
        required:true 
    } , 
    roomId:{
        type:Schema.Types.ObjectId , 
        ref:"Room"
    }
})

export const Chat = model("Chat",chatSchema)