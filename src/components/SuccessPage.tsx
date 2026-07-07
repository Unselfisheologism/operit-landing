import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";

export function SuccessPage() {
  const { user } = useAuth();
  const [tier, setTier] = useState<string>("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTier = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", user.id)
        .single();

      if (data) {
        setTier(data.subscription_tier);
      }
      setLoading(false);
    };

    fetchTier();
  }, [user]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {loading ? "Checking your subscription..." : tier === "pro" ? "Welcome to Pro!" : "Payment Received"}
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          {loading
            ? "Please wait while we verify your payment."
            : tier === "pro"
            ? "You now have access to all Pro features. Open the Twent app to start using them."
            : "Your payment is being processed. It may take a few minutes to activate."}
        </p>

        {!loading && (
          <a
            href="/pricing"
            className="inline-block py-3 px-6 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
          >
            Back to Pricing
          </a>
        )}
      </div>
    </div>
  );
}
