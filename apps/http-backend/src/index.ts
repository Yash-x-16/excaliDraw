import express from "express" 
import { port } from "./exports/dotenv"
import { authRoutes } from "./Routes/authRoutes"
import { roomRoutes } from "./Routes/roomRoutes"
const app = express() 

app.use(express.json())

app.use("/app/auth",authRoutes)
app.use("/app/room",roomRoutes)

app.listen(port,()=>{
    console.log("port is running on ",+ port) 
})