import express, { Router } from "express" 
import { isUser, signin, signup } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
const router:Router = express.Router() ; 
try {
    router.post('/signup',signup)
    router.post('/signin',signin)
    router.get('/isUser',authMiddleware,isUser)
} catch (error) {
    console.log("error in the authRoutes",error)
}

export default router ; 