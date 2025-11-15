import express from "express" 
import {HTTP_PORT} from "@repo/backend-common/secret" 
import {connectDb} from "@repo/db/db" 
import authRoutes from "./routes/authRoutes" 
import chatRoutes from "./routes/chatRoutes"
import roomRoutes from "./routes/roomRoutes"
import cors from "cors"

const app  = express() 

app.use(express.json())

app.use(cors()) 

app.use('/api/auth',authRoutes) 
app.use('/api/room',roomRoutes)  
app.use('/api/chat',chatRoutes)

app.listen(HTTP_PORT,async()=>{
    console.log("port is listening on ",HTTP_PORT) ; 
    const host = await connectDb() 
    console.log(host as string) ; 
})