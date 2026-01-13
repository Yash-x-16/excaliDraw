export const SketchElements = ()=>{
    return <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left sketchy arrow */}
      <svg
        className="absolute top-20 left-10 w-32 h-32 text-white/10 animate-float"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: "0s" }}
      >
        <path
          d="M20 80 Q50 20 80 50"
          strokeDasharray="1000"
          className="animate-draw"
        />
        <path d="M75 40 L80 50 L70 52" />
      </svg>

      {/* Top right rectangle */}
      <svg
        className="absolute top-32 right-20 w-24 h-24 text-blue-600/15 animate-float"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: "0.5s" }}
      >
        <rect x="10" y="10" width="80" height="80" rx="4" />
      </svg>

      {/* Bottom left diamond */}
      <svg
        className="absolute bottom-40 left-20 w-20 h-20 text-blue-600/15 animate-float"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: "1s" }}
      >
        <path d="M50 10 L90 50 L50 90 L10 50 Z" />
      </svg>

      {/* Bottom right circle */}
      <svg
        className="absolute bottom-20 right-32 w-28 h-28 text-white/10 animate-float"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: "1.5s" }}
      >
        <ellipse cx="50" cy="50" rx="40" ry="38" />
      </svg>

      {/* Middle left arrow */}
      <svg
        className="absolute top-1/2 left-8 w-16 h-16 text-white/10 animate-float hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: "2s" }}
      >
        <path d="M20 50 L80 50" />
        <path d="M60 30 L80 50 L60 70" />
      </svg>

      {/* Top center scribble */}
      <svg
        className="absolute top-10 left-1/3 w-24 h-12 text-white/10 hidden md:block"
        viewBox="0 0 100 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M10 25 Q25 10 40 25 Q55 40 70 25 Q85 10 90 25" />
      </svg>
    </div>
}