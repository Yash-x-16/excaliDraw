import { model, Schema } from "mongoose";

const roomSchema = new Schema({
    adminId :{
        type:Schema.Types.ObjectId , 
        required:true
    } , 
    slug:{
        type:String , 
        required:true , 
        unique:true , 
        min : 4
    } , 
    chats:[{
        type:Schema.Types.ObjectId , 
    }]
}) 

export const Room = model("room" , roomSchema) ; 