import Link from "next/link";
import { Mail } from "lucide-react";
import { AnimatedLogo } from "@/components/animated-logo";

export default function Page() {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="flex flex-col gap-8 text-center">
          <div>
            <AnimatedLogo />
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#fde8d8" }}
            >
              <Mail size={22} style={{ color: "var(--accent-orange)" }} />
            </div>
            <h1
              className="text-lg sm:text-xl font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Thank you for signing up!
            </h1>
            <p
              className="text-xs sm:text-sm mt-1.5 max-w-xs mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Please check your email to confirm your account before signing in.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="auth-btn text-center"
            style={{ textDecoration: "none" }}
          >
            Go to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
