import express from "express" 
import {JWT_SECRET} from "@repo/backend-common/config"
import {client} from "@repo/db/client"
import authRoutes from './routes/authRoutes.js'

    async function yash (){
        try{
        await client.user.create({
            data:{
                username:"yash",
                password:"yash",
                email:"yash1"
            }
        })
        
        console.log('USER CREATED')
                
}catch(e){
    console.log("error in try block is ::",e)
}

        } 
        
        yash()
        

const app = express() 

app.use(express.json())
app.use('/api/auth',authRoutes)


console.log(JWT_SECRET)
app.listen(3002,()=>{
    console.log("port is running on 3002")
})