import express, { Router } from "express" ; 
import { authMiddleware } from "../middleware/authMiddleware";
import { createRoom, deleteRoom, getRooms } from "../controllers/roomController";

export const roomRouter:Router = express.Router() 

try {
    roomRouter.post('/createRoom',authMiddleware,createRoom) ; 
    roomRouter.delete('/:roomId',authMiddleware,deleteRoom) ; 
    roomRouter.get('/getRooms',authMiddleware,getRooms) ; 
} catch (error) {
    console.log("error in the roomRouter",error) ; 
} 