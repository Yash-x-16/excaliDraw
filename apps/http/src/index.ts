import express from "express" 
import { PORT } from "./utils/envExports";
import authRoutes from  "./routes/authRoutes"
const app = express() ; 

app.use(express.json())
app.use("/api/auth",authRoutes) ; 

app.listen(PORT,()=>{
  console.log("app is listening on port",PORT) ; 
})