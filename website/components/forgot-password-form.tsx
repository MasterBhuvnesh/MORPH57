"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn("flex flex-col gap-8", className)} {...props}>
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center mb-8"
          >
            <Mirage size="60" speed="7" color="#f26522" />
          </Link>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#fde8d8" }}
          >
            <Mail size={22} style={{ color: "var(--accent-orange)" }} />
          </div>
          <h1
            className="text-xl font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Check your email
          </h1>
          <p
            className="text-sm mt-1.5 max-w-xs mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            If you registered with this email, you&apos;ll receive a password reset link shortly.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="auth-btn text-center no-underline"
          style={{ textDecoration: "none" }}
        >
          Back to sign in
        </Link>
      </div>
    );
  }

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
          className="text-xl font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Reset your password
        </h1>
        <p className="text-sm mt-1.5" style={{ color: "var(--text-secondary)" }}>
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
              Send reset link
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p
        className="text-center text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        Remember your password?{" "}
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
