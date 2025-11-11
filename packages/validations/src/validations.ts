import {z} from "zod" 

export const signupValidation = z.object({
    username:z.string().min(6).max(20) , 
    email:z.email() , 
    password:z.string() 
})

export const signinValidations = z.object({
    email:z.email() , 
    password:z.string()
})