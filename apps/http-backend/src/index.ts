import express from "express" 
import { port } from "./exports/dotenv"
import { authRoutes } from "./Routes/authRoutes"
import { roomRoutes } from "./Routes/roomRoutes" 
import {connectDb} from "@repo/db/db"
const app = express() 

app.use(express.json())

app.use("/app/auth",authRoutes)
app.use("/app/room",roomRoutes)

app.listen(port,async()=>{ 
   const host =  await connectDb("") ;  
    console.log("port is running on ",+ port) 
    console.log("db is connected on  ", host) 
})