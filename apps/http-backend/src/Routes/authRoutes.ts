import express, { Router } from "express" 
import { IsUser, Signin, Signup } from "../Controllers/authController";
import { authMiddleware } from "../Middleware/authMiddleware";

const router:Router = express.Router() 

try {
    router.post('/signup',Signup) ; 
    router.post('/signin',Signin) ; 
    router.get('/getUser',authMiddleware,IsUser) ; 
} catch (error) {
    console.log("no route handler added in authRoutes",error) ; 
}

export default router ; 