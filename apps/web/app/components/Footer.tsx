import React from "react";
import Link from "next/link";
import { LogoIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#07080c] py-16 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoIcon className="w-6 h-6" />
              <span className="font-semibold text-sm text-white">collabrative draw</span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Virtual collaborative whiteboard for creating simple hand-drawn style diagrams, illustrations &amp; flowcharts.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Open Source Whiteboard</span>
              </span>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-200 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/canvas/creative-space" className="hover:text-white transition">
                  Free Whiteboard
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#teams" className="hover:text-white transition">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition">
                  Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-200 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#use-cases" className="hover:text-white transition">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="#use-cases" className="hover:text-white transition">
                  Architecture Diagrams
                </Link>
              </li>
              <li>
                <Link href="#use-cases" className="hover:text-white transition">
                  Wireframes
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Shortcuts &amp; Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Account Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-200 uppercase tracking-wider">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/signin" className="hover:text-white transition">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition">
                  Create Account
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} collabrative draw. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
