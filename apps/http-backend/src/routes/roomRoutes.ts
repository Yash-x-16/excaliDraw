import express, { Router } from "express" 
import { authMiddleware } from "../middleware/authMidlleware";
import { createRoom, deleteRoom, getRoom } from "../controller/roomController";

export const roomRoutes:Router = express.Router() ;

try {
    roomRoutes.get("/getRooms",authMiddleware,getRoom)
    roomRoutes.post("/create",authMiddleware,createRoom)
    roomRoutes.delete("/delete/:roomId",authMiddleware,deleteRoom)
} catch (error) {
    console.log("error in the roomRoutes") ; 
}