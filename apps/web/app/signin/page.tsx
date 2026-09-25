"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from "../components/Icons";

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError("Please enter your email or username");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    }, 600);
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Access your rooms and whiteboards on collabrativeDraw."
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs">
          Sign in successful. Opening your workspace...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Email or username
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-500 pointer-events-none">
              <MailIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="name@company.com or username"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-500 transition outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-zinc-300">
              Password
            </label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Password reset link sent (demo mode).");
              }}
              className="text-xs text-blue-400 hover:text-blue-300 transition"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-500 pointer-events-none">
              <LockIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg py-2 pl-9 pr-9 text-xs text-white placeholder-zinc-500 transition outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOffIcon className="w-3.5 h-3.5" /> : <EyeIcon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-400">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-0"
            />
            <span>Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 font-medium text-xs text-white transition disabled:opacity-60 flex items-center justify-center gap-1.5"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition">
          Sign up
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-800/80 text-center">
        <Link
          href="/dashboard"
          className="text-xs text-zinc-400 hover:text-zinc-200 transition inline-flex items-center gap-1"
        >
          <span>Skip to signed-in workspace preview</span>
          <ArrowRightIcon className="w-3 h-3" />
        </Link>
      </div>
    </AuthLayout>
  );
}
