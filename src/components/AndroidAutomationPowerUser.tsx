import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";

// Grain overlay for editorial print feel
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

// Schema markup for SoftwareApplication
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Twent - Android Automation Power User",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android",
    description:
      "The ultimate Android automation app for power users. UI automation, workflow builder, shell scripting, Tasker integration, floating chat, and 1000+ app integrations. Automate anything on your phone.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "UI automation (tap, swipe, scroll, type, screenshot)",
      "Visual workflow builder with triggers and conditions",
      "Full Ubuntu terminal with package management",
      "Tasker integration for advanced automation",
      "Floating chat overlay for automation while using other apps",
      "1000+ app integrations via Composio",
      "Scheduled workflows and triggers",
      "Memory and context persistence",
      "Voice automation with wake word detection",
      "MCP server integration for external tools",
    ],
    screenshot: "https://twent.xyz/automation-hero.png",
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

// Feature card component
function FeatureCard({
  icon,
  title,
  description,
  visible,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
    >
      <div className="w-12 h-12 bg-orange-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Automation tool showcase component
function AutomationToolShowcase({ visible }: { visible: boolean }) {
  const tools = [
    { name: "tap", desc: "Tap any UI element", params: "ref: @e5" },
    {
      name: "swipe",
      desc: "Swipe gestures",
      params: "startX, startY, endX, endY",
    },
    {
      name: "scroll",
      desc: "Scroll in any direction",
      params: "direction: up/down/left/right",
    },
    {
      name: "type",
      desc: "Type text into fields",
      params: "text: 'Hello', ref: @e3",
    },
    { name: "screenshot", desc: "Capture screen", params: "No parameters" },
    { name: "get_ui_tree", desc: "Get UI hierarchy", params: "No parameters" },
    { name: "press_key", desc: "System keys", params: "key: back/home/volume" },
    {
      name: "open_app",
      desc: "Launch apps",
      params: "packageName: com.example",
    },
  ];

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {tools.map((tool, i) => (
        <div
          key={tool.name}
          className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
          style={{ transitionDelay: visible ? `${0.1 + i * 0.05}s` : "0s" }}
        >
          <div className="font-mono text-sm text-orange-500 mb-1">
            {tool.name}
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
            {tool.desc}
          </div>
          <code className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
            {tool.params}
          </code>
        </div>
      ))}
    </div>
  );
}

export function AndroidAutomationPowerUser({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [toolsRef, toolsInView] = useInView();
  const [useCasesRef, useCasesInView] = useInView();
  const [comparisonRef, comparisonInView] = useInView();
  const [ctaRef, _ctaInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <SchemaMarkup />
      <GrainOverlay />
      <Nav dark={dark} onToggle={onToggle} />

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Breadcrumb */}
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-8 h-px bg-orange-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
                For Power Users
              </span>
            </div>

            {/* Main Headline */}
            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                Android Automation for Power Users:{" "}
                <span className="text-orange-500">Automate Everything</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`transition-all duration-700 delay-200 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mb-8">
                Stop juggling 10 different automation apps. Twent combines{" "}
                <strong>UI automation</strong>,{" "}
                <strong>workflow builder</strong>,
                <strong> shell scripting</strong>,{" "}
                <strong>Tasker integration</strong>, and{" "}
                <strong>1000+ app connections</strong>
                into one powerful automation platform for your Android phone.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-300 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {[
                { label: "UI Actions", value: "12+", suffix: "" },
                { label: "App Integrations", value: "1000+", suffix: "" },
                { label: "Workflow Types", value: "7", suffix: "" },
                { label: "Permission Levels", value: "4", suffix: "" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="font-display text-3xl text-orange-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors duration-200"
              >
                Download Free APK
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <a
                href="/docs#automation-overview"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors duration-200"
              >
                View Automation Docs
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`max-w-6xl mx-auto px-6 mt-16 transition-all duration-700 delay-500 ${
              heroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img
                src="/automation-hero.png"
                alt="Twent Android Automation - UI automation, workflow builder, shell scripting"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-mono">
                  Visual workflow builder with triggers, conditions, and actions
                  — automate anything on Android
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              The Problem: Too Many Apps, Not Enough Integration
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              You're a power user. You want to automate everything on your
              phone. But you're stuck juggling Tasker for triggers, MacroDroid
              for UI automation, Termux for scripts, and 5 other apps that don't
              talk to each other.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  problem: "Fragmented Automation",
                  desc: "Tasker does triggers, MacroDroid does UI, Termux does scripts. None of them work together seamlessly.",
                },
                {
                  problem: "No AI Integration",
                  desc: "Your automations are dumb. They can't make decisions, understand context, or learn from your behavior.",
                },
                {
                  problem: "Limited App Control",
                  desc: "Most automation apps can only control basic system functions. They can't actually use other apps for you.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <h3 className="font-display text-lg text-red-500 mb-2">
                    {item.problem}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Everything You Need to Automate Anything
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Twent isn't just another automation app. It's a complete
                automation platform that combines UI control, workflows,
                scripting, and AI into one cohesive system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                }
                title="Full UI Automation"
                description="Tap, swipe, scroll, type, read screens, and control any app. Twent uses Accessibility services AND visual screenshots to understand and interact with any Android app."
                visible={featuresInView}
                delay={0.1}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                }
                title="Visual Workflow Builder"
                description="Drag-and-drop workflow builder with triggers, conditions, loops, and actions. Create complex automations without writing code. Schedule tasks, set conditions, chain actions."
                visible={featuresInView}
                delay={0.2}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Full Ubuntu Terminal"
                description="Not a toy terminal. Real Ubuntu with apt, Python, Node.js, Git, SSH, and every tool you need. Write shell scripts, install packages, run daemons — your phone becomes a server."
                visible={featuresInView}
                delay={0.3}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
                title="1000+ App Integrations"
                description="Connect to GitHub, Slack, Notion, Gmail, Google Calendar, Jira, and hundreds more via Composio. Automate across your entire digital life, not just your phone."
                visible={featuresInView}
                delay={0.4}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                }
                title="Tasker Integration"
                description="Already have Tasker automations? Twent integrates as a Tasker plugin. Trigger Twent from Tasker, or trigger Tasker from Twent. Best of both worlds."
                visible={featuresInView}
                delay={0.5}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                }
                title="Floating Chat Automation"
                description="Automate while you use other apps. Twent runs in a floating overlay, can see your screen, and interact with any app. Get help, fill forms, debug errors — all while doing other things."
                visible={featuresInView}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* UI Automation Tools Section */}
        <section
          ref={toolsRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                UI Automation That Actually Works
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Most automation apps can only control basic system functions.
                Twent can actually use any app for you — fill forms, navigate
                menus, extract data, and perform complex multi-step tasks.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-6 text-center">
                Available UI Actions
              </h3>
              <AutomationToolShowcase visible={toolsInView} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-4">
                  Dual Pipeline Technology
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Twent uses both the Accessibility UI tree AND visual
                  screenshots to understand your screen. Every tool call
                  automatically captures screen context before executing.
                </p>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Accessibility UI tree for precise element targeting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Visual screenshots for context understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Automatic screen capture before every action</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-4">
                  Permission Levels
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      level: "Accessibility",
                      req: "Enable service",
                      cap: "Tap, type, scroll, read UI",
                      risk: "Medium",
                    },
                    {
                      level: "ADB",
                      req: "USB debugging",
                      cap: "System-level automation",
                      risk: "Medium",
                    },
                    {
                      level: "Root",
                      req: "Rooted device",
                      cap: "Full access",
                      risk: "High",
                    },
                    {
                      level: "Shizuku",
                      req: "Shizuku running",
                      cap: "Elevated without root",
                      risk: "Low",
                    },
                  ].map((perm, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50"
                    >
                      <div>
                        <div className="font-mono text-sm text-orange-500">
                          {perm.level}
                        </div>
                        <div className="text-xs text-zinc-500">{perm.req}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          {perm.cap}
                        </div>
                        <div
                          className={`text-xs ${
                            perm.risk === "Low"
                              ? "text-green-500"
                              : perm.risk === "Medium"
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {perm.risk} risk
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section ref={useCasesRef} className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Real Automation Use Cases
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                See how power users are automating their Android experience with
                Twent.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Morning Routine Automation",
                  desc: "Trigger: Daily at 7am. Actions: Open weather app, extract forecast, check calendar, compose summary, send to Slack. All automated while you're still in bed.",
                  icon: "☀️",
                },
                {
                  title: "Social Media Manager",
                  desc: "Trigger: New blog post detected. Actions: Open Twitter, compose tweet with link, add hashtags, schedule for optimal time, cross-post to LinkedIn.",
                  icon: "📱",
                },
                {
                  title: "Customer Support Bot",
                  desc: "Trigger: New email with 'support' in subject. Actions: Extract issue details, check knowledge base, compose response, send reply, update CRM.",
                  icon: "🎧",
                },
                {
                  title: "Data Entry Automation",
                  desc: "Trigger: New PDF in Downloads. Actions: Extract text with OCR, parse invoice data, enter into accounting app, save backup to cloud.",
                  icon: "📊",
                },
                {
                  title: "App Testing Automation",
                  desc: "Trigger: New app build. Actions: Install APK, run test scenarios, take screenshots at each step, generate test report, notify team.",
                  icon: "🧪",
                },
                {
                  title: "File Organization",
                  desc: "Trigger: New files in Downloads. Actions: Categorize by type, rename with date stamps, move to appropriate folders, clean up duplicates.",
                  icon: "📁",
                },
              ].map((useCase, i) => (
                <div
                  key={i}
                  className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ${
                    useCasesInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: useCasesInView
                      ? `${0.1 + i * 0.1}s`
                      : "0s",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{useCase.icon}</span>
                    <div>
                      <h3 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {useCase.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section
          ref={comparisonRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                How Twent Compares
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Not just another automation app. A complete automation platform.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-4 font-display text-zinc-900 dark:text-zinc-100">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-display text-orange-500">
                      Twent
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Tasker
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      MacroDroid
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Termux
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["UI Automation", "✓", "Limited", "✓", "✗"],
                    ["Visual Workflow Builder", "✓", "✗", "✓", "✗"],
                    ["Full Ubuntu Terminal", "✓", "✗", "✗", "✓"],
                    ["1000+ App Integrations", "✓", "✗", "✗", "✗"],
                    ["AI-Powered Decisions", "✓", "✗", "✗", "✗"],
                    ["Floating Chat Control", "✓", "✗", "✗", "✗"],
                    ["Tasker Integration", "✓", "N/A", "✗", "✗"],
                    ["Free Tier", "✓", "Paid", "Freemium", "✓"],
                    ["Memory & Context", "✓", "✗", "✗", "✗"],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-100 dark:border-zinc-800/50 transition-all duration-500 ${
                        comparisonInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: comparisonInView
                          ? `${0.1 + i * 0.05}s`
                          : "0s",
                      }}
                    >
                      <td className="py-4 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {row[0]}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[1] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[1] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[1]}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[2] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[2] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[2]}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[3] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[3] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[3]}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[4] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[4] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[4]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-orange-500">
                  Twent is the only Android app
                </strong>{" "}
                that combines UI automation, a visual workflow builder, full
                Ubuntu terminal, 1000+ app integrations, and AI-powered
                decisions in one place. Everything else is either missing key
                features or requires multiple apps that don't integrate.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-20 md:py-28 px-6 bg-zinc-900 dark:bg-zinc-950"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-6">
              Ready to Automate Everything?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join thousands of power users who've already replaced their
              automation stack with Twent. Free to start, no credit card
              required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors duration-200"
              >
                Download Free APK
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <a
                href="/docs#automation-overview"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 hover:border-zinc-600 text-white font-medium transition-colors duration-200"
              >
                Read the Docs
              </a>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Free forever. No subscriptions. No ads in the core experience.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
