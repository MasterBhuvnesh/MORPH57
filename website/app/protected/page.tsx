import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon, User, Mail, Clock, Shield } from "lucide-react";
import { Suspense } from "react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const claims = data.claims;

  const details = [
    {
      icon: Mail,
      label: "Email",
      value: claims.email as string,
    },
    {
      icon: User,
      label: "User ID",
      value: (claims.sub as string)?.slice(0, 16) + "...",
    },
    {
      icon: Shield,
      label: "Role",
      value: (claims.role as string) || "authenticated",
    },
    {
      icon: Clock,
      label: "Session Expires",
      value: claims.exp
        ? new Date((claims.exp as number) * 1000).toLocaleString()
        : "N/A",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3 p-4 rounded-xl border"
            style={{
              backgroundColor: "var(--surface-white)",
              borderColor: "var(--border-light)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#fde8d8" }}
            >
              <item.icon size={18} style={{ color: "var(--accent-orange)" }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.label}
              </p>
              <p
                className="text-sm font-medium mt-0.5 truncate"
                style={{ color: "var(--text-primary)" }}
                title={item.label === "User ID" ? (claims.sub as string) : undefined}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <details className="mt-6 group">
        <summary
          className="text-sm font-medium cursor-pointer select-none"
          style={{ color: "var(--text-secondary)" }}
        >
          View raw claims
        </summary>
        <pre
          className="mt-3 text-xs font-mono p-4 rounded-xl border overflow-auto"
          style={{
            backgroundColor: "var(--surface-white)",
            borderColor: "var(--border-light)",
            color: "var(--text-secondary)",
          }}
        >
          {JSON.stringify(claims, null, 2)}
        </pre>
      </details>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-[72px] rounded-xl border animate-pulse"
          style={{
            backgroundColor: "var(--surface-white)",
            borderColor: "var(--border-light)",
          }}
        />
      ))}
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex items-center gap-3 text-sm p-4 rounded-xl border"
        style={{
          backgroundColor: "#fde8d8",
          borderColor: "#f5d4be",
          color: "var(--text-primary)",
        }}
      >
        <InfoIcon size={18} style={{ color: "var(--accent-orange)" }} />
        This is a protected page visible only to authenticated users.
      </div>

      <div>
        <h2
          className="text-2xl font-normal tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Your profile
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Account details and session information
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <UserDetails />
      </Suspense>
    </div>
  );
}
