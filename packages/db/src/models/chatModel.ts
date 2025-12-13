import { model, Schema } from "mongoose";

const chatSchema = new Schema({
    text:{
        type:String , 
        required:true , 
    } , 
    adminId:{
        type:Schema.Types.ObjectId , 
        ref:"User"
    } , 
    roomId:{
        type:Schema.Types.ObjectId , 
        ref:"Room"
    }
})

export const Chat = model("Chat",chatSchema) ; 