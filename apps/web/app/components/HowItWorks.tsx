import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "./Icons";

export default function HowItWorks() {
  const testimonials = [
    {
      name: "Theo - t3.gg",
      handle: "@t3dotgg",
      avatar: "T3",
      avatarBg: "bg-blue-600/30 text-blue-400",
      quote:
        "Of all my favorite tools, collabrative draw would be the hardest to leave behind. I have terrible handwriting and never got to enjoy sketching before. collabrative draw unlocked that for me.",
    },
    {
      name: "Gergely Orosz",
      handle: "@GergelyOrosz",
      avatar: "GO",
      avatarBg: "bg-emerald-600/30 text-emerald-400",
      quote:
        "collabrative draw is such an essential tool for software architecture diagrams, system design breakdowns, and real-time team brainstorms.",
    },
    {
      name: "Guillermo Rauch",
      handle: "@rauchg",
      avatar: "GR",
      avatarBg: "bg-purple-600/30 text-purple-400",
      quote:
        "The real-time collaboration with zero latency feels like magic. Ideating and moving shapes together with the team is natural and fast.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 border-b border-zinc-800/60 bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="mb-12 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Loved by individuals
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            See what other developers and creators say about <strong className="text-zinc-200 font-medium">collabrative draw</strong>.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-zinc-800 bg-[#0e1117] flex flex-col justify-between hover:border-zinc-700 transition"
            >
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/80">
                <div
                  className={`w-9 h-9 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-xs`}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">{t.name}</h4>
                  <span className="text-[11px] text-zinc-500">{t.handle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Excalidraw Style Bottom Callout Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#121624] via-[#0f131f] to-[#121624] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Online <span className="italic font-serif text-blue-400">whiteboard</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Something on your mind? Simply start drawing with your team!
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/canvas/creative-space"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-blue-600/30 flex items-center gap-2"
            >
              <span>Draw now</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
