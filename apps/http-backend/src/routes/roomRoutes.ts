import express, { Router } from "express" ; 
import { authMiddleware } from "../middleware/authMiddleware";

const router:Router = express.Router() ; 

try {
    router.post('/createRoom',authMiddleware)
} catch (error) {
    console.log("error in the roomRoutes",error)
}

export default router ; 