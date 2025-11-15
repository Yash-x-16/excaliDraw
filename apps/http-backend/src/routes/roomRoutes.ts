import express, { Router } from "express" ; 
import { authMiddleware } from "../middleware/authmiddleware";
import { createRoom } from "../controllers/roomController";

const router:Router = express.Router()  

try {
    router.get('/getRooms',authMiddleware) 
    router.post('/createRoom',authMiddleware,createRoom)
    router.delete('/deleteRoom',authMiddleware)
} catch (error) {
    console.log("error in the roomRoutes",error) ; 
}
export default router