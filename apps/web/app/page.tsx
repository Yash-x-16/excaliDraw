import { SketchElements } from "./component/ui/sketchElements";
import Logo from "./component/ui/logo";
export default function Home() {
  return (
   <div className="min-h-screen overflow-hidden relative bg-black">
    <SketchElements/> 
  
    {/* starting navbar ...*/}
    <nav className="relative z-10">
      <Logo className="text-purple-400"/> 
      
    </nav>
   </div>
  );
}
