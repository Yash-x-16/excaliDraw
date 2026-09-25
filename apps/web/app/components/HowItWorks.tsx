import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "./Icons";

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Launch a Room",
      description: "Pick any room name or open the workspace. No friction, instant initialization.",
    },
    {
      step: "2",
      title: "Share with Colleagues",
      description: "Copy your room URL and send it to your team. Everyone joins the same live canvas.",
    },
    {
      step: "3",
      title: "Draw Shapes Concurrently",
      description: "Create rectangles, move objects, and brainstorm. Every action syncs in real time.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 border-b border-zinc-800/60 bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-medium text-blue-400">Workflow</span>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1.5 tracking-tight">
            How collabrativeDraw works
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Three simple steps to start collaborating with two or more peers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-blue-400 mb-3 block">
                  Step 0{s.step}
                </span>
                <h3 className="text-sm font-semibold text-zinc-200 mb-1.5">{s.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Workspace Callout */}
        <div className="mt-10 p-6 rounded-lg border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Try the signed-in workspace preview directly
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Review current rooms, see active collaborators, and manage your whiteboards without signin.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition flex items-center gap-1.5 shrink-0"
          >
            <span>Open Workspace</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
