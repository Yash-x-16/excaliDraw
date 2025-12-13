import { model, Schema } from "mongoose";

const roomSchema = new Schema({
    slug:{
        type:String , 
        required:true , 
        min : 4  , 
        unique:true 
    } , 
    adminId:{
        type:Schema.Types.ObjectId , 
        ref:"User"
    }, 
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"Chat"
    }] , 

})

export const Room = model("Room",roomSchema) ; 