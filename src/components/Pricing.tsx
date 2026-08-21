import { useInView } from "../hooks/useInView";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ReceiptPrinter,
  type ReceiptPrinterStage,
} from "./ReceiptPrinter";
import { DButton } from "./ui/drawably";
import { RoughAnnotation } from "./ui/rough";

const freeFeatures = [
  "Write code & generate websites",
  "Create slide decks, videos & images",
  "Build spreadsheets & mini tools",
  "UI automation on your phone",
  "Built-in Linux-style terminal",
  "Memory that remembers context",
  "Voice & scheduled triggers",
  "BYOK — bring your own AI key",
  "Run local AI models on device",
];

const faqs = [
  {
    q: "Is Twent really free?",
    a: "Yes. Twent is completely free. You get code generation, content creation, phone automation, a terminal, memory, local AI support, and more — no credit card required.",
  },
  {
    q: "Do I need to connect lots of apps or services?",
    a: "No. Twent works directly on your phone. It uses built-in phone automation instead of asking you to connect and authorize external tools one by one.",
  },
  {
    q: "Does Twent replace my laptop?",
    a: "For many everyday tasks, yes. Twent can write code, make documents, edit media, run terminal commands, and automate apps — right from your Android device.",
  },
  {
    q: "Is my data private?",
    a: "Twent uses your own AI API key when you want, and can run local models on-device. Nothing has to leave your phone unless you choose.",
  },
  {
    q: "What can Twent actually make?",
    a: "Twent can write code, generate websites, create slide decks, make videos and images, build spreadsheets, and automate tasks on your phone.",
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
            What you get
          </span>
          <div className="w-8 h-px bg-orange-500" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4 text-center">
                  Completely free.
                  <br />
                  <RoughAnnotation
                    text={<span className="text-blue-500">All features included.</span>}
                    type="underline"
                    color="blue"
                    strokeWidth={2.5}
                    padding={4}
                    show={inView}
                    delay={200}
                  />
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
                      {i18n.language?.startsWith("zh") ? "完整版" : "Full plan"}
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
                      {i18n.language?.startsWith("zh") ? "AI 助手" : "AI Assistant"}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {freeFeatures.map((feature) => (
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

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i}>
                <DButton
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  variant="outline"
                  color="grey"
                  className="d-btn-row group"
                  aria-expanded={openFaq === i}
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
                </DButton>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-40 pt-3 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed px-2">
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
