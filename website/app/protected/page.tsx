import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { Suspense } from "react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-slate-100 border border-slate-200 text-sm p-4 rounded-lg text-slate-800 flex gap-3 items-center shadow-sm">
          <InfoIcon size="18" strokeWidth={2} className="text-blue-500" />
          This is a protected page that you can only see as an authenticated user.
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full">
        <h2 className="font-bold text-2xl text-slate-900 tracking-tight">Your user details</h2>
        <pre className="text-xs font-mono p-4 bg-slate-50 rounded-lg border border-slate-200 w-full overflow-auto text-slate-700">
          <Suspense fallback={<div>Loading...</div>}>
            <UserDetails />
          </Suspense>
        </pre>
      </div>
    </div>
  );
}
