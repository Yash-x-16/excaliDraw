"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoIcon } from "./Icons";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#090a0f]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <LogoIcon className="w-7 h-7" />
              <span className="font-semibold text-base tracking-tight text-white group-hover:text-blue-400 transition">
                collabrative draw
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-zinc-400">
              <Link href="#ai" className="hover:text-white transition-colors">
                AI
              </Link>
              <Link href="#features" className="hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#teams" className="hover:text-white transition-colors">
                Teams
              </Link>
              <Link href="#use-cases" className="hover:text-white transition-colors">
                Use cases
              </Link>
              <Link href="#testimonials" className="hover:text-white transition-colors">
                Community
              </Link>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Discord & GitHub Social Links */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition"
              title="GitHub"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <Link
              href="/signin"
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-full transition tracking-wide"
            >
              Sign in
            </Link>

            <Link
              href="/canvas/creative-space"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition shadow-sm hover:shadow-blue-500/20 tracking-wide"
            >
              Start drawing
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Toggle navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-zinc-800 bg-[#0d0f15] px-4 py-3 space-y-2 text-xs">
          <Link
            href="/canvas/creative-space"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-white font-medium bg-blue-600 text-center"
          >
            Start drawing
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-blue-400 font-medium bg-blue-950/30"
          >
            Go to Workspace &rarr;
          </Link>
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800"
          >
            Features
          </Link>
          <Link
            href="#use-cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800"
          >
            Use cases
          </Link>
          <div className="pt-2 border-t border-zinc-800 flex gap-2">
            <Link
              href="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-1.5 text-center rounded-lg border border-zinc-700 text-zinc-300"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-1.5 text-center rounded-lg bg-blue-600 text-white font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
