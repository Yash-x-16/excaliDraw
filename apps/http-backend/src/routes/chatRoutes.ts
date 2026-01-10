import express, { Router } from "express" 
import { authMiddleware } from "../middleware/authMidlleware";

export const chatRouter:Router = express.Router() ; 

try {
    chatRouter.get("/getChats",authMiddleware) ; 
} catch (error) {
    console.log("error in the chatRouter",error)
}