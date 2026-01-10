import express, { Router } from "express" 
import { authMiddleware } from "../middleware/authMidlleware";

export const roomRoutes:Router = express.Router() ;

try {
    roomRoutes.get("/getRooms",authMiddleware)
    roomRoutes.post("/create",authMiddleware)
    roomRoutes.delete("/delete/:roomId",authMiddleware)
} catch (error) {
    console.log("error in the roomRoutes") ; 
}