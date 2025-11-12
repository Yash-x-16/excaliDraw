import express, { Router } from "express" ; 
import { authMiddleware } from "../middleware/authMiddleware";
import { createRoom } from "../controllers/roomController";

const router:Router = express.Router() ; 

try {
    router.post('/createRoom',authMiddleware,createRoom)
} catch (error) {
    console.log("error in the roomRoutes",error)
}

export default router ; 