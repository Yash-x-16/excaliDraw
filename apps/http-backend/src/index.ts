import express from "express" 
import {JWT_SECRET} from "@repo/backend-common/config"
import authRoutes from './routes/authRoutes.js'
import roomRoutes from "./routes/roomRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"

const app = express() 

app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/room',roomRoutes)
app.use('/api/chat',chatRoutes) 
console.log(JWT_SECRET)
app.listen(3002,()=>{
    console.log("port is running on 3002")
})