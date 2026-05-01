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
      "The most private AI assistant for Android. BYOK with AES-256 encryption via Android Keystore, local MNN AI models running completely offline, encrypted storage, GDPR Article 17 compliant. Your data never leaves your device unless you explicitly choose to send it.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "BYOK (Bring Your Own Key) with AES-256 encryption via Android Keystore",
      "Local AI models (MNN) - Phi-3.5-mini, Qwen2.5-3B, Stable Diffusion - running completely offline",
      "Encrypted storage for API keys using Android Keystore-backed EncryptedSharedPreferences",
      "Zero telemetry, zero analytics, no third-party trackers (verifiable via network analysis)",
      "All conversations stored locally using AES-256-GCM encryption",
      "GDPR Article 17 Right to Erasure & CCPA compliant by design",
      "SOC2-ready architecture with open source auditable codebase",
      "Full data backup and export in standard JSON/Markdown formats",
      "Minimal permissions - no camera, microphone, or contacts access required",
      "No account required, no cloud dependency, no vendor lock-in",
    ],
    screenshot: "https://twent.xyz/privacy-hero.png",
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

function BreadcrumbSchema() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://twent.xyz" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://twent.xyz/blog" },
      { "@type": "ListItem", position: 3, name: "Privacy-First AI", item: "https://twent.xyz/blog/privacy-first-ai-android" },
    ],
  };
  return <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>;
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
      <p className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2 font-semibold">
        {title}
      </p>
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
  const [ctaRef, _ctaInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <SchemaMarkup />
      <BreadcrumbSchema />
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
                only AI assistant with <strong>BYOK via Android Keystore</strong>,{" "}
                <strong>AES-256 encrypted storage</strong>, and{" "}
                <strong>local MNN AI models that run 100% offline</strong>. 
                Your chat history, API keys, and files never leave your device — 
                verifiable via any network analysis tool.
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
                { label: "Telemetry Trackers", value: "0", suffix: "" },
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
                href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
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
                alt="Twent Privacy-First AI - BYOK, local models, encrypted storage - on-device AI, data privacy, self-hosted language models, llama.cpp"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-mono">
                  AES-256 encrypted. Android Keystore keys. Local MNN models.
                  Zero outbound telemetry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              The Problem: Cloud AI Harvests Your Data for Training
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              Every major AI assistant stores your conversations on their servers, 
              logs your API calls for "safety improvements," and may use your data to 
              train future models. As the FTC warned: "your chat history being used 
              to train next-gen models without consent" is a real, documented practice. 
              Your personal data, work conversations, and queries become training 
              fodder — often without clear disclosure.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  problem: "Training Data Harvesting",
                  desc: "Your conversations are archived and used to train AI models. Companies like OpenAI, Google, and Anthropic have all disclosed using user data for model training, often with opt-out mechanisms buried in settings.",
                },
                {
                  problem: "API Call Logging",
                  desc: "When you send a prompt to ChatGPT or Claude, your API provider may log metadata and prompts for 'safety,' 'improvement,' and 'research' purposes — separate from your actual conversation history.",
                },
                {
                  problem: "Third-Party Data Sharing",
                  desc: "Cloud AI apps share data with analytics services, crash reporters, and advertising networks. Your device ID, location, usage patterns, and conversation topics become monetized across an ecosystem of trackers.",
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
                title="BYOK with Android Keystore"
                description="Your API keys are encrypted using AES-256 via Android Keystore — hardware-backed secure enclave on most devices. Keys never leave your device and are never transmitted to Twent's servers. Only you control your API credentials. <a href='/ai-agent-for-developers' className='text-green-500 hover:underline'>See BYOK for developers &rarr;</a>"
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
                title="Local MNN AI Models"
                description="Run AI models completely offline using Alibaba's MNN engine. Available models include Phi-3.5-mini (2.2GB, 4GB RAM), Qwen2.5-3B (3.5GB, 6GB RAM), and Stable Diffusion (1.5GB). No internet required — no data sent anywhere. <a href='/ai-agent-for-developers' className='text-green-500 hover:underline'>Use local models in your workflow &rarr;</a>"
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
                title="AES-256 Encrypted Storage"
                description="All data encrypted using AES-256-GCM via Android Keystore-backed EncryptedSharedPreferences. Conversations, API keys, files, and settings are encrypted at rest. Even with physical access to your device, data remains protected."
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
                description="No analytics SDKs, no crash reporters, no third-party trackers. Verify yourself using PacketCapture, PCAPdroid, or any network analysis tool. Twent makes zero outbound connections except when you explicitly make an API call. <a href='/privacy-first-ai-android' className='text-green-500 hover:underline'>See full privacy architecture &rarr;</a>"
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
                description="Export all conversations in JSON or Markdown format. Import them anywhere. GDPR Article 17 compliant — request deletion and all your data is erased. No vendor lock-in, no data hostage situations."
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
                title="Open Source & Auditable"
                description="100% open source on GitHub. Independent security audits welcome. SOC2-ready architecture with verifiable builds. No hidden code, no obfuscated binaries — inspect exactly what runs on your device."
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
                Precise transparency: exactly what stays local vs what goes to providers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="font-display text-xl text-green-500 mb-4">
                  ✓ What Stays on Your Device (100% Local)
                </p>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>All conversations</strong> — encrypted with AES-256-GCM via Android Keystore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Memory and knowledge graph</strong> — stored locally, never synced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>API keys</strong> — encrypted via Android Keystore, never transmitted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Files and documents</strong> — processed locally, no cloud upload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Workflow configurations</strong> — stored in encrypted SharedPreferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>App settings and preferences</strong> — encrypted at rest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>MNN model weights</strong> — downloaded once, run entirely offline</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="font-display text-xl text-orange-500 mb-4">
                  ⚡ What Goes to Providers (Direct HTTPS, You Control)
                </p>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span><strong>Only your prompt text</strong> — sent directly via HTTPS to your provider (OpenAI, Claude, Gemini, etc.) in an encrypted TLS 1.3 connection. No metadata, no device ID, no conversation history.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span><strong>Web search queries</strong> — only if you explicitly enable web search tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span><strong>MCP server requests</strong> — only if you configure MCP connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span><strong>Composio API calls</strong> — only if you connect Composio integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span><strong>Cloud TTS/STT</strong> — only if you explicitly choose cloud speech services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">⚡</span>
                    <span><strong>Manual data exports</strong> — you initiate, you choose destination</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-green-500">Key architecture difference:</strong> When you use cloud AI, your prompt goes Twent → OpenAI's API. We only forward the text you typed — no conversation context, no history, no metadata. The provider sees your prompt; Twent never logs it. Your API keys stay on-device; only a temporary authorization header is generated for that single request.
              </p>
            </div>
          </div>
        </section>

        {/* Trust & Compliance Section */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Compliance, Trust, and Verification
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Legal frameworks, open source verification, and how to audit us yourself.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  GDPR Compliant
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>Article 17 - Right to Erasure:</strong> Complete deletion of all personal data on request. Article 20 - Data Portability: Export in machine-readable JSON. Article 32: Technical measures including encryption at rest.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  CCPA Compliant
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  California Consumer Privacy Act compliant. Your "right to know," "right to delete," and "right to opt-out of sale" are all honored — though we don't sell data because we never have it.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  SOC2-Ready Architecture
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Minimal attack surface: no servers storing your data, no database of user records, no authentication service. Our architecture is designed for SOC2 compliance from day one.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  Open Source Audit
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  100% of Twent's code is on GitHub under Apache 2.0. Security researchers welcome. Reproducible builds ensure the APK you download matches the source code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Privacy FAQ
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Specific answers to your privacy questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  Does Twent work completely offline?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>Yes.</strong> When you use local MNN models (Phi-3.5-mini, Qwen2.5-3B, Stable Diffusion), the app requires zero network connectivity. No data ever leaves your device. Even app updates can be done manually via APK if you want maximum isolation.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  Can I self-host my own AI backend?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>Yes.</strong> Twent supports any OpenAI-compatible API endpoint. Point it to your self-hosted Ollama, LM Studio, or custom API server. Your prompts go directly to your infrastructure — Twent never touches them.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  How does my data leave my phone?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>Only one way:</strong> when you explicitly request a cloud AI response. Your typed prompt is sent via HTTPS/TLS 1.3 directly to your chosen provider (OpenAI, Claude, Gemini, etc.). That's it. No background sync, no crash reports, no analytics pings. Verify with PacketCapture or PCAPdroid.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  What's the difference from ChatGPT's privacy mode?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>ChatGPT's privacy mode</strong> prevents your data from being used for training, but OpenAI still stores your conversations on their servers for 30 days (by default). They log API calls, may use metadata for safety monitoring, and you must create an account.<br/><br/>
                  <strong>Twent</strong> never stores your conversations on any server. They're encrypted locally on your device. You don't need an account. There's no "training" risk because your data never leaves your phone unless you explicitly make an API call.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  How can I verify zero telemetry?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>Use network analysis tools:</strong> Install PCAPdroid, PacketCapture, or similar apps to monitor all network traffic from Twent. You'll find zero outbound connections except direct HTTPS calls to your configured API provider — and only when you explicitly trigger them. No analytics SDKs, no Firebase, no Crashlytics, no third-party trackers.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-lg text-green-500 mb-3">
                  What happens to my data if Twent is deleted?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>It's gone.</strong> Twent stores everything locally on your device. Uninstalling the app deletes all data — conversations, API keys, settings. There's no server-side backup because we never had your data. Use the built-in export feature before uninstalling if you want to keep records.
                </p>
              </div>
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
                    ["Local AI Models (MNN)", "✓", "✗", "✗", "✗"],
                    ["AES-256 Encrypted Storage", "✓", "✗", "✗", "✗"],
                    ["Android Keystore Key Storage", "✓", "✗", "✗", "✗"],
                    ["Zero Telemetry (verifiable)", "✓", "✗", "✗", "✗"],
                    ["No Account Required", "✓", "✗", "✗", "✗"],
                    ["Offline Mode", "✓", "✗", "✗", "✗"],
                    ["Open Source", "✓", "✗", "✗", "✗"],
                    ["GDPR Art. 17 Right to Erasure", "✓", "Limited", "Limited", "Limited"],
                    ["CCPA Compliant by Design", "✓", "✓", "✓", "✓"],
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
                that offers AES-256 encryption via Android Keystore, local MNN AI models, 
                zero verifiable telemetry, and GDPR Article 17 compliance by architecture. 
                Every other AI assistant requires you to trust them with your data.
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
              Join thousands of privacy-conscious users who've switched to Twent. 
              BYOK with AES-256 encryption, local MNN AI models, zero telemetry — 
              free, no account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
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
              Zero telemetry. GDPR & CCPA compliant.
            </p>
          </div>
        </section>
        {/* Related Pages */}
        <section className="py-16 px-6 bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-zinc-400 mb-6 text-center">Explore Other Audiences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a href="/ai-agent-for-developers" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors mb-1">AI Agent for Developers</div>
                <div className="text-xs text-zinc-500">Claude Code, MCP tools, GitHub CLI, full IDE on mobile</div>
              </a>
              <a href="/terminal-on-android" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors mb-1">Terminal on Android</div>
                <div className="text-xs text-zinc-500">Full Linux on your phone — SSH, apt, git, daemons</div>
              </a>
              <a href="/android-automation-power-user" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors mb-1">Automation Power User</div>
                <div className="text-xs text-zinc-500">Automate everything — apps, APIs, Tasker, cron jobs</div>
              </a>
              <a href="/ai-marketplace-creators" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors mb-1">Marketplace Creators</div>
                <div className="text-xs text-zinc-500">Sell AI skills, MCP servers, and custom tools</div>
              </a>
              <a href="/enterprise-ai-agent" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors mb-1">Enterprise</div>
                <div className="text-xs text-zinc-500">On-premise deployment, custom workflows, team management</div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
