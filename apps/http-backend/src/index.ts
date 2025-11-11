import express from "express"  
import {HTTP_PORT} from "@repo/backend-common/secret" 
import authRoutes from "./routes/authRoutes"
const app = express() 

app.use(express.json())
app.use('/api/auth',authRoutes)

app.listen(HTTP_PORT,()=>{
    console.log("port is running on ",HTTP_PORT)
})