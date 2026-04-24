import { ComparisonPage } from "../../components/ComparisonPage";

export default function NebulaComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="nebula"
        competitorName="Nebula.gg"
        pageTitle="twent AI vs Nebula.gg: Full Comparison (2026)"
        lastUpdated="April 22, 2026"
        verdict="Nebula.gg is a great new mobile AI assistant with good UI. twent AI provides full Ubuntu terminal, local GGUF model support, MCP plugins and root automation that Nebula does not offer. twent is also fully open source."
        features={[
          { name: "Native Android App", twent: true, competitor: true },
          { name: "Built-in Ubuntu Terminal", twent: true, competitor: false },
          { name: "Local GGUF Inference", twent: true, competitor: false },
          { name: "MCP / Skill Plugins", twent: true, competitor: false },
          { name: "Android UI Automation", twent: true, competitor: false },
          { name: "Persistent Memory", twent: true, competitor: true },
          { name: "Floating Bubble Overlay", twent: true, competitor: true },
          { name: "Offline Operation", twent: true, competitor: false },
          { name: "Open Source", twent: true, competitor: false },
          { name: "ADB / Root Integration", twent: true, competitor: false },
          { name: "Free Tier Available", twent: true, competitor: false },
        ]}
      />
    </div>
  );
}
