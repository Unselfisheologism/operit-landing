import { ComparisonPage } from "../../components/ComparisonPage";

export default function MakeComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="make"
        competitorName="Make"
        pageTitle="twent AI vs Make: Automation Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Make is a powerful cloud-based workflow automation platform with thousands of integrations. twent AI runs natively on Android, offering local AI execution, natural language scheduling, and deep system access without relying on cloud infrastructure."
        metaKeywords="make automation, workflow automation, ai automation android, ai for android, ai assistant for android, best ai app for android"
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
