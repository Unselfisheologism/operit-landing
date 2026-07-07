import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";

interface Profile {
  subscription_tier: string;
  subscription_expires_at: string | null;
  subscription_started_at: string | null;
  email: string;
  full_name: string | null;
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DashboardPage({ dark }: { dark: boolean }) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("subscription_tier, subscription_expires_at, subscription_started_at, email, full_name")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (data) setProfile(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="w-8 h-8 border-2 border-zinc-300 dark:border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const tier = profile?.subscription_tier ?? "free";
  const daysLeft = daysUntil(profile?.subscription_expires_at ?? null);
  const isPro = tier === "pro" || tier === "enterprise";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Top bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/twent-logo-48.webp"
              alt="Twent"
              className="w-8 h-8 object-contain"
              width="32"
              height="32"
            />
            <span className="font-display text-lg text-black dark:text-white">
              Twent
            </span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block">
              {profile?.email ?? user?.email}
            </span>
            <button
              onClick={signOut}
              className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl text-black dark:text-white mb-8">
          Dashboard
        </h1>

        {/* Subscription card */}
        <div
          className={`rounded-2xl border p-8 mb-8 ${
            isPro
              ? "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20"
              : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl text-black dark:text-white">
                Subscription
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Your current plan and billing status
              </p>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-xs font-secondary uppercase tracking-wider ${
                isPro
                  ? "bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100"
                  : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {tier}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Plan */}
            <div>
              <p className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                Plan
              </p>
              <p className="text-lg font-display text-black dark:text-white">
                {isPro ? "Twent Pro" : "Twent Free"}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {isPro ? "$15/month" : "$0/month"}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                {isPro ? "Renews in" : "Status"}
              </p>
              <p className="text-lg font-display text-black dark:text-white">
                {isPro
                  ? daysLeft !== null
                    ? `${daysLeft} days`
                    : "—"
                  : "No active subscription"}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {isPro
                  ? `Next billing: ${formatDate(profile?.subscription_expires_at)}`
                  : "Upgrade to unlock Pro features"}
              </p>
            </div>

            {/* Started */}
            <div>
              <p className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                Member since
              </p>
              <p className="text-lg font-display text-black dark:text-white">
                {formatDate(profile?.subscription_started_at)}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            {isPro ? (
              <button
                className="text-sm font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                onClick={() => {
                  /* TODO: open customer portal */
                }}
              >
                Manage Subscription →
              </button>
            ) : (
              <a
                href="/pricing"
                className="inline-flex items-center justify-center bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors px-5 py-2.5 text-sm font-secondary uppercase tracking-wider"
              >
                Upgrade to Pro →
              </a>
            )}
          </div>
        </div>

        {/* Account info */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8">
          <h2 className="font-display text-xl text-black dark:text-white mb-6">
            Account
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                Email
              </p>
              <p className="text-sm text-black dark:text-white">
                {profile?.email ?? user?.email ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                Name
              </p>
              <p className="text-sm text-black dark:text-white">
                {profile?.full_name ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
