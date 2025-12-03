import express, { Router } from "express" 
import { authMiddleware } from "../Middleware/authMiddleware"
import { createRoom, deleteRoom } from "../Controllers/roomController"

const router:Router = express.Router() 

try {
    router.post('/createRoom',authMiddleware,createRoom)
    router.delete('/deleteRoom',authMiddleware,deleteRoom)
} catch (error) {
    console.log("router handler not found",error) ; 
}
export default router ; 