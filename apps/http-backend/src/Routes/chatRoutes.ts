import express, { Router } from "express" 
import { authMiddleware } from "../Middleware/authMiddleware";

const router:Router = express.Router() ; 

try {
    router.get('/getChats/:roomId',authMiddleware)
} catch (error) {
    console.log("error inthe chat routes")
}

export default router ; 