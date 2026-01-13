import { SketchElements } from "@/app/component/ui/sketchElements" 
import Logo from "@/app/component/ui/logo"
export default function Signup (){
    return <div className="relative bg-black overflow-hidden min-h-screen flex items-center justify-center">
        <SketchElements/>
          <div className="w-full max-w-md z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center items-center  mb-8">
          <a href="/">
            <Logo />
          </a>
        </div>
        </div>
    </div>
}