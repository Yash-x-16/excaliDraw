import express, { Router } from "express"; 
import { createRoom, deleteRoom, getRoom } from "../controllers/roomController";
import { authMiddleware } from "../Middlewares/authMiddleware";

export const roomRoutes:Router = express.Router() 

try {
    roomRoutes.post("/createRoom" , authMiddleware,createRoom)
    roomRoutes.delete("/deleteRoom",authMiddleware, deleteRoom)
    roomRoutes.get("/getRoom",authMiddleware,getRoom)
} catch (error) {
    console.log("error in the roomRoutes ",error)
}