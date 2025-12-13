import express from "express" 
import {HTTP_PORT} from "@repo/backend-common/secret"
import {connectDb} from "@repo/db/db"
import { authRouter } from "./routes/authRoutes";
import { roomRouter } from "./routes/roomRoutes";

const app = express() 

app.use(express.json()) ; 

app.use('/api/auth',authRouter) ; 
app.use('/api/room',roomRouter) ; 

app.listen(HTTP_PORT,async()=>{
    console.log("app is listening on port ",HTTP_PORT) 
    const host  = await connectDb() ;  
    console.log("db is connected :",host) ; 
});