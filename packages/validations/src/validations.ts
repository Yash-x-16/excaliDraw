import { z }from "zod" 


export const signupSchema = z.object({
    username :z.string().min(6).max(20) ,
    email : z.email() , 
    password:z.string().min(6) ,
    profilePicture : z.string().optional()
 })

export const signinSchema = z.object({
    email : z.string() ,
    password :z.string().min(6)
})