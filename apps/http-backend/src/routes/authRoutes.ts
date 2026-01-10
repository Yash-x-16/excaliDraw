import express, { Router } from "express" 
import { isUser, signin, signup } from "../controller/authController"
import { authMiddleware } from "../middleware/authMidlleware"

export const authRoutes:Router = express.Router()

try {
    authRoutes.post("/signup",signup)
    authRoutes.post("/signin",signin)
    authRoutes.get("/isUser",authMiddleware,isUser) 
} catch (error) {
    console.log("error in authRouter",error) 
}