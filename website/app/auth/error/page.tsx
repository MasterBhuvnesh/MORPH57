import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { AnimatedLogo } from "@/components/animated-logo";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
      {params?.error
        ? `Error: ${params.error}`
        : "An unspecified error occurred."}
    </p>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
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
              <AlertCircle size={22} style={{ color: "#dc2626" }} />
            </div>
            <h1
              className="text-xl font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Something went wrong
            </h1>
            <div className="mt-1.5">
              <Suspense>
                <ErrorContent searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
          <Link
            href="/auth/login"
            className="auth-btn text-center"
            style={{ textDecoration: "none" }}
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
