import express, { Router } from "express" 

const router:Router  = express.Router() 

try {
    router.post('/signup')
    router.post('/signin')
    router.get('/isUser')

} catch (error) {
    console.log("error in the authRoutes",error)
}

export default router 