import { SketchElements } from "./component/ui/sketchElements";
import Logo from "./component/ui/logo"; 
import Button from "./component/ui/Button";
export default function Home() {
  return (
   <div className="min-h-screen overflow-hidden relative bg-black">
    <SketchElements/> 
  
    {/* starting navbar ...*/}
    <nav className="relative z-10 px-6 py-4 flex items-center justify-between mx-auto ">
      <Logo className="text-purple-400"/> 
      <div className="flex items-center gap-3 ">
        <a href="#">
          <Button text="Sign In" iconAtTheStart={false}
            classname="btn text-white/60  btn-ghost hover:bg-white/20 transition-all duration-200 rounded-lg"/>
        </a>
        <a href="#">
          <Button text="GetStarted" classname="bg-[#6f6dd5]" iconAtTheStart={true} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>}/>
        </a>
      </div>
    </nav>
   </div>
  );
}
