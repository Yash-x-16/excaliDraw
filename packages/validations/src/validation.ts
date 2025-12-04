import {z} from "zod"  

export const signupValidation = z.object({
    username:z.string().min(6).max(20) ,
    password:z.string() , 
    email:z.email() 
})

export const signinValidation = z.object({
    email:z.email() , 
    password:z.string() 
})

export const roomValidation = z.object({
    slug:z.string().min(4).max(15) 
})