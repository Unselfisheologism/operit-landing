import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PlayStoreCta as PlayStoreCtaComponent, PlayStoreCtaGroup } from "./PlayStoreCta";
import { useInView } from "../hooks/useInView";

import { RoughLine } from "./ui/rough";


// Play Store CTA — delegates to shared component
function PlayStoreCtaLocal({ size = "h-8" }: { size?: string }) {
  return <PlayStoreCtaComponent size={size} />;
}

// Section eyebrow (breadcrumb-style kicker)
function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <RoughLine color="orange" className="w-8" />
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
        {label}
      </span>
    </div>
  );
}

// Section heading
function SectionHeading({
  title,
  sub,
}: {
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <>
      <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
        {title}
      </h2>
      {sub && (
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-3xl">
          {sub}
        </p>
      )}
    </>
  );
}

// FAQ data
const faqs = [
  {
    q: "Is Twent really free?",
    a: "Yes — Twent is free to install and free to start. You can bring your own API key (BYOK) to use your preferred AI model, and many automations work with zero AI cost at all.",
  },
  {
    q: "Does it work without internet?",
    a: "Yes. Twent can run local on-device models, so core agent features keep working offline. Your data never has to leave your phone.",
  },
  {
    q: "Is my data private?",
    a: "Private by default. Twent runs on your device, supports BYOK with locally encrypted keys, and has zero telemetry. What you do on your phone stays on your phone.",
  },
  {
    q: "Does it need root?",
    a: "No root required. Twent uses Android's official accessibility and permissions APIs, so it works on any modern Android phone out of the box.",
  },
  {
    q: "Is it better than ChatGPT on Android?",
    a: "They answer different questions. ChatGPT is a great chatbot — Twent is an agent that acts: it opens apps, taps, types, and runs tasks for you. Most people end up using both.",
  },
];

// Comparison table rows: Twent vs chat-only AI apps vs AI browsers
const comparisonRows = [
  {
    feature: "Controls your apps",
    twent: "Yes — taps, types, opens any app",
    chat: "No — chats only",
    browsers: "Only web pages",
  },
  {
    feature: "Automates & schedules tasks",
    twent: "Yes — runs hands-free, on a timer",
    chat: "No",
    browsers: "Limited",
  },
  {
    feature: "Works offline / on-device",
    twent: "Yes — local models",
    chat: "No",
    browsers: "No",
  },
  {
    feature: "Your data stays on your phone",
    twent: "Private by default",
    chat: "Sent to the cloud",
    browsers: "Sent to the cloud",
  },
  {
    feature: "Free to start",
    twent: "Yes — free tier + BYOK",
    chat: "Yes, with limits",
    browsers: "Yes, with limits",
  },
];

export function BestAndroidAiPillar({ dark }: { dark: boolean }) {
  const [heroRef, heroInView] = useInView();
  const [whatRef, whatInView] = useInView();
  const [criteriaRef, criteriaInView] = useInView();
  const [compareRef, compareInView] = useInView();
  const [useCasesRef, useCasesInView] = useInView();
  const [privacyRef, privacyInView] = useInView();
  const [faqRef, faqInView] = useInView();
  const [ctaRef, _ctaInView] = useInView();

  const reveal = (visible: boolean) =>
    `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <Nav dark={dark} />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className={reveal(heroInView)}>
              <Eyebrow label="Buyer's Guide · 2026" />
            </div>

            <div className={`transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                The Best AI Agent for Android{" "}
                <span className="text-orange-500">(2026)</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-3xl">
                A chatbot chats. An agent acts.{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Twent is an AI agent
                </strong>{" "}
                — it taps, types, opens apps, and runs tasks on your phone. It
                does things for you instead of just talking about them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <PlayStoreCtaLocal size="h-11" />
                <span className="text-sm text-zinc-400">
                  Free to start · No credit card · Works on any modern Android
                  phone
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT IS AN AI AGENT ON ANDROID ───────────────────────────── */}
        <section
          ref={whatRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-6xl mx-auto">
            <div className={reveal(whatInView)}>
              <Eyebrow label="The Basics" />
              <SectionHeading
                title="What is an AI agent on Android?"
                sub="An AI agent is software that operates your phone for you. You give it a goal in plain words — it figures out the steps and does the work."
              />
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12 max-w-3xl">
              Most AI apps you know are chatbots: type a question, get an
              answer. An agent goes further. It opens your apps, fills forms,
              schedules tasks, and runs jobs end to end — like a helpful
              assistant with hands on your screen.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  emoji: "📱",
                  title: "Controls your apps",
                  desc: "Opens any app and uses it for you — tapping, typing, swiping, scrolling. No coding required.",
                },
                {
                  emoji: "⏱️",
                  title: "Runs tasks hands-free",
                  desc: "Tell it once, walk away. Twent completes the job in the background, on a schedule, or on demand.",
                },
                {
                  emoji: "🔒",
                  title: "Keeps data on your phone",
                  desc: "Runs locally on your device with private-by-default settings. Your information stays yours.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  data-sketch-card className="p-6 bg-white dark:bg-zinc-900 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-orange-500/10 flex items-center justify-center mb-4 text-2xl">
                    {card.emoji}
                  </div>
                  <p className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2 font-semibold">
                    {card.title}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES AN AI AGENT THE BEST ──────────────────────────── */}
        <section ref={criteriaRef} className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className={reveal(criteriaInView)}>
              <Eyebrow label="The Test" />
              <SectionHeading
                title="What makes an AI agent the best?"
                sub="We tested every serious AI app on Android against five criteria. Here is the bar."
              />
            </div>
            <div className="space-y-4">
              {[
                {
                  n: "1",
                  title: "Real app control, not just chat",
                  desc: "The best agent actually operates your apps — it doesn't stop at giving advice.",
                },
                {
                  n: "2",
                  title: "Privacy and offline options",
                  desc: "Your prompts and data should stay on your phone, with local models and BYOK support.",
                },
                {
                  n: "3",
                  title: "Automation & scheduling",
                  desc: "It should run tasks on its own — on a timer, on a trigger, hands-free.",
                },
                {
                  n: "4",
                  title: "Speed & reliability on-device",
                  desc: "On-device execution means fast responses that work even with a weak connection.",
                },
                {
                  n: "5",
                  title: "Cost that makes sense",
                  desc: "A real free tier or bring-your-own-key model — no surprise subscriptions.",
                },
              ].map((c) => (
                <div
                  key={c.n}
                  data-sketch-card className="flex gap-5 p-5 bg-zinc-50 dark:bg-zinc-900/50"
                >
                  <span className="font-display text-2xl text-orange-500 font-bold shrink-0">
                    {c.n}
                  </span>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      {c.title}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW TWENT MEASURES UP ────────────────────────────────────── */}
        <section
          ref={compareRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-6xl mx-auto">
            <div className={reveal(compareInView)}>
              <Eyebrow label="Head to Head" />
              <SectionHeading
                title="How Twent measures up"
                sub="Three kinds of AI apps compete for space on your phone. Only one actually works on your phone."
              />
            </div>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-900">
                    <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 text-sm font-semibold">
                      Capability
                    </th>
                    <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-orange-500">
                      Twent — AI agent
                    </th>
                    <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 text-sm font-semibold">
                      Chat-only AI apps
                      <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                        ChatGPT, Gemini
                      </span>
                    </th>
                    <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 text-sm font-semibold">
                      AI browsers
                      <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                        Perplexity Comet-style
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-zinc-200 dark:border-zinc-800 ${
                        i % 2 ? "bg-zinc-100/50 dark:bg-zinc-900/30" : ""
                      }`}
                    >
                      <td className="p-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {row.feature}
                      </td>
                      <td className="p-4 text-sm text-zinc-600 dark:text-zinc-300">
                        <span className="text-orange-500 font-semibold">✓ </span>
                        {row.twent}
                      </td>
                      <td className="p-4 text-sm text-zinc-600 dark:text-zinc-400">
                        {row.chat}
                      </td>
                      <td className="p-4 text-sm text-zinc-600 dark:text-zinc-400">
                        {row.browsers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 max-w-3xl">
              Twent is the only one that controls any app, runs a full
              terminal and automation engine, is private by default, and is
              free to start. Want the deep dive? Read our head-to-head
              breakdowns:
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <a
                href="/vs/chatgpt"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-orange-500/50 transition-colors"
              >
                Twent vs ChatGPT
              </a>
              <a
                href="/vs/gemini"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-orange-500/50 transition-colors"
              >
                Twent vs Gemini
              </a>
              <a
                href="/vs/claude"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-orange-500/50 transition-colors"
              >
                Twent vs Claude
              </a>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN DO WITH IT ──────────────────────────────────── */}
        <section ref={useCasesRef} className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className={reveal(useCasesInView)}>
              <Eyebrow label="Real Life" />
              <SectionHeading
                title="What you can do with it"
                sub="No scripts to write, no developer skills needed. Just describe the task in plain words."
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Auto-fill forms & sign-ups",
                  desc: "Twent reads the form, fills your details, and submits. Minutes of typing done in seconds.",
                },
                {
                  title: "Schedule tasks to run later",
                  desc: "\"Every morning at 8am, open my calendar and read today's meetings.\" Set once, done forever.",
                },
                {
                  title: "Turn screens into spreadsheets",
                  desc: "Point it at an app or website — it scrapes the data into a clean sheet you can export.",
                },
                {
                  title: "Run scripts and commands",
                  desc: "A full Linux terminal lives inside Twent. Great for downloads, file management, and automation.",
                },
                {
                  title: "Translate on the fly",
                  desc: "Translate chats, menus, or documents right on screen — without switching apps.",
                },
                {
                  title: "Tame notifications",
                  desc: "Let Twent read, summarize, and respond to notifications so you stay on top without the noise.",
                },
              ].map((useCase) => (
                <div
                  key={useCase.title}
                  data-sketch-card className="p-6 bg-zinc-50 dark:bg-zinc-900/50 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-500"
                >
                  <p className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2 font-semibold">
                    {useCase.title}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Power users can go much deeper —{" "}
              <a
                href="/android-automation-power-user"
                className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
              >
                see the full Android automation guide
              </a>{" "}
              for advanced workflows, triggers, and UI automation.
            </p>
          </div>
        </section>

        {/* ── PRIVACY ──────────────────────────────────────────────────── */}
        <section
          ref={privacyRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-4xl mx-auto">
            <div className={reveal(privacyInView)}>
              <Eyebrow label="Private by Default" />
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Your phone, your data
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Twent runs on your device with zero telemetry. Bring your own
                API key — stored encrypted on your phone — or use local
                on-device models, and your conversations never leave the
                device at all.
              </p>
              <a
                href="/privacy-first-ai-android"
                className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
              >
                Read how Twent protects your privacy →
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section ref={faqRef} className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className={reveal(faqInView)}>
              <Eyebrow label="FAQ" />
              <SectionHeading title="Frequently asked questions" />
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 font-semibold mb-2">
                    {f.q}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VERDICT CTA ──────────────────────────────────────────────── */}
        <section
          ref={ctaRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-4xl mx-auto text-center">
            <Eyebrow label="The Verdict" />
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
              The best AI agent for Android in 2026 is{" "}
              <span className="text-orange-500">Twent</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Every other AI app on Android will talk to you. Twent will work
              for you — controlling your apps, running your tasks, and keeping
              your data private. Install it free and see the difference in
              your first five minutes.
            </p>
            <div data-sketch-card className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-8 md:p-10">
              <h3 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                Try Twent free on the Play Store
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
                Free to install · No account needed · Bring your own API key
              </p>
              <div className="flex justify-center">
                <PlayStoreCtaLocal />
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER NOTE ──────────────────────────────────────────────── */}
        <section className="py-12 px-6 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Want the full picture? See our{" "}
              <a
                href="/blog/best-ai-apps-android"
                className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
              >
                complete ranking of the 25 best AI apps for Android
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
