import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String , 
        required:true ,
        unique:true 
    } , 
    password:{
        type:String , 
        required:true , 
    } , 
    email:{
        type:String , 
        required:true , 
        unique:true  , 
    }, 
    rooms:[{
        type:Schema.Types.ObjectId , 
        ref:"Room" ,
        required:false ,
    }] , 
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"Chat"
    }] ,
}) 

export const User = model("User",userSchema) ; 