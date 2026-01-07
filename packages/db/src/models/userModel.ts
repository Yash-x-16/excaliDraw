import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String , 
        required:true , 
        min:6 ,
        unique:true 
    } , 
    password:{
        type:String , 
        min:6 , 
        required:true 
    } , 
    email:{
        type:String , 
        unique:true , 
        required:true 
    } , 
    rooms:[{
        type:Schema.Types.ObjectId , 
        ref:"room"
    }] , 
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"chat"
    }]
})

export const User = model("user",userSchema) ; 