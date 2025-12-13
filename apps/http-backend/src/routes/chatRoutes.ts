import express, { Router } from "express" 
import { authMiddleware } from "../middleware/authMiddleware";
import { getChats } from "../controllers/chatController";

export const chatRouter :Router = express.Router() ; 

try{
    chatRouter.get("/getchats/:roomId",authMiddleware,getChats) ; 
}catch(e){
    console.log("error in the chatRouter",e) ; 
}