import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ backgroundColor: "var(--bg-cream)" }}
    >
      <div className="flex-1 w-full flex flex-col items-center">
        <nav
          className="w-full flex justify-center border-b sticky top-0 z-50"
          style={{
            borderColor: "var(--border-light)",
            backgroundColor: "rgba(254, 246, 240, 0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="w-full max-w-5xl flex justify-between items-center px-6 py-3 md:px-8">
            <Link
              href="/"
              className="text-xl font-normal tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              MORPH57
            </Link>
            {hasEnvVars && (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 flex flex-col max-w-5xl px-6 md:px-8 py-10 w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
