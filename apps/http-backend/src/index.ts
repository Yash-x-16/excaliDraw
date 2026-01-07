import express from "express" ; 
import {connectDb} from "@repo/db/db"
import {HTTP_PORT} from "@repo/backend-common/secret"
const app = express() ; 

app.listen(HTTP_PORT,async()=>{
    
    console.log(`app is listening on port ${HTTP_PORT}`)
    const host = await connectDb() ; 
    console.log(`db is connected at ${host}`)
})