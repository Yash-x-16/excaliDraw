import { model, Schema } from "mongoose";

const roomSchema = new Schema({
    title:{
        type:String , 
        required:true  , 
        unique:true 
    } , 
    adminId:{
        type:Schema.Types.ObjectId , 
        ref:"user"
    } , 
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"chat"
    }],
    createdAt:{
        type:Date , 
        required:true 
    }  
}) ; 

export const Room = model("room",roomSchema) ; 