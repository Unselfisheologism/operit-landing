// Shared JSON-LD Schema for Twent landing pages
// Consolidates all repeated schema markup — prevents duplicate schema.org entries
// SoftwareApplication (enriched) + WebSite + Organization + FAQPage
import { useEffect } from "react";

// FAQ content — mirrors the FAQ section in Pricing.tsx so both stay in sync
const faqData = [
  {
    question: "Is Twent really free?",
    answer: "Yes. Right now, everything is completely free. All 50+ tools, the Ubuntu terminal, overlay agent, MCP servers, skills, workflows — the whole thing. We're in pre-revenue and focused on building the best agent OS, not paywalling features.",
  },
  {
    question: "How do you distribute the app if it's not on the Play Store?",
    answer: "We distribute the APK directly from our website. Download, install, and you're good to go. No middleman, no store fees, no waiting for approval.",
  },
  {
    question: "Will there be ads?",
    answer: "Eventually, yes — powered by AI ads (koahlabs.com). They'll be non-intrusive and contextually relevant. A future Pro plan ($20) will remove them entirely, along with cosmetic badges, early access to features, and zero marketplace commissions.",
  },
  {
    question: "What's the marketplace?",
    answer: "The marketplace is an upcoming agentic app store — users can sell skills, workflows, plugins, and MCP servers. It doesn't exist yet. Once we move to the Play Store and start generating revenue, marketplace commissions will fund the free tier. Pro users ($20) get zero commissions.",
  },
  {
    question: "What's the difference between free now and Pro later?",
    answer: "Right now: everything is free, Website APK distribution, AI ads, no marketplace, no cosmetic badges. Later (post-revenue): Play Store distribution, everything still free, AI ads, marketplace with commissions, and Pro ($20) for ad removal, cosmetic badges, early access features, and zero marketplace commissions.",
  },
  {
    question: "Why not just put it on the Play Store now?",
    answer: "Play Store means reviews, fees, and slower iteration. We're moving fast — shipping features weekly, breaking things, fixing them. Website APK distribution lets us do that. Once we're stable and generating revenue, Play Store is the move.",
  },
];

// Core schemas shared across all landing page variants
// SoftwareApplication (enriched) + WebSite + Organization + FAQPage
export function SharedSchemaMarkup() {
  useEffect(() => {
    // Remove any stale schema scripts from alternate landing page variants
    // (prevents duplicate schema when navigating between page variants)
    document
      .querySelectorAll('script[type="application/ld+json"][data-schema-origin]')
      .forEach((el) => el.remove());

    const schemas = [
      {
        // Enriched SoftwareApplication — full Schema.org spec for app rich results
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Twent",
        description:
          "The AI agent that runs ON your Android — automates apps, runs Ubuntu terminal & connects 1000+ services.",
        url: "https://twent.xyz",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "42",
          bestRating: "5",
        },
        author: {
          "@type": "Organization",
          name: "Twent AI",
          url: "https://twent.xyz",
        },
        publisher: {
          "@type": "Organization",
          name: "Twent AI",
          url: "https://twent.xyz",
          logo: {
            "@type": "ImageObject",
            url: "https://twent.xyz/OKFINALTWENTLOGO-removebg.png",
          },
        },
        screenshot: {
          "@type": "ImageObject",
          url: "https://twent.xyz/TWENT-OPENGRAPH-IMG.png",
        },
        installUrl: "https://twent.xyz/#download",
        featureList: [
          "AI Agent overlay on any Android app",
          "Ubuntu 24.04 LTS terminal",
          "UI automation (tap, swipe, type)",
          "MCP server support",
          "1000+ Composio integrations",
          "Skills & workflows marketplace",
          "Local GGUF model support",
          "BYOK API key encryption",
          "Voice activation",
          "Smart memory",
        ],
        screenshot: "https://twent.xyz/TWENT-OPENGRAPH-IMG.png",
        softwareVersion: "1.0.0",
        datePublished: "2024-01-01",
        requirements: "Android 8.0+",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://twent.xyz/#website",
        url: "https://twent.xyz",
        name: "Twent AI",
        publisher: {
          "@type": "Organization",
          name: "Twent AI",
          url: "https://twent.xyz",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://twent.xyz/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Twent AI",
        url: "https://twent.xyz",
        logo: "https://twent.xyz/OKFINALTWENTLOGO-removebg.png",
        sameAs: [
          "https://github.com/Unselfisheologism/Twent",
          "https://x.com/Jeff9James",
          "https://discord.gg/dUFrWm4w",
          "mailto:jeffrinjames@twent.xyz",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "jeffrinjames@twent.xyz",
          contactType: "customer service",
        },
      },
      // FAQPage schema — drives "Questions and answers" rich results in Google
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ];

    schemas.forEach((schema, i) => {
      const existing = document.querySelector(
        `script[type="application/ld+json"][data-schema-index="${i}"]`
      );
      if (existing) {
        existing.textContent = JSON.stringify(schema);
        return;
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema-index", String(i));
      script.setAttribute("data-schema-origin", "shared");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, []);

  return null;
}
