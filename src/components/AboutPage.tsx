import { Nav } from "./Nav";
import { Footer } from "./Footer";

// JSON-LD Schema for About Page
function AboutSchemaMarkup() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Twent AI",
      description:
        "Twent AI builds Twent, a free on-device AI agent for Android that automates apps, runs a full Ubuntu terminal, and works offline with local AI models.",
      url: "https://twent.xyz/about",
      isPartOf: { "@type": "WebSite", "@id": "https://twent.xyz/#website" },
      mainEntity: {
        "@type": "Organization",
        name: "Twent AI",
        url: "https://twent.xyz",
        logo: "https://twent.xyz/OKFINALTWENTLOGO-removebg.png",
        email: "jeffrinjames@twent.xyz",
        sameAs: [
          "https://x.com/Jeff9James",
          "https://discord.gg/dUFrWm4w",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "jeffrinjames@twent.xyz",
          contactType: "customer service",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
      },
      dateModified: "2026-08-22",
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://twent.xyz" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://twent.xyz/about" },
      ],
    },
  ];

  return (
    <>
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}

export function AboutPage({
  dark,
}: {
  dark: boolean;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <AboutSchemaMarkup />
      <Nav dark={dark} />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-3xl md:text-4xl mb-2">About Twent</h1>
        <p className="text-sm text-zinc-500 mb-10">
          Twent AI — the on-device AI agent for Android
        </p>

        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Twent AI is the independent team behind <strong>Twent</strong>, a free
            AI agent that runs entirely on Android devices. We believe the next
            generation of AI should not live in a datacenter — it should live in
            your pocket, see what you see, and act on your behalf without shipping
            your data to anyone.
          </p>

          <h2 className="font-display text-xl md:text-2xl pt-4">What we build</h2>
          <p>
            Twent is an agentic OS layer for Android 8.0+ (arm64-v8a). It sees
            your screen through Android accessibility APIs and can tap, swipe,
            and type into any app. It ships a full Ubuntu 24.04 LTS terminal —
            bash, apt, Python, Node, Go, Rust, git, SSH, and VS Code Server —
            with no root required. It executes Claude Code and OpenAI Codex
            directly on the device, runs local GGUF and MNN models offline, and
            connects to more than 1,000 external services through MCP and
            Composio. A visual workflow builder, Tasker integration, and a
            skills marketplace round out the automation story.
          </p>

          <h2 className="font-display text-xl md:text-2xl pt-4">How we make money</h2>
          <p>
            Twent is completely free. Every feature, every tool, everything
            included — no credit card, no subscription, no Play Store
            middleman. The app is distributed as a direct APK download from{" "}
            <a href="https://twent.xyz" className="text-blue-600 dark:text-blue-400 hover:underline">
              twent.xyz
            </a>
            . You bring your own AI provider keys, encrypted on-device with
            Android KeyStore; we never see or store them.
          </p>

          <h2 className="font-display text-xl md:text-2xl pt-4">Privacy by architecture</h2>
          <p>
            Zero telemetry. No analytics on your usage, no data sales, no cloud
            dependency unless you explicitly configure a cloud model. When you
            use local models, nothing leaves your device at all. Our full data
            practices are documented in the{" "}
            <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              privacy policy
            </a>
            .
          </p>

          <h2 className="font-display text-xl md:text-2xl pt-4">Contact us</h2>
          <p>
            Questions, bug reports, or partnership inquiries: email{" "}
            <a href="mailto:jeffrinjames@twent.xyz" className="text-blue-600 dark:text-blue-400 hover:underline">
              jeffrinjames@twent.xyz
            </a>{" "}
            or use the{" "}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              contact page
            </a>
            . We are also on{" "}
            <a
              href="https://x.com/Jeff9James"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              X
            </a>{" "}
            and{" "}
            <a
              href="https://discord.gg/dUFrWm4w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Discord
            </a>
            .
          </p>
        </div>
      </main>
      <Footer dark={dark} />
    </div>
  );
}
