import { model, Schema } from "mongoose";

const chatSchema = new Schema({
    roomId:{
        type:Schema.Types.ObjectId , 
        ref:"room"
    } , 
    text:{
        type:String  , 
        required:true
    } , 
    userId:{
        type:Schema.Types.ObjectId , 
        ref:"user"
    }, 
    createdAt:{
        type:Date
    }
})

export const Chat  = model("chat",chatSchema) ; 