import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username :{
        required : true  , 
        unique:true , 
        type:String , 
        min :6 
    } ,

    email :{
        required : true  , 
        unique:true , 
        type:String ,  
    } ,

    password :{
        required : true  , 
        unique:true , 
        type:String ,  
    } ,

    profilePicture :{
        type:String , 
        required:false 
    } ,

    Rooms :[{
        type:Schema.Types.ObjectId  
    }] ,

    chats:[{
        type:Schema.Types.ObjectId
    }] 
}) 

export const User = model("user",userSchema)