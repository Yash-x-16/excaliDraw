import React from "react";
import Link from "next/link";
import { LogoIcon } from "./Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#090a0f] text-zinc-100 font-sans px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <LogoIcon className="w-6 h-6" />
            <span className="font-semibold text-base tracking-tight text-white group-hover:text-blue-400 transition">
              collabrativeDraw
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-4">{title}</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">{subtitle}</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#0e1117] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-xl">
          {children}
        </div>

        {/* Back Link */}
        <div className="mt-5 text-center">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition inline-flex items-center gap-1">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
