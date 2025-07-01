import express from "express" 

const app = express() 

app.use(express.json())


app.listen(3002,()=>{
    console.log("port is running on 3002")
})