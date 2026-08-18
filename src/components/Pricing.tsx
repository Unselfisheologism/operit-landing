import { useInView } from "../hooks/useInView";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ReceiptPrinter,
  type ReceiptPrinterStage,
} from "./ReceiptPrinter";

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

const allReceiptFeatures = [...freeFeatures, ...proFeatures];

const faqs = [
  {
    q: "Is Twent really free?",
    a: "Yes. Twent is 100% free with all core features included — 50+ tools, terminal, overlay agent, MCP servers, skills, workflows, voice activation, smart memory, and more. No credit card required.",
  },
  {
    q: "Will there be paid plans?",
    a: "Not right now. Twent is completely free. We may introduce optional upgrades in the future for advanced integrations and premium support, but the core experience remains free forever.",
  },
  {
    q: "What are Drops, Flows, and Shadows?",
    a: "Drops are contextual screen shortcuts. Flows are cross-app automations. Shadows are recorded UI replays you can share. These are Power User-only social utility features coming in future updates.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Twent is free, so there's nothing to cancel. If we introduce paid plans in the future, there will be no contracts or cancellation fees.",
  },
];

export function Pricing() {
  const [ref, inView] = useInView();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [stage, setStage] = useState<ReceiptPrinterStage>("processing");
  const { i18n } = useTranslation();

  const startReceipt = () => {
    setStage("processing");
    setTimeout(() => setStage("printing"), 600);
    setTimeout(() => setStage("complete"), 1800);
  };

  useEffect(() => {
    if (inView) {
      startReceipt();
    }
  }, [inView]);

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
          Completely free.
          <br />
          <span className="text-blue-500">All features included.</span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-8 text-center mx-auto">
          Twent is 100% free with no hidden costs. Every feature is included from day one — no credit card required.
        </p>

        {/* Receipt Printer */}
        <div className="flex justify-center mb-20">
          <ReceiptPrinter.Root stage={stage} className="w-full max-w-sm">
            <ReceiptPrinter.Machine>
              <ReceiptPrinter.Header>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-display font-bold text-zinc-900 dark:text-zinc-100">Twent</span>
                </div>
                <a
                  href="/"
                  className="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition-colors"
                >
                  Home
                </a>
              </ReceiptPrinter.Header>

              <ReceiptPrinter.Screen>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {i18n.language?.startsWith("zh") ? "完整版" : "Full Plan"}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {i18n.language?.startsWith("zh") ? "永久免费" : "Forever free"}
                    </p>
                  </div>
                  <strong className="text-green-600">$0.00</strong>
                </div>
                <ReceiptPrinter.Status>
                  {i18n.language?.startsWith("zh") ? "正在打印..." : "Printing your receipt..."}
                </ReceiptPrinter.Status>
              </ReceiptPrinter.Screen>
            </ReceiptPrinter.Machine>

            <ReceiptPrinter.Output>
              <ReceiptPrinter.Paper>
                <div className="space-y-3">
                  <div className="text-center border-b border-zinc-300 pb-3 mb-3">
                    <p className="text-base font-bold text-black">
                      TWENT
                    </p>
                    <p className="text-xs font-semibold text-zinc-500">
                      {i18n.language?.startsWith("zh") ? "AI 助手" : "AI Agent"}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {allReceiptFeatures.map((feature) => (
                      <div key={feature} className="flex justify-between text-xs font-semibold leading-tight">
                        <span className="text-zinc-700 pr-2">
                          {feature}
                        </span>
                        <span className="text-zinc-500 shrink-0">
                          $0.00
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-300 pt-2 mt-3">
                    <div className="flex justify-between text-base font-bold">
                      <span>TOTAL</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="text-center text-xs font-semibold text-zinc-500 pt-2">
                    {i18n.language?.startsWith("zh")
                      ? "感谢使用 Twent！"
                      : "Thanks for using Twent!"}
                  </div>
                </div>
              </ReceiptPrinter.Paper>
            </ReceiptPrinter.Output>
          </ReceiptPrinter.Root>
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
