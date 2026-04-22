import React from 'react'
import { ComparisonPage } from '../../components/ComparisonPage'

export default function N8nComparisonPage() {
  return (
    <ComparisonPage
      competitorName="n8n"
      pageTitle="Operit AI vs n8n: Automation Comparison 2026"
      metaDescription="Operit AI vs n8n workflow automation comparison. Compare AI agents, automation capabilities, terminal access and mobile support."
      lastUpdated="April 22, 2026"
      verdict="n8n is the industry standard for node based workflow automation. Operit AI is an AI native assistant with LLM driven automation, natural language scheduling, full terminal access and runs locally on your Android phone. n8n requires a server, Operit runs in your pocket."
      features=[{'name': 'Workflow Automation', 'operit': True, 'competitor': True}, {'name': 'Scheduled Jobs', 'operit': True, 'competitor': True}, {'name': 'Native Android App', 'operit': True, 'competitor': False}, {'name': 'Natural Language Configuration', 'operit': True, 'competitor': False}, {'name': 'Full Terminal Access', 'operit': True, 'competitor': False}, {'name': 'Local Execution', 'operit': True, 'competitor': True}, {'name': 'LLM Agent Capabilities', 'operit': True, 'competitor': True}, {'name': 'Open Source', 'operit': True, 'competitor': True}, {'name': '500+ Integrations', 'operit': False, 'competitor': True}, {'name': 'Visual Node Editor', 'operit': False, 'competitor': True}]
    />
  )
}
