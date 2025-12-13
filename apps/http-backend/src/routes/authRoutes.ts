import express, { Router } from "express" ; 
import { isUser, signin, signup } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

export const authRouter:Router = express.Router() 

try {
    authRouter.post("/signup",signup)  ; 
    authRouter.post("/signin",signin)  ;
    authRouter.get('/isUser',authMiddleware,isUser) ; 
} catch (error) {
    console.log("error in authRoutes",error) ; 
}