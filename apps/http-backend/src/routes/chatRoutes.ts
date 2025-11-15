import express, { Router } from "express" 

const router:Router = express.Router() 

try {
    router.get('/getChats/:roomId')
} catch (error) {
    console.log("error in the chatRoutes",error) ; 
}

export default router ; 