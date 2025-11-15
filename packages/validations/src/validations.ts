import {z} from "zod" 

export const signupSchema = z.object({
    username:z.string().min(6).max(20) , 
    password:z.string().min(6) , 
    email:z.email() , 
    profilePicture:z.string()
})

export const signinSchema = z.object({
    email:z.email() , 
    password:z.string().min(6) 
}) 

export const createRoomSchema = z.object({
    title:z.string().min(6)
})