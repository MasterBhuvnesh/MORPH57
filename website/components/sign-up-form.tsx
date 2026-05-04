"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="text-center">
        <Link
          href="/"
          className="flex items-center justify-center mb-8"
        >
          <Mirage size="60" speed="7" color="#f26522" />
        </Link>
        <h1
          className="text-lg sm:text-xl font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Create your account
        </h1>
        <p className="text-xs sm:text-sm mt-1.5" style={{ color: "var(--text-secondary)" }}>
          Start building ATS-ready resumes in seconds
        </p>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs sm:text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="off"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-xs sm:text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="off"
              className="auth-input pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="repeat-password"
            className="text-xs sm:text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="repeat-password"
              type={showRepeatPassword ? "text" : "password"}
              required
              autoComplete="off"
              className="auth-input pr-10"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              aria-label={showRepeatPassword ? "Hide password" : "Show password"}
            >
              {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm px-1" style={{ color: "#dc2626" }}>
            {error}
          </p>
        )}

        <button type="submit" className="auth-btn" disabled={isLoading}>
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p
        className="text-center text-xs sm:text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium transition-colors hover:opacity-70"
          style={{ color: "var(--accent-orange)" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
