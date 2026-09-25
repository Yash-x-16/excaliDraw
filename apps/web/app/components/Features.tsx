import React from "react";
import {
  UsersIcon,
  SquareIcon,
  ShareIcon,
  CheckIcon,
} from "./Icons";

export default function Features() {
  const features = [
    {
      title: "Concurrent Multi-User Drawing",
      description:
        "Two or more creators can collaborate on the same whiteboard. Watch colleagues place, resize, and modify shapes simultaneously.",
      icon: UsersIcon,
    },
    {
      title: "Clean Geometric Shapes",
      description:
        "Draw rectangles, circles, containers, and wireframe boxes with crisp vector borders and custom fills.",
      icon: SquareIcon,
    },
    {
      title: "Instant Room Sharing",
      description:
        "Create dedicated rooms with one click. Share the room link with anyone to jump into the same canvas immediately.",
      icon: ShareIcon,
    },
    {
      title: "Fast Canvas 2D Engine",
      description:
        "Native HTML5 2D canvas architecture ensures high frame rates and responsive stroke handling even on large boards.",
      icon: CheckIcon,
    },
  ];

  return (
    <section id="features" className="py-16 border-b border-zinc-800/60 bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-medium text-blue-400">Capabilities</span>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1.5 tracking-tight">
            Designed for real-time visual collaboration
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            A focused tool built for teams who need to sketch diagrams, map ideas, and shape architecture together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-md bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 mb-4">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
