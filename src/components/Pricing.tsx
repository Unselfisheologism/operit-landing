import { useInView } from "../hooks/useInView";
import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { LoginModal } from "./LoginModal";

const freeFeatures = [
  "50+ Built-in Tools",
  "UI Automation Agent",
  "Ubuntu 24 Terminal",
  "MCP Server Support",
  "Skills & Workflows",
  "Voice Activation",
  "Smart Memory",
  "BYOK (Your API Keys)",
  "Local Model Support",
  "File Generation",
  "Mini-Apps",
  "Character Cards",
];

const proFeatures = [
  "Everything in Free",
  "1,000+ Integrations (Notion, Slack, GitHub, etc.)",
  "Import/Export Chats, Workflows, Skills & Memory",
  "No Ads — Clean experience",
  "Direct Discord access to the dev team",
  "Priority Email Support",
  "Custom Themes/Icons/Wallpapers",
  "Custom Agent Voices/Names/Avatars",
  "Drops, Flows & Shadows",
  "Flex your Power User badge",
];

const faqs = [
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan includes all core features — 50+ tools, terminal, overlay agent, MCP servers, skills, workflows, voice activation, smart memory, and more. No credit card required.",
  },
  {
    q: "What do I get with Power User?",
    a: "Power User unlocks 1,000+ tool integrations via Composio (Notion, Slack, GitHub, etc.), import/export of chats, workflows, skills & memory, no ads, direct Discord access to the dev team, priority email support, custom everything, and Drops/Flows/Shadows.",
  },
  {
    q: "What are Drops, Flows, and Shadows?",
    a: "Drops are contextual screen shortcuts. Flows are cross-app automations. Shadows are recorded UI replays you can share. These are Power User-only social utility features.",
  },
  {
    q: "How do I pay?",
    a: "We use Dodo Payments — a secure payment processor. Choose monthly ($9.99/mo) or yearly ($79.99/yr, 33% savings). Click 'Upgrade', sign in, enter your payment details, and you're done. Cancel anytime.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no cancellation fees. Cancel from your account settings and your Power User access continues until the end of the billing period.",
  },
  {
    q: "Will there be more plans?",
    a: "Not right now. We're focused on making Power User excellent. Enterprise pricing may come later for teams and businesses.",
  },
];

export function Pricing() {
  const [ref, inView] = useInView();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const handleUpgrade = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setCheckoutLoading(true);
    window.location.href = `https://cadlhnfgxvyzfddmchxw.supabase.co/functions/v1/create-checkout?user_id=${user.id}&email=${encodeURIComponent(user.email || "")}&plan=${billing}`;
    setCheckoutLoading(false);
  };

  return (
    <section id="pricing" className="relative py-20 sm:py-28 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-orange-500" />
          <span className="text-xs font-secondary text-orange-500 uppercase tracking-[0.2em]">
            Pricing
          </span>
          <div className="w-8 h-px bg-orange-500" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4 text-center">
          Free forever.
          <br />
          <span className="text-blue-500">Power User when you're ready.</span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-8 text-center mx-auto">
          Start with everything you need. Upgrade for 1,000+ integrations, import/export, no ads, and priority support.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              billing === "monthly"
                ? "bg-orange-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
              billing === "yearly"
                ? "bg-orange-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            Yearly
            <span className="ml-1.5 text-[10px] font-bold text-green-400">SAVE 33%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          {/* Free Plan */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-zinc-100">
                Free
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-zinc-900 dark:text-zinc-100">
                  $0
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  /month
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Everything you need to get started.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
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
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="text-center py-3 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
              Current Plan
            </div>
          </div>

          {/* Power User Plan */}
          <div className="bg-zinc-900 dark:bg-zinc-800 border border-orange-500/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-bl-lg">
              Popular
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-display font-bold text-zinc-100">
                Power User
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-orange-500">
                  {billing === "monthly" ? "$9.99" : "$79.99"}
                </span>
                <span className="text-sm text-zinc-400">
                  /{billing === "monthly" ? "month" : "year"}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                {billing === "yearly"
                  ? "$6.67/mo — save 33% vs monthly"
                  : "or $79.99/year — save 33%"}
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-4 h-4 text-orange-500 mt-0.5 shrink-0"
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
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="w-full py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkoutLoading
                ? "Redirecting..."
                : user
                ? "Upgrade to Power User"
                : "Sign in to Upgrade"}
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-xs font-secondary text-blue-500 uppercase tracking-[0.2em]">
              FAQ
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-8">
            Common questions.
          </h3>

          <div className="space-y-0 divide-y divide-zinc-200 dark:divide-zinc-800">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-sm font-display text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`text-zinc-400 text-sm shrink-0 transition-transform ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={handleUpgrade}
      />
    </section>
  );
}
