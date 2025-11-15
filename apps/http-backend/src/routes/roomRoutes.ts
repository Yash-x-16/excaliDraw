import express, { Router } from "express" ; 

const router:Router = express.Router()  

try {
    router.get('/getRooms') 
    router.post('/createRoom')
    router.delete('/deleteRoom')
} catch (error) {
    console.log("error in the roomRoutes",error) ; 
}
export default router