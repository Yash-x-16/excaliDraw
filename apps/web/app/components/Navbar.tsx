"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoIcon, UsersIcon } from "./Icons";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#090a0f]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoIcon className="w-6 h-6" />
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-blue-400 transition">
              collabrativeDraw
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-400">
            <Link
              href="/dashboard"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Workspace
            </Link>
            <Link href="#features" className="hover:text-zinc-200 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-zinc-200 transition-colors">
              How it works
            </Link>
            <Link href="/canvas/creative-space" className="hover:text-zinc-200 transition-colors flex items-center gap-1.5">
              <UsersIcon className="w-3.5 h-3.5 text-zinc-400" />
              Quick Canvas
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition"
            >
              Open App
            </Link>
            <Link
              href="/signin"
              className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-md transition shadow-xs"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
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
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-blue-400 font-medium bg-blue-950/30"
          >
            Go to Workspace &rarr;
          </Link>
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-zinc-300 hover:bg-zinc-800"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-zinc-300 hover:bg-zinc-800"
          >
            How it works
          </Link>
          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              href="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-3 py-2 rounded text-zinc-300 bg-zinc-900 border border-zinc-800"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-3 py-2 rounded text-white bg-blue-600 font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
