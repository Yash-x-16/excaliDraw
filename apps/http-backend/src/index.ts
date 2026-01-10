import express from "express" ; 
import {connectDb} from "@repo/db/db"
import {HTTP_PORT} from "@repo/backend-common/secret"
import cors from "cors"
import { authRoutes } from "./routes/authRoutes";
import { roomRoutes } from "./routes/roomRoutes";
import { chatRouter } from "./routes/chatRoutes";
const app = express() ; 

app.use(express.json())
app.use(cors()) ;

app.use("/api/auth",authRoutes) ;
app.use("/api/room",roomRoutes) ;
app.use("/api/chat",chatRouter) ;

app.listen(HTTP_PORT,async()=>{
    console.log(`app is listening on port ${HTTP_PORT}`)
    const host = await connectDb() ; 
    console.log(`db is connected at ${host}`)
}) ; 