import  { model, Schema } from "mongoose";

const roomSchema = new Schema({ 
    slug :{
        type:String , 
        unique:true , 
        required:true 
    } , 
    createdAt:{
        type:Date , 
        required:true 
    },
    admin:{
        type:Schema.Types.ObjectId , 
        ref:"User"
    } , 
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"Chat"
    }]
})

export const Room = model("Room",roomSchema) ; 