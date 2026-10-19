import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "./Icons";

export default function Features() {
  return (
    <section id="features" className="py-20 border-b border-zinc-800/60 bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Pillar 1: Create */}
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/40 border border-blue-800/40 text-blue-400 text-xs font-mono font-medium">
            open-source
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Create</h2>
            <p className="text-base sm:text-lg text-zinc-400 mt-2 max-w-3xl leading-relaxed">
              Simply designed to create perfect results fast. Elementary tools, advanced features and unlimited options with an infinite canvas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] hover:border-zinc-700 transition">
              <span className="text-xl mb-3 block">✏️</span>
              <h3 className="text-base font-semibold text-white mb-1">Easy to use</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero learning curve. Select a tool, click, and draw straight away.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] hover:border-zinc-700 transition">
              <span className="text-xl mb-3 block">📖</span>
              <h3 className="text-base font-semibold text-white mb-1">Libraries</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ready-to-use shapes, architecture components, and diagram symbols.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] hover:border-zinc-700 transition">
              <span className="text-xl mb-3 block">✨</span>
              <h3 className="text-base font-semibold text-white mb-1">Hand-drawn aesthetic</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Clean visual style that lets you focus on communicating ideas instead of pixel perfection.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 2: Collaborate */}
        <div id="teams" className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono font-medium">
            easy to use
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Collaborate</h2>
            <p className="text-base sm:text-lg text-zinc-400 mt-2 max-w-3xl leading-relaxed">
              Send link, get feedback and finish the idea together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] hover:border-zinc-700 transition">
              <span className="text-xl mb-3 block">🔗</span>
              <h3 className="text-base font-semibold text-white mb-1">Shareable link</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Collaborate in real-time. Invite peers directly via room link with zero delay.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] hover:border-zinc-700 transition">
              <span className="text-xl mb-3 block">🔐</span>
              <h3 className="text-base font-semibold text-white mb-1">Room access</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Share dedicated room sessions with live cursors and shape synchronization.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 3: Common Usecases */}
        <div id="use-cases" className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-400 text-xs font-mono font-medium">
            real-time collaboration
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Common usecases</h2>
            <p className="text-base sm:text-lg text-zinc-400 mt-2 max-w-3xl leading-relaxed">
              Meetings, Brainstorming, Diagrams, Interviews, Quick wireframing and more ...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] flex flex-col justify-between hover:border-zinc-700 transition">
              <div>
                <span className="text-xl mb-3 block">📊</span>
                <h3 className="text-base font-semibold text-white mb-1">UML diagram</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Visualize and communicate different aspects of a system effectively.
                </p>
              </div>
              <Link
                href="/canvas/creative-space"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition"
              >
                <span>Draw diagrams</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] flex flex-col justify-between hover:border-zinc-700 transition">
              <div>
                <span className="text-xl mb-3 block">📱</span>
                <h3 className="text-base font-semibold text-white mb-1">Wireframe</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  A skeletal outline of a digital interface, focusing on content placement and UX.
                </p>
              </div>
              <Link
                href="/canvas/creative-space"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition"
              >
                <span>Create mockups</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117] flex flex-col justify-between hover:border-zinc-700 transition">
              <div>
                <span className="text-xl mb-3 block">🎯</span>
                <h3 className="text-base font-semibold text-white mb-1">Presentation</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Use frames and clean visual flow to present your ideas with live audience engagement.
                </p>
              </div>
              <Link
                href="/canvas/creative-space"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition"
              >
                <span>Explore canvas</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pillar 4: The Easiest Way */}
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-400 text-xs font-mono font-medium">
            no sign-up needed
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              The easiest way to get your thoughts on screen
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 mt-2 max-w-3xl leading-relaxed">
              Quick drawings and mockups with a unique aesthetic. It&apos;s dead simple. We help you with intuitive shortcuts &amp; multiplayer synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                  AR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Adam Rackis</h4>
                  <span className="text-[11px] text-zinc-500">@AdamRackis</span>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                &ldquo;LOVE collabrative draw. Diagramming made simple. The aesthetic has me focusing on what I&apos;m trying to say and not on how it looks.&rdquo;
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#0e1117]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center font-bold text-xs">
                  BG
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Gausden</h4>
                  <span className="text-[11px] text-zinc-500">@bgausden</span>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                &ldquo;Loving collabrative draw. The hand-drawn aesthetic keeps brainstorming fluid and fun. Best tool for software architecture.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
