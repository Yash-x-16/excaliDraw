import express from "express" 
import { port } from "./exports/dotenv"

const app = express() 

app.use(express.json())


app.listen(port,()=>{
    console.log("port is running on ",+ port) 
})