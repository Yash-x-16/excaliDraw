import express, { Router } from "express" 
import { authMiddleware } from "../Middleware/authMiddleware";
import { getChats } from "../Controllers/chatController";

const router:Router = express.Router() ; 

try {
    router.get('/getChats/:roomId',authMiddleware,getChats)
} catch (error) {
    console.log("error inthe chat routes")
}

export default router ; 