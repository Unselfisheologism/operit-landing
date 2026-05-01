import { Pricing } from "./Pricing";
import { Footer } from "./Footer";

export function PricingPage() {
  // JSON-LD Schema for Pricing Page
  function PricingSchemaMarkup() {
    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://twent.xyz/pricing#webpage",
        url: "https://twent.xyz/pricing",
        name: "Twent Pricing - Free AI Agent for Android",
        description: "Twent is 100% free. Automate Android apps, run Ubuntu terminal & connect 1000+ services. No credit card. Get started now.",
        isPartOf: { "@type": "WebSite", "@id": "https://twent.xyz/#website" },
        about: { "@type": "SoftwareApplication", name: "Twent" },
        datePublished: "2024-01-01",
        dateModified: "2026-04-29",
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Twent",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android",
        url: "https://twent.xyz",
        description: "Personal agentic OS for Android — automates apps, runs Ubuntu terminal, connects 1000+ services. 100% free.",
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "0",
          highPrice: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "0",
            priceCurrency: "USD",
            unitText: "per month",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "42",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://twent.xyz" },
          { "@type": "ListItem", position: 2, name: "Pricing", item: "https://twent.xyz/pricing" },
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

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <PricingSchemaMarkup />
      <main>
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}
