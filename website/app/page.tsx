import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Dynamic background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/50 blur-[100px] mix-blend-multiply"></div>
      </div>

      <nav className="w-full flex justify-center border-b border-slate-200 bg-white/50 backdrop-blur-md sticky top-0 z-50">
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

      <div className="flex-1 flex flex-col justify-center items-center gap-8 max-w-5xl mx-auto p-5 w-full text-center z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 drop-shadow-sm">
          MORPH 57
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl font-light">
          Welcome to the next generation of applications. Build faster, scale beautifully.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/auth/login" className="px-8 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
            Get Started
          </Link>
          <Link href="#features" className="px-8 py-3 rounded-full bg-white text-slate-900 border border-slate-200 font-medium hover:bg-slate-50 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200">
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
