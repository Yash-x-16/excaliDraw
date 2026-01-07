import { model, Schema } from "mongoose";

const roomSchema = new Schema({
    slug:{
        type:String , 
        required:true , 
        unique:true , 
        min:4 , 
        max : 12
    } , 
   chats:[{
        type:Schema.Types.ObjectId , 
        ref:"chat"
   }]  , 
   adminId:{
        type:Schema.Types.ObjectId , 
        ref:"user"
   }
}) 
export const Room = model("room",roomSchema) ; 