import { ComparisonPage } from "../../components/ComparisonPage";

export default function AnythingllmComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="anything-llm"
        competitorName="Anything LLM"
        pageTitle="twent AI vs Anything LLM: Comparison 2026"
        lastUpdated="April 22, 2026"
verdict="Anything LLM is the best open source RAG system for desktops/servers. twent AI is built for Android, includes full terminal, automation, MCP plugins and device integration in addition to all the RAG capabilities of Anything LLM."
        metaKeywords="local llm, llm android, ai for android, ai apps for android, personal assistant ai, ai assistant for android"
        features={[
          { name: "Local Model Support", twent: true, competitor: true },
          { name: "RAG Knowledge Base", twent: true, competitor: true },
          { name: "Open Source", twent: true, competitor: true },
          { name: "Native Android App", twent: true, competitor: false },
          { name: "Full Ubuntu Terminal", twent: true, competitor: false },
          { name: "Android System Automation", twent: true, competitor: false },
          { name: "MCP Plugins", twent: true, competitor: false },
          { name: "Persistent Memory", twent: true, competitor: true },
          { name: "Offline Operation", twent: true, competitor: true },
          { name: "Floating Overlay", twent: true, competitor: false },
        ]}
      />
    </div>
  );
}
