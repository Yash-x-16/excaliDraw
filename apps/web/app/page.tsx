import { SketchElements } from "./component/ui/sketchElements";
import Logo from "./component/ui/logo"; 
import Button from "./component/ui/Button"; 
import { RightArrowIcon, SparkleIcon ,ZapIcon ,UsersIcon } from "./component/ui/Icons";
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
              <a href="#">
              <Button text="Start Drawing It's Free" iconAtTheEnd={<SparkleIcon size="size-4"/>} classname="btn-lg font-Nunito text-lg bg-[#6563c3] rounded-lg"/>
              </a>
              <a href="#">
              <Button text="View Demo"  classname="btn-lg font-Nunito bg-black tracking-wider hover:bg-white/10 transition-all duration-300  px-8 rounded-lg  btn-soft"/>
              </a>
          </div>
        </div>
        {/* cards section starts from here... */}
         <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-4xl w-full">
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-left shadow-soft hover:shadow-card transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <ZapIcon size="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Built for speed. Your strokes appear instantly, no lag.
            </p>
          </div>

          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-left shadow-soft hover:shadow-card transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <UsersIcon size="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Real-time Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Work together with your team in real-time. See changes instantly.
            </p>
          </div>

          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-left shadow-soft hover:shadow-card transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">End-to-End Encrypted</h3>
            <p className="text-sm text-muted-foreground">
              Your data stays yours. Privacy-first approach with full encryption.
            </p>
          </div>
        </div>
    </main>
   </div>
  );
}
