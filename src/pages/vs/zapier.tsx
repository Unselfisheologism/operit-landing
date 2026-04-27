import { ComparisonPage } from "../../components/ComparisonPage";

export default function ZapierComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="zapier"
        competitorName="Zapier"
        pageTitle="twent AI vs Zapier: Automation Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Zapier connects thousands of apps with an easy visual builder, but it's a cloud-only service with no native Android automation or local control. twent AI puts the power of AI and terminal automation directly on your device."
        metaKeywords="zapier alternative, ai automation, workflow automation, best ai for android, ai android, personal assistant ai, ai assistant for android"
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
          { name: "Local Execution", twent: true, competitor: false },
          { name: "LLM Agent Capabilities", twent: true, competitor: true },
          { name: "Open Source", twent: true, competitor: false },
          { name: "500+ Integrations", twent: false, competitor: true },
          { name: "Visual Node Editor", twent: false, competitor: true },
        ]}
      />
    </div>
  );
}
