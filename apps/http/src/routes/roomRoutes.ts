import express, { Router } from "express"; 
import { authMiddleware } from "../middleware/authMiddleware";
import { createRoom, deleteRoom, getRooms } from "../controller/roomController";

const router:Router = express.Router() ; 
try{
    router.get("/rooms",authMiddleware,getRooms)
    router.post("/create",authMiddleware,createRoom)
    router.delete("/delete",authMiddleware,deleteRoom)
}catch(error){
    console.log("error in the roomRoutes",error) ;
}