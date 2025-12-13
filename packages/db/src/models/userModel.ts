import { model, Schema } from "mongoose";

const userSchema =  new Schema({
    username:{
        type:String , 
        required:true , 
        unique:true,
        min:4
    } , 
    email:{
        type:String , 
        required:true , 
        unique:true,
        min:6 
    } , 
    password:{
        type:String , 
        required:true , 
        min:6 
    } , 
    rooms:[{
        type:Schema.Types.ObjectId , 
        ref:"Room" 
    }] , 
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"Chat" 
    }]
})

export const User = model("user",userSchema) ; 