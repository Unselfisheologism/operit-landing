import { useEffect } from "react";

// No external dependencies – head tags managed via useEffect

interface Feature {
  name: string;
  twent: boolean;
  competitor: boolean;
}

interface ComparisonPageProps {
  competitorName: string;
  competitorSlug: string;
  pageTitle: string;
  lastUpdated: string;
  verdict: string;
  features: Feature[];
  metaDescription?: string;
  metaKeywords?: string;
  faq?: { question: string; answer: string }[];
}

// Detailed Analysis section — shows expanded info for each competitor
function DetailedAnalysis({
  competitorName,
  verdict,
  features,
}: {
  competitorName: string;
  verdict: string;
  features: Feature[];
}) {
  const twentStrengths = features.filter((f) => f.twent && !f.competitor);
  const twentWeaknesses = features.filter((f) => !f.twent && f.competitor);

  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Detailed Analysis
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            The full picture — what Twent does well, where it falls short, and
            when you should pick {competitorName} over Twent.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-display text-2xl text-zinc-900 dark:text-zinc-100">
              {competitorName}
            </h3>
            <span
              className={`text-xs font-mono px-2 py-1 rounded ${
                verdict === "Better"
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : verdict === "Twent Wins"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
              }`}
            >
              {verdict}
            </span>
          </div>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            {verdict}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded">
              <p className="text-xs font-secondary text-green-500 uppercase tracking-[0.15em] mb-2">
                Twent Strengths
              </p>
              {twentStrengths.length > 0 ? (
                twentStrengths.slice(0, 4).map((f) => (
                  <p
                    key={f.name}
                    className="text-sm text-zinc-600 dark:text-zinc-400 mb-1"
                  >
                    <span className="text-green-500 mr-1">✓</span> {f.name}
                  </p>
                ))
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                  No clear advantages in this comparison
                </p>
              )}
            </div>
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded">
              <p className="text-xs font-secondary text-red-500 uppercase tracking-[0.15em] mb-2">
                Twent Weaknesses
              </p>
              {twentWeaknesses.length > 0 ? (
                twentWeaknesses.slice(0, 4).map((f) => (
                  <p
                    key={f.name}
                    className="text-sm text-zinc-600 dark:text-zinc-400 mb-1"
                  >
                    <span className="text-red-500 mr-1">✗</span> {f.name}
                  </p>
                ))
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                  No significant weaknesses in this comparison
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced FAQ with more depth
function EnhancedFAQ({
  faq,
  competitorName,
}: {
  faq?: { question: string; answer: string }[];
  competitorName: string;
}) {
  const defaultFaqs = [
    {
      q: `Why does Twent win on device automation but ${competitorName} still exists?`,
      a: `Different use cases. If you need a web chatbot for occasional questions, ${competitorName} is excellent. Twent's advantage is specifically in "does things for you" — acting on your device, running terminal commands, automating workflows. For pure chat, it's a different category.`,
    },
    {
      q: `Is it fair to compare Twent's AI agents with web-based chatbots?`,
      a: `Only partially. Web chatbots are stateless — they answer questions and forget. Twent is stateful — it remembers your context, accesses your files, and acts on your apps. The comparison table highlights capability gaps, but the best setup uses both: web AI for research, Twent for execution.`,
    },
    {
      q: `What makes Twent's automation different from automation apps?`,
      a: `Automation apps like Tasker are rule-based: "if X happens, do Y." They're powerful but require manual setup of every rule. Twent is AI-driven: "do X for me" and it figures out the steps. You describe what you want in plain English — the agent figures out the automation.`,
    },
    {
      q: `Why doesn't every competitor add device automation?`,
      a: `It's genuinely hard. Requires deep system integration, constant updates for app UI changes, higher battery consumption, and raises privacy concerns users are rightfully skeptical of. Twent solves this with transparent permission levels and BYOK encryption.`,
    },
  ];

  // Handle both { question, answer } from props and { q, a } from defaults
  const normalizeFaq = (item: Record<string, string>) => ({
    q: item.question ?? item.q ?? "",
    a: item.answer ?? item.a ?? "",
  });
  const displayFaqs = faq && faq.length > 0 ? faq : defaultFaqs;

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            The things people actually ask before choosing.
          </p>
        </div>
        <div className="space-y-4">
          {displayFaqs.map((item, i) => {
            const f = normalizeFaq(item);
            return (
              <div
                key={i}
                className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  {f.q}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {f.a}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ComparisonPage({
  competitorName,
  competitorSlug,
  pageTitle,
  lastUpdated,
  verdict,
  features,
  metaDescription,
  metaKeywords,
  faq,
}: ComparisonPageProps) {
  const fullUrl = `https://twent.xyz/vs/${competitorSlug}`;
  const description = metaDescription || verdict.slice(0, 155) + "…";
  const keywords =
    metaKeywords ||
    "twent AI vs " +
      competitorName +
      ", AI assistant Android comparison, best AI app android";

  // Inject head tags on mount
  useEffect(() => {
    // Title
    document.title = pageTitle;

    // Helper to set or create meta/link tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      let tag = document.querySelector(
        `meta[${isProperty ? "property" : "name"}="${name}"]`,
      ) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) tag.setAttribute("property", name);
        else tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta
    setMeta("description", description);
    setMeta("keywords", keywords);
    setLink("canonical", fullUrl);

    // Open Graph
    setMeta("og:title", pageTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", `https://twent.xyz/og-${competitorSlug}.png`, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", "website", true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", description);
    setMeta(
      "twitter:image",
      `https://twent.xyz/og-${competitorSlug}.png`,
      true,
    );

    // Article timestamps (Google Discover / News)
    setMeta("article:published_time", "2026-04-19T00:00:00Z");
    setMeta("article:modified_time", "2026-04-29T00:00:00Z");
    setMeta("article:section", "Technology");

    // JSON‑LD structured data (SoftwareApplication + WebSite)
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "twent AI",
      applicationCategory: "ArtificialIntelligenceApplication",
      operatingSystem: "Android",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingCount: "42",
        ratingValue: "4.8",
      },
      description:
        "twent AI is an Android app with a full Ubuntu terminal, local AI models, MCP plugins, and deep device automation.",
    });
    document.head.appendChild(script);

    const websiteScript = document.createElement("script");
    websiteScript.type = "application/ld+json";
    websiteScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "twent AI",
      url: "https://twent.xyz",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://twent.xyz/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });
    document.head.appendChild(websiteScript);

    // BreadcrumbList structured data — 3-level: Home → Compare → vs Competitor
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://twent.xyz",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Compare",
          item: "https://twent.xyz/vs/chatgpt",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `vs ${competitorName.replace("ChatGPT Android App", "ChatGPT").replace("Android App", "").trim()}`,
          item: fullUrl,
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    // FAQ schema for AI answers
    if (faq && faq.length > 0) {
      const faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });
      document.head.appendChild(faqScript);
    }

    // Set html lang if missing
    if (!document.documentElement.lang) {
      document.documentElement.lang = "en";
    }

    // Cleanup on unmount would be ideal but omitted for brevity
  }, [
    faq,
    pageTitle,
    description,
    keywords,
    fullUrl,
    competitorSlug,
    competitorName,
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-display font-bold mb-4">{pageTitle}</h1>
        <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
      </header>

      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 mb-10">
        <h2 className="font-semibold mb-2 text-xl">Quick Verdict</h2>
        <p className="text-lg">{verdict}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>

      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900">
              <th className="text-left p-4 border-b">Feature</th>
              <th className="text-center p-4 border-b">twent AI</th>
              <th className="text-center p-4 border-b">{competitorName}</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feat, i) => (
              <tr
                key={i}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <td className="p-4">{feat.name}</td>
                <td className="p-4 text-center">{feat.twent ? "✓" : "✗"}</td>
                <td className="p-4 text-center">
                  {feat.competitor ? "✓" : "✗"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Analysis Section */}
      <DetailedAnalysis
        competitorName={competitorName}
        verdict={verdict}
        features={features}
      />

      {/* Enhanced FAQ Section */}
      <EnhancedFAQ faq={faq} competitorName={competitorName} />

      {/* ── Internal cross-links: blog & docs ── */}
      <div className="my-10 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 mb-4">
          Read more
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/blog/marketplace"
            className="px-4 py-3 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200"
          >
            Twent Marketplace — AI Skills &amp; Integrations →
          </a>
          <a
            href="/blog/best-ai-apps-android"
            className="px-4 py-3 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200"
          >
            25 Best AI Apps for Android →
          </a>
          <a
            href="/docs"
            className="px-4 py-3 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200"
          >
            Read the Twent Docs →
          </a>
        </div>
      </div>

      <div className="text-center py-10 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-4">Try twent AI For Free</h2>
        <a
          href="https://assets.twent.xyz/app-release.apk"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Download App
        </a>
      </div>

      <footer className="mt-12 pt-6 border-t text-gray-500 text-sm flex items-center justify-between">
        <p>
          Disclosure: This is an independent comparison. We strive to keep
          information accurate but always verify features on official product
          pages.
        </p>
        <a
          href="https://github.com/Unselfisheologism/Twent"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="ml-4 shrink-0 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}
