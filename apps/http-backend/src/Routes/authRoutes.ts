import express, { Router } from "express" 
import { signin, signup } from "../controllers/authController"


export const authRoutes:Router = express.Router() 

try {
    
    authRoutes.post("/signup",signup)
    authRoutes.post("/signin",signin)

} catch (error) {
    console.log("error in authroutes",error)
}