import express from "express" 
import {JWT_SECRET} from "@repo/backend-common/config"
import authRoutes from './routes/authRoutes.js'


const app = express() 

app.use(express.json())
app.use('/api/auth',authRoutes)


console.log(JWT_SECRET)
app.listen(3002,()=>{
    console.log("port is running on 3002")
})