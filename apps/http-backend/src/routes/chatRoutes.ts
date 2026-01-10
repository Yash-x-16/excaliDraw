import express, { Router } from "express" 
import { authMiddleware } from "../middleware/authMidlleware";
import { getChats } from "../controller/chatController";

export const chatRouter:Router = express.Router() ; 

try {
    chatRouter.get("/getChats",authMiddleware,getChats) ; 
} catch (error) {
    console.log("error in the chatRouter",error)
}