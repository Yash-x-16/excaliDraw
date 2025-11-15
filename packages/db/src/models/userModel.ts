import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String , 
        required:true , 
        min:6 , 
        unique:true
    } , 
    email:{
        type:String , 
        required:true , 
        unique:true
    } , 
    password:{
        type:String , 
        required:true , 
    } , 
    profilePicture:{
        type:String , 
        required:true , 
    } , 
    room:[{
        type:Schema.Types.ObjectId , 
        ref:"room"
    }] , 
    chat:[{
        type:Schema.Types.ObjectId , 
        ref:"chat"
    }] , 
    createdAt:{
        type:Date , 
        required:true
    }
}) 

export const User = model("user",userSchema) 