"use client"
import { SketchElements } from "@/app/component/ui/sketchElements" 
import Logo from "@/app/component/ui/logo" 
import { useState } from "react" 
import { UsersIcon } from "@/app/component/ui/Icons" 
import { AuthCard } from "@/app/component/cards/authCards"
export default function Signup (){
  let [mode,setMode]=useState("signin") 
  let [showPassword,setShowPassword] = useState(false)
  function handleSubmit(){
    console.log("handle called")
  }
    return <div className="relative bg-black overflow-hidden min-h-screen flex items-center justify-center">
        <SketchElements/>
          <div className="w-full max-w-md z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center items-center  mb-8">
          <a href="/">
            <Logo />
          </a>
        </div>
        <AuthCard mode="signin" handlesubmit={()=>{}} setMode={()=>{}}/>
        </div>
    </div>
}