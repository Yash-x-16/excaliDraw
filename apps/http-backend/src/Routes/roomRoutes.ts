import express, { Router } from "express"; 

export const roomRoutes:Router = express.Router() 

try {
    roomRoutes.post("/createRoom")
    roomRoutes.delete("/deleteRoom")
    roomRoutes.get("/getRoom")
} catch (error) {
    console.log("error in the roomRoutes",error)
}