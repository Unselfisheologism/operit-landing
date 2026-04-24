import { ComparisonPage } from "../../components/ComparisonPage";

export default function QordinateComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="qordinate"
        competitorName="Qordinate"
        pageTitle="twent AI vs Qordinate: Automation Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Qordinate is an emerging workflow automation platform with visual editing and integration support. twent AI offers native Android automation with local AI, full terminal access, and offline execution, keeping your data on-device."
        features={[
          { name: "Workflow Automation", twent: true, competitor: true },
          { name: "Scheduled Jobs", twent: true, competitor: true },
          { name: "Native Android App", twent: true, competitor: false },
          {
            name: "Natural Language Configuration",
            twent: true,
            competitor: false,
          },
          { name: "Full Terminal Access", twent: true, competitor: false },
          { name: "Local Execution", twent: true, competitor: true },
          { name: "LLM Agent Capabilities", twent: true, competitor: true },
          { name: "Open Source", twent: true, competitor: true },
          { name: "500+ Integrations", twent: false, competitor: true },
          { name: "Visual Node Editor", twent: false, competitor: true },
        ]}
      />
    </div>
  );
}
