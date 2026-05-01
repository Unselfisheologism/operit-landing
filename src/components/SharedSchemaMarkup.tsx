// Shared JSON-LD Schema for Twent landing pages
// Consolidates all repeated schema markup — prevents duplicate schema.org entries
import { useEffect } from "react";

// Core schemas shared across all landing page variants
// SoftwareApplication + WebSite + Organization
export function SharedSchemaMarkup() {
  useEffect(() => {
    // Remove any stale schema scripts from alternate landing page variants
    // (prevents duplicate schema when navigating between page variants)
    document
      .querySelectorAll('script[type="application/ld+json"][data-schema-origin]')
      .forEach((el) => el.remove());

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Twent",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android",
        url: "https://twent.xyz",
        description:
          "The AI agent that runs ON your Android — automates apps, runs Ubuntu terminal & connects 1000+ services.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "42",
          bestRating: "5",
        },
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
        sameAs: ["https://twitter.com/twentxyz", "https://github.com/twent"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@twent.xyz",
          contactType: "customer service",
        },
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
