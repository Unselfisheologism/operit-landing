import { ComparisonPage } from "../../components/ComparisonPage";

export default function HermesagentComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="hermes-agent"
        competitorName="Hermes Agent (Nous Research)"
        pageTitle="twent AI vs Hermes Agent: Open Source AI Comparison"
        lastUpdated="April 22, 2026"
        verdict="Hermes Agent is an excellent open source agent backend for servers/desktops. twent AI is the Android port and implementation of Hermes, optimized for mobile, with native Android permissions, terminal, automation and UI. twent brings the full Hermes agent stack to your pocket."
        features={[
          { name: "Open Source", twent: true, competitor: true },
          { name: "MCP Protocol Support", twent: true, competitor: true },
          { name: "Skills System", twent: true, competitor: true },
          { name: "Native Android App", twent: true, competitor: false },
          { name: "Built-in Ubuntu Terminal", twent: true, competitor: false },
          { name: "Android UI Automation", twent: true, competitor: false },
          { name: "Local GGUF Inference", twent: true, competitor: true },
          { name: "Subagent Delegation", twent: true, competitor: true },
          { name: "Floating Overlay", twent: true, competitor: false },
          { name: "Persistent Memory", twent: true, competitor: true },
        ]}
      />
    </div>
  );
}
