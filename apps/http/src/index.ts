import express from "express" 
import { PORT } from "./utils/envExports";
import authRoutes from  "./routes/authRoutes"
import roomRoutes from "./routes/roomRoutes"
import cors from "cors" 
const app = express() ; 

app.use(express.json())

app.use(cors())

app.use("/api/auth",authRoutes) ; 
app.use("/api/room",roomRoutes) ; 

app.listen(PORT,()=>{
  console.log("app is listening on port",PORT) ; 
})