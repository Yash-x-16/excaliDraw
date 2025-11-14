import express, { Router } from "express" 
import { authMiddleware } from "../middleware/authMiddleware"
import { getChats } from "../controllers/chatController"

const router:Router = express.Router() 

try {
    router.get('/getChats/:roomId',getChats)
} catch (error) {   
    console.log("error in the chatRoutes",error)
}
export default router