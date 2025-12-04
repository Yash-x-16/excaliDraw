import express from "express" ; 
import {HTTP_PORT} from "@repo/backend-common/secret"
import {connectDb} from "@repo/db/db"
import authRoutes from "./Routes/authRoutes"
import roomRoutes from "./Routes/roomRoutes" 
import chatRoutes from "./Routes/chatRoutes"

const app = express() ; 

app.use(express.json())

app.use("/api/auth",authRoutes) ; 
app.use("/api/room",roomRoutes) ;
app.use("/api/chat",chatRoutes) ; 

app.listen(HTTP_PORT,async()=>{
    console.log('app is listening on port ',HTTP_PORT) ;   
    const host = await connectDb() ;
    console.log(host) ;   
}) 