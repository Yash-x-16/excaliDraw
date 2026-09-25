"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  CheckIcon,
} from "../components/Icons";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service");
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
      title="Create your account"
      subtitle="Start drawing collaboratively with your team on collabrativeDraw."
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs">
          Account created! Opening your workspace...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Username
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-500 pointer-events-none">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              required
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. alex"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-500 transition outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Email address
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-500 pointer-events-none">
              <MailIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-500 transition outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Password (min. 8 characters)
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-500 pointer-events-none">
              <LockIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
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

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-500 pointer-events-none">
              <LockIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-500 transition outline-none"
            />
          </div>
        </div>

        {password && confirmPassword && (
          <div className="text-[11px] flex items-center gap-1">
            {password === confirmPassword ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckIcon className="w-3 h-3" /> Passwords match
              </span>
            ) : (
              <span className="text-rose-400">Passwords do not match yet</span>
            )}
          </div>
        )}

        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-zinc-400">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-0"
            />
            <span>
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 font-medium text-xs text-white transition disabled:opacity-60 flex items-center justify-center gap-1.5"
        >
          {isLoading ? (
            <span>Creating account...</span>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-zinc-400">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-400 hover:text-blue-300 font-medium transition">
          Sign in
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
