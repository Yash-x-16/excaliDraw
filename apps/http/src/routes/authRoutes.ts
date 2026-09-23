import express, { Router } from "express" 
import { signin, signup } from "../controller/authController";

const router:Router = express.Router() 

try {
    router.post("/signup",signup)
    router.post("/signin",signin)
} catch (error) {
    console.log("error in the authRoutes",error) ; 
}

export default router ; 