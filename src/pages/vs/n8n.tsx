import { ComparisonPage } from '../../components/ComparisonPage'

export default function N8nComparisonPage() {
  return (
    <ComparisonPage
      competitorSlug="n8n" competitorName="n8n"
      pageTitle="Operit AI vs n8n: Automation Comparison 2026"
      metaDescription="Operit AI vs n8n workflow automation comparison. Compare AI agents, automation capabilities, terminal access and mobile support."
      lastUpdated="April 22, 2026"
      verdict="n8n is the industry standard for node based workflow automation. Operit AI is an AI native assistant with LLM driven automation, natural language scheduling, full terminal access and runs locally on your Android phone. n8n requires a server, Operit runs in your pocket."
      features={[{name: 'Workflow Automation', operit: true, competitor: true}, {name: 'Scheduled Jobs', operit: true, competitor: true}, {name: 'Native Android App', operit: true, competitor: false}, {name: 'Natural Language Configuration', operit: true, competitor: false}, {name: 'Full Terminal Access', operit: true, competitor: false}, {name: 'Local Execution', operit: true, competitor: true}, {name: 'LLM Agent Capabilities', operit: true, competitor: true}, {name: 'Open Source', operit: true, competitor: true}, {name: '500+ Integrations', operit: false, competitor: true}, {name: 'Visual Node Editor', operit: false, competitor: true }]}
    />
  )
}
