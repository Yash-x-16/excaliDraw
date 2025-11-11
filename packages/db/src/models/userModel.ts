import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String , 
        required:true ,
        unique:true
    }  , 
    password:{
        type:String , 
        required:true 
    } ,  
    profilePicture:{
        type:String , 
        required:true
    } , 
    email:{
        type:String ,
        required:true , 
    } ,
    createdAt:{
        type:Date , 
        required:true 
    },
    rooms:[{
        type:Schema.Types.ObjectId , 
        ref:"Room"
    }],
    chats:[{
        type:Schema.Types.ObjectId , 
        ref:"Chat" 
    }]
})

export const User = model("User",userSchema) ; 