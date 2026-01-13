import { SketchElements } from "./component/ui/sketchElements";
import Logo from "./component/ui/logo"; 
import Button from "./component/ui/Button"; 
import { RightArrowIcon } from "./component/ui/Icons";
export default function Home() {
  return (
   <div className="min-h-screen overflow-hidden relative bg-black">
    <SketchElements/> 
  
  {/* nav bar starts from here*/}
    <nav className="relative z-10 px-8 py-4 flex items-center justify-between mx-auto ">
      <Logo className="text-purple-400"/> 
      <div className="flex items-center gap-3 ">
        <a href="#">
          <Button text="Sign In" 
            classname="btn text-white/60  btn-ghost hover:bg-white/20 transition-all duration-500 rounded-lg"/>
        </a>
        <a href="#">
          <Button text="Get Started" classname="bg-[#6f6dd5] hover:bg-[#6563c3] transition-all duration-300 rounded-xl " iconAtTheEnd={<RightArrowIcon size="size-4 font-light"/>} 
          />
          </a>
      </div>
    </nav>
    {/* hero section starts from here */} 
    <main className="z-10 flex flex-col items-center text-center justify-center px-6 pt-20 pb-32">
       <div className=" max-w-3xl">
          <h1 className="font-virgil text-5xl md:text-7xl text-white mb-6 ">
            Sketch your ideas{" "}
            <span className="bg-linear-to-r from-[#8466d5] to-[#a15fd6] bg-clip-text text-transparent">together</span>
          </h1>
          <p className="text-xl text-white/45 mb-10 max-w-xl mx-auto">
            An open source virtual hand-drawn style whiteboard. 
            Collaborative and end-to-end encrypted.
          </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/auth?mode=signup">
              
              </a>
          </div>
        </div>
    </main>
   </div>
  );
}
