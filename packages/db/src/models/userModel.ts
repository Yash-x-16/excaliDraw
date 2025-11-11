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
        ref:"room"
    }]
})

export const User = model("User",userSchema) ; 