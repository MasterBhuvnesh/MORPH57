import { EnvVarWarning } from "@/components/env-var-warning";
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
    <main className="min-h-screen flex flex-col items-center bg-slate-50">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="w-full max-w-7xl flex justify-between items-center p-4 px-6 md:px-8 text-sm">
            <div className="flex gap-5 items-center font-bold text-xl tracking-tighter text-slate-900">
              <Link href={"/"}>MORPH 57</Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 flex flex-col max-w-5xl p-5 w-full mt-10">
          {children}
        </div>
      </div>
    </main>
  );
}
