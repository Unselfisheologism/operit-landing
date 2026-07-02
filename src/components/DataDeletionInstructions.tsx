import { Nav } from "./Nav";
import { Footer } from "./Footer";

function DataDeletionSchemaMarkup() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Data Deletion Instructions - Twent",
      description:
        "How to delete your data from Twent. Local-first app — all data is stored on your device.",
      url: "https://twent.xyz/docs/data-deletion-instructions",
      isPartOf: { "@type": "WebSite", "@id": "https://twent.xyz/#website" },
      about: { "@type": "SoftwareApplication", name: "Twent" },
      datePublished: "2024-01-01",
      dateModified: "2026-07-02",
      inLanguage: "en-US",
    },
    {
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
          name: "Docs",
          item: "https://twent.xyz/docs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Data Deletion Instructions",
          item: "https://twent.xyz/docs/data-deletion-instructions",
        },
      ],
    },
  ];

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export function DataDeletionInstructions({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <DataDeletionSchemaMarkup />
      <Nav dark={dark} onToggle={onToggle} />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
            <li>
              <a
                href="/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a
                href="/docs"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Docs
              </a>
            </li>
            <li>/</li>
            <li className="text-zinc-900 dark:text-zinc-100">
              Data Deletion Instructions
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-100">
          Data Deletion Instructions
        </h1>
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-10">
          App Name: Twent
        </p>

        {/* Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold mt-10 mb-3 text-zinc-800 dark:text-zinc-200">
            How to Delete Your Data
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
            Twent is a local-first application. We do not store your personal
            data, chat history, or agentic memory on our own servers. All your
            data is stored locally on your device. To delete your data, please
            follow these steps:
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2 text-zinc-800 dark:text-zinc-200">
            Option 1 (In-App)
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
            Open the Twent app, navigate to Settings, and tap the "Clear All
            Local Data" button.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2 text-zinc-800 dark:text-zinc-200">
            Option 2 (Android System)
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
            Go to your Android device Settings &gt; Apps &gt; Twent &gt;
            Storage &amp; cache &gt; tap Clear Storage (or Clear Data).
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-3 text-zinc-800 dark:text-zinc-200">
            What Data is Deleted
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
            Executing the steps above will permanently and immediately delete all
            locally stored data, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Chat history and conversation logs.</li>
            <li>Agentic memory and knowledge base entries.</li>
            <li>Saved workflows, templates, and local configurations.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-3 text-zinc-800 dark:text-zinc-200">
            What Data is Kept / Third-Party Data
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
            Because Twent operates on a Bring-Your-Own-Key (BYOK) model, your
            prompts and files are sent directly to the third-party AI providers
            you choose (e.g., OpenAI, Anthropic). Twent does not retain this
            data. Any data processed by these third-party providers is subject to
            their respective privacy policies and data retention practices.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href="/docs"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Docs
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
