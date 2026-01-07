import { Schema , model } from "mongoose";

const chatSchema = new Schema({
    message:{
        type:String , 
        required:true , 
    } , 
    roomId:{
        type:Schema.Types.ObjectId , 
        ref:"room"
    } , 
    userId:{
        type:Schema.Types.ObjectId , 
        ref:"user"
    }
})

export const Chat = model("chat",chatSchema) ;