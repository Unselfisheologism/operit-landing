import { useInView } from "../hooks/useInView";
import { useState } from "react";

const features = [
  { name: "50+ Built-in Tools", price: "$0.00" },
  { name: "UI Automation Agent", price: "$0.00" },
  { name: "Ubuntu 24 Terminal", price: "$0.00" },
  { name: "MCP Server Support", price: "$0.00" },
  { name: "Skills & Workflows", price: "$0.00" },
  { name: "Voice Activation", price: "$0.00" },
  { name: "Smart Memory", price: "$0.00" },
  { name: "BYOK (Your API Keys)", price: "$0.00" },
  { name: "Local Model Support", price: "$0.00" },
  { name: "File Generation", price: "$0.00" },
  { name: "Mini-Apps", price: "$0.00" },
  { name: "Character Cards", price: "$0.00" },
];

const faqs = [
  {
    q: "Is Twent really free?",
    a: "Yes. Right now, everything is completely free. All 50+ tools, the Ubuntu terminal, overlay agent, MCP servers, skills, workflows — the whole thing. We're in pre-revenue and focused on building the best agent OS, not paywalling features.",
  },
  {
    q: "How do you distribute the app if it's not on the Play Store?",
    a: "We distribute the APK directly from our website. Download, install, and you're good to go. No middleman, no store fees, no waiting for approval.",
  },
  {
    q: "Will there be ads?",
    a: "Eventually, yes — powered by AI ads (koahlabs.com). They'll be non-intrusive and contextually relevant. A future Pro plan ($20) will remove them entirely, along with cosmetic badges, early access to features, and zero marketplace commissions.",
  },
  {
    q: "What's the marketplace?",
    a: "The marketplace is an upcoming agentic app store — users can sell skills, workflows, plugins, and MCP servers. It doesn't exist yet. Once we move to the Play Store and start generating revenue, marketplace commissions will fund the free tier. Pro users ($20) get zero commissions.",
  },
  {
    q: "What's the difference between free now and Pro later?",
    a: "Right now: everything is free, Website APK distribution, AI ads, no marketplace, no cosmetic badges. Later (post-revenue): Play Store distribution, everything still free, AI ads, marketplace with commissions, and Pro ($20) for ad removal, cosmetic badges, early access features, and zero marketplace commissions.",
  },
  {
    q: "Why not just put it on the Play Store now?",
    a: "Play Store means reviews, fees, and slower iteration. We're moving fast — shipping features weekly, breaking things, fixing them. Website APK distribution lets us do that. Once we're stable and generating revenue, Play Store is the move.",
  },
];

function DashedLine() {
  return (
    <div className="border-t border-dashed border-zinc-300 dark:border-zinc-700 my-2" />
  );
}

export function Pricing() {
  const [ref, inView] = useInView();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          Your receipt, sir.
          <br />
          <span className="text-blue-500">Total damage: $0.00.</span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-16 text-center mx-auto">
          Every feature. Every tool. Every capability. All included, all free.
          We're not gatekeeping anything while we build the future of mobile AI.
        </p>

        {/* Receipt */}
        <div className="max-w-md mx-auto mb-20">
          {/* Printer top */}
          <div className="bg-zinc-300 dark:bg-zinc-700 rounded-t-lg h-6 mx-8 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
          </div>

          {/* Receipt paper */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-6 font-mono shadow-lg">
            {/* Header */}
            <div className="text-center mb-2">
              <div className="text-sm font-bold tracking-[0.3em] text-zinc-900 dark:text-zinc-100 uppercase">
                Twent
              </div>
              <div className="text-[10px] text-zinc-500 tracking-wider uppercase">
                Agentic Operating System
              </div>
            </div>

            <DashedLine />

            {/* Date */}
            <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
              <span>
                Date:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span>
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>

            <DashedLine />

            {/* Features */}
            <div className="space-y-1.5">
              {features.map((f) => (
                <div key={f.name} className="flex justify-between text-xs">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {f.name}
                  </span>
                  <span className="text-zinc-500 tabular-nums">{f.price}</span>
                </div>
              ))}
            </div>

            <DashedLine />

            {/* Total */}
            <div className="flex justify-between text-sm font-bold">
              <span className="text-zinc-900 dark:text-zinc-100 tracking-wider">
                TOTAL
              </span>
              <span className="text-orange-500 tabular-nums">$0.00</span>
            </div>

            <DashedLine />

            {/* Footer */}
            <div className="text-center mt-3">
              <div className="text-[10px] text-zinc-500 tracking-wider">
                THANK YOU FOR CHOOSING TWENT
              </div>
              <div className="text-[9px] text-zinc-400 mt-1">
                Website APK Distribution • Pre-Revenue
              </div>
              <div className="mt-4 flex justify-center">
                <div className="w-16 h-16 border border-zinc-300 dark:border-zinc-700 grid grid-cols-5 grid-rows-5 gap-px p-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        [
                          0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 21, 22,
                          24,
                        ].includes(i)
                          ? "bg-zinc-900 dark:bg-zinc-100"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tear effect */}
          <div className="h-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,var(--color-zinc-200)_3px,var(--color-zinc-200)_4px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,var(--color-zinc-800)_3px,var(--color-zinc-800)_4px)]" />
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
    </section>
  );
}
