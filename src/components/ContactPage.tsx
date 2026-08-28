import { Nav } from "./Nav";
import { Footer } from "./Footer";

// JSON-LD Schema for Contact Page
function ContactSchemaMarkup() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Twent AI",
      description:
        "How to reach the Twent AI team: support email, community channels, and response expectations.",
      url: "https://twent.xyz/contact",
      isPartOf: { "@type": "WebSite", "@id": "https://twent.xyz/#website" },
      dateModified: "2026-08-22",
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://twent.xyz" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://twent.xyz/contact" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Twent AI",
      url: "https://twent.xyz",
      logo: "https://twent.xyz/OKFINALTWENTLOGO-removebg.png",
      email: "jeffrinjames@twent.xyz",
      sameAs: ["https://x.com/Jeff9James", "https://discord.gg/dUFrWm4w"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "jeffrinjames@twent.xyz",
          contactType: "customer service",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          email: "jeffrinjames@twent.xyz",
          contactType: "technical support",
          availableLanguage: ["English"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
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

export function ContactPage({
  dark,
}: {
  dark: boolean;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ContactSchemaMarkup />
      <Nav dark={dark} />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-3xl md:text-4xl mb-2">Contact Twent</h1>
        <p className="text-sm text-zinc-500 mb-10">
          We read every message. Here's how to reach us.
        </p>

        <div className="space-y-6 text-base leading-relaxed">
          <h2 className="font-display text-xl md:text-2xl pt-2">Email support</h2>
          <p>
            The fastest way to reach the team is email at{" "}
            <a
              href="mailto:jeffrinjames@twent.xyz"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              jeffrinjames@twent.xyz
            </a>
            . This is our customer service and technical support address. We aim
            to reply within a few business days, and usually much faster. When
            reporting a bug, include your Android version, device model, and the
            Twent version shown in the app.
          </p>

          <h2 className="font-display text-xl md:text-2xl pt-4">Community</h2>
          <p>
            For quicker answers and discussion with other users, join our{" "}
            <a
              href="https://discord.gg/dUFrWm4w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Discord server
            </a>{" "}
            or follow{" "}
            <a
              href="https://x.com/Jeff9James"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              @Jeff9James on X
            </a>
            . MCP skill authors are especially welcome —
            most questions get answered by the community within
            hours.
          </p>

          <h2 className="font-display text-xl md:text-2xl pt-4">Documentation & agents</h2>
          <p>
            Setup guides and tool references live in the{" "}
            <a href="/docs" className="text-blue-600 dark:text-blue-400 hover:underline">
              documentation
            </a>
            . AI agents and automated systems can use{" "}
            <a href="/llms.txt" className="text-blue-600 dark:text-blue-400 hover:underline">
              /llms.txt
            </a>
            ,{" "}
            <a href="/agent.txt" className="text-blue-600 dark:text-blue-400 hover:underline">
              /agent.txt
            </a>
            , and the{" "}
            <a href="/openapi.json" className="text-blue-600 dark:text-blue-400 hover:underline">
              OpenAPI spec
            </a>{" "}
            for machine-readable access to this site.
          </p>

          <h2 className="font-display text-xl md:text-2xl pt-4">Business & press</h2>
          <p>
            Partnership, enterprise deployment, or press inquiries should also go
            to jeffrinjames@twent.xyz with "Business" or "Press" in the subject
            line. See the{" "}
            <a href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
              about page
            </a>{" "}
            for company background.
          </p>
        </div>
      </main>
      <Footer dark={dark} />
    </div>
  );
}
