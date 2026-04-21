import { useEffect, useState } from "react";
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
    name: "Twent - Privacy-First AI for Android",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android",
    description:
      "The most private AI assistant for Android. BYOK (Bring Your Own Key), local AI models, encrypted storage, no data collection, offline mode. Your data never leaves your device.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "BYOK (Bring Your Own Key) for all AI providers",
      "Local AI models (MNN) that run completely offline",
      "Encrypted storage for API keys and data",
      "No telemetry, no analytics, no data collection",
      "All data stored locally on your device",
      "Full data backup and export capabilities",
      "Minimal permissions (only what's needed)",
      "Open source and auditable code",
      "GDPR and CCPA compliant by design",
      "No account required, no cloud dependency",
    ],
    screenshot: "https://twent.xyz/privacy-hero.png",
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
      className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
    >
      <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center mb-4">
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

export function PrivacyFirstAiAndroid({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [comparisonRef, comparisonInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

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
              <span className="w-8 h-px bg-green-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-green-500">
                Privacy First
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
                Privacy-First AI for Android:{" "}
                <span className="text-green-500">
                  Your Data Never Leaves Your Device
                </span>
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
                Stop trusting cloud AI with your personal data. Twent is the
                only AI assistant that lets you
                <strong> bring your own API keys</strong>,{" "}
                <strong>run local AI models offline</strong>, and keeps{" "}
                <strong>all your data on your device</strong>. No telemetry, no
                analytics, no data collection.
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
                { label: "Data Collection", value: "0", suffix: "" },
                { label: "API Providers", value: "10+", suffix: "" },
                { label: "Local Models", value: "MNN", suffix: "" },
                { label: "Cloud Required", value: "No", suffix: "" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="font-display text-3xl text-green-500 mb-1">
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
                href="https://github.com/user/operit/releases"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium transition-colors duration-200"
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
                href="/docs#permissions"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors duration-200"
              >
                View Privacy Docs
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
                src="/privacy-hero.png"
                alt="Twent Privacy-First AI - BYOK, local models, encrypted storage"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-mono">
                  All data stays on your device. API keys encrypted. Local AI
                  models. Zero telemetry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              The Problem: Cloud AI Can't Be Trusted With Your Data
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              Every AI assistant you've used sends your conversations, files,
              and personal data to the cloud. Your data is stored on servers you
              don't control, used for training you didn't approve, and
              vulnerable to breaches you can't prevent.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  problem: "Data Harvesting",
                  desc: "Your conversations are used to train AI models. Your personal data becomes their product.",
                },
                {
                  problem: "Cloud Dependency",
                  desc: "No internet = no AI. Your assistant stops working the moment you lose connectivity.",
                },
                {
                  problem: "Privacy Violations",
                  desc: "Telemetry, analytics, tracking. Your every interaction is monitored and monetized.",
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
                Privacy by Design, Not by Policy
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Twent doesn't just have a privacy policy. It's built from the
                ground up with privacy as a core principle. Your data never
                leaves your device unless you explicitly choose to send it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                }
                title="BYOK (Bring Your Own Key)"
                description="Use your own API keys from OpenAI, Claude, Gemini, or any provider. Your keys are encrypted and stored locally. Twent never sees or stores your API keys on our servers."
                visible={featuresInView}
                delay={0.1}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Local AI Models (MNN)"
                description="Download and run AI models completely offline. No internet required, no data sent anywhere. Choose from dozens of MNN models that run directly on your Android device."
                visible={featuresInView}
                delay={0.2}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                }
                title="Encrypted Storage"
                description="All your data, API keys, and conversations are encrypted on your device using Android's secure storage. Even if someone gets your phone, they can't read your data without your authentication."
                visible={featuresInView}
                delay={0.3}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-green-500"
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
                title="Zero Telemetry"
                description="No analytics, no telemetry, no usage tracking. We don't know how you use Twent, what you ask, or what you do. Your usage patterns are your business, not ours."
                visible={featuresInView}
                delay={0.4}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                }
                title="Full Data Ownership"
                description="Export your conversations, memories, and data anytime. Import them elsewhere. Your data is yours, in standard formats. No vendor lock-in, no data hostage."
                visible={featuresInView}
                delay={0.5}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>
                }
                title="No Account Required"
                description="Download and use Twent immediately. No sign-up, no email, no phone number. We don't want your personal information, and we don't need it to give you a great AI assistant."
                visible={featuresInView}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Data Flow Section */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                How Your Data Flows (or Doesn't)
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Transparency about where your data goes (and doesn't go).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-xl text-green-500 mb-4">
                  ✓ What Stays on Your Device
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>All conversations and chat history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Memory and knowledge graph data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>API keys (encrypted)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Files and documents you create</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Workflow configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>App settings and preferences</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-xl text-orange-500 mb-4">
                  ⚡ What Can Leave (With Your Permission)
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span>
                      API calls to your chosen providers (OpenAI, Claude, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span>Web searches (if you use web tools)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span>MCP server connections (if you configure them)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span>Composio integrations (if you connect apps)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span>Cloud TTS/STT services (if you choose them)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span>Manual data exports (when you choose to export)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-green-500">Key point:</strong> Even when
                data leaves your device, it goes directly to the service you
                chose (OpenAI, Claude, etc.). Twent never acts as a middleman.
                Your API calls go straight from your device to the provider. We
                never see your prompts, responses, or API keys.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section ref={comparisonRef} className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                How Twent Compares on Privacy
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Most AI assistants have privacy policies. Twent has privacy
                architecture.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-4 font-display text-zinc-900 dark:text-zinc-100">
                      Privacy Feature
                    </th>
                    <th className="text-center py-4 px-4 font-display text-green-500">
                      Twent
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      ChatGPT
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Claude App
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Gemini
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["BYOK (Your API Keys)", "✓", "✗", "✗", "✗"],
                    ["Local AI Models", "✓", "✗", "✗", "✗"],
                    ["Zero Telemetry", "✓", "✗", "✗", "✗"],
                    ["No Account Required", "✓", "✗", "✗", "✗"],
                    ["Encrypted Local Storage", "✓", "N/A", "N/A", "N/A"],
                    [
                      "Data Export/Import",
                      "✓",
                      "Limited",
                      "Limited",
                      "Limited",
                    ],
                    ["Offline Mode", "✓", "✗", "✗", "✗"],
                    ["Open Source", "✓", "✗", "✗", "✗"],
                    ["GDPR Compliant by Design", "✓", "✓", "✓", "✓"],
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

            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-green-500">
                  Twent is the only Android AI assistant
                </strong>{" "}
                that offers BYOK, local AI models, zero telemetry, and no
                account requirement. Every other AI assistant requires you to
                trust them with your data.
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
              Ready for AI That Respects Your Privacy?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join thousands of privacy-conscious users who've already switched
              to Twent. Free to start, no account required, no data collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/user/operit/releases"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium transition-colors duration-200"
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
                href="/docs#permissions"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 hover:border-zinc-600 text-white font-medium transition-colors duration-200"
              >
                Read the Docs
              </a>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Free forever. No subscriptions. No ads. No data collection.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
