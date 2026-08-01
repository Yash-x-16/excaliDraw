import express, { Router } from "express" 


const authRoutes:Router = express.Router() 

try {
    authRoutes.post("/signup")
    authRoutes.post("/signin")
} catch (error) {
    console.log("error in authroutes",error)
}