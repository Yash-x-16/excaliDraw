import express from "express" 
import {JWT_SECRET} from "@repo/backend-common/config"
import {client} from "@repo/db/client"


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

console.log(JWT_SECRET)
app.listen(3002,()=>{
    console.log("port is running on 3002")
})