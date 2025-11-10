import express from "express"  
import {JWT_SECRET} from "@repo/backend-common/secret"
const app = express() 
console.log("jwt secret is : ",JWT_SECRET)

app.listen()