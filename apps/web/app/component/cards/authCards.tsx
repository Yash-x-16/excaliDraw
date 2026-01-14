"use client"
import { UsersIcon } from "../ui/Icons"
import { useState } from "react"
interface authProp{
    mode?:"signin" |"signup" , 
    handlesubmit?:()=>void ,  
    setMode:()=>void
}

export function AuthCard(prop:authProp){ 
    let [showPassword,setShowPassword] = useState(false)
    return <div className="rounded-xl border-gray-900/10 bg-white/10  backdrop-blur-sm  ">
  {/* Card Header */}
  <div className="flex flex-col space-y-1.5 p-6 text-center pb-2">
    <h3 className="font-virgil text-2xl font-semibold leading-none tracking-tight">
      {prop.mode === "signin" ? "Welcome back!" : "Join Excalidraw"}
    </h3>
    <p className="text-sm text-white/50">
      {prop.mode === "signin"
        ? "Sign in to continue to your canvas"
        : "Create an account to start drawing"}
    </p>
  </div>

  {/* Card Content */}
  <div className="p-6 pt-0">
    <form onSubmit={prop.handlesubmit} className="space-y-4">
      {/* Name field (signup only) */}
      {prop.mode === "signup" && (
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">
            Full Name
          </label>
          <div className="relative">
            <UsersIcon size="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground/80">
          Email
        </label>
        <div className="relative">
          <UsersIcon size="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground/80">
          Password
        </label>
        <div className="relative">
          <UsersIcon size="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 pl-10 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <UsersIcon size="h-4 w-4" /> : <UsersIcon size="h-4 w-4" />}
          </button>
        </div>
        {prop.mode === "signin" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
 
        className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
      >
      
        {prop.mode === "signin" ? "Sign In" : "Create Account"}
      </button>
    </form>
  </div>

  {/* Card Footer */}
 
  <div className="relative my-4">
  {/* The Line */}
  <div className="absolute inset-0 flex items-center" aria-hidden="true">
    <div className="w-full border-t border-gray-700/80"></div>
  </div>
  
  {/* The Text */}
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-[#121214] px-4 text-muted-foreground tracking-widest">
      Or continue with
    </span>
  </div>
</div>
    {/* Social Login Buttons */}
    <div className="grid grid-cols-2 gap-3 mx-5 ">
      <button
        type="button"
        className="inline-flex items-center bg-white/5 justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium h-10 px-4 py-2 border border-input"
      >
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
        Google
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center bg-white/5 gap-2 whitespace-nowrap rounded-lg text-sm font-medium h-10 px-4 py-2 border border-input bg-background  hover:text-secondary-foreground"
      >
       <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
        GitHub
      </button>
    </div>
     <div className="p-6 pt-4 text-center text-sm">
    <span className="text-muted-foreground">
      {prop.mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
    </span>
    <button
      type="button"
      onClick={() => {}}
      className="ml-1 text-primary hover:underline font-medium"
    >
      {prop.mode === 'signup' ? 'Sign in' : 'Sign up'}
    </button>
  </div>
  </div>



   
}