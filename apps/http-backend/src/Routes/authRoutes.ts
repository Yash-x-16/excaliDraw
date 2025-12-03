import express, { Router } from "express" 

const router:Router = express.Router() 

try {
    router.post('/signup') ; 
    router.post('/signin') ; 
    router.get('/getUser') ; 
} catch (error) {
    console.log("no route handler added in authRoutes",error) ; 
}

export default router ; 