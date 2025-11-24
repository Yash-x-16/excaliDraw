import { model, Schema } from "mongoose";

const roomSchema = new Schema({
    Name:{
        type:String , 
        required:true 
    } , 
    userId:{
        type:Schema.Types.ObjectId , 
        ref:"User"
    } , 
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"Chat"
    }]
}) 

export const Room = model("Room",roomSchema) ; 