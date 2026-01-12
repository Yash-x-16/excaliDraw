interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          className="fill-primary/10"
        />
        <path
          d="M12 28L20 12L28 28H12Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
      <span className=" text-2xl font-medium font-virgil text-white">
        Excalidraw
      </span>
    </div>
  );
};

export default Logo;
