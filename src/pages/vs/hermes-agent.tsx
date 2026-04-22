import React from 'react'
import { ComparisonPage } from '../../components/ComparisonPage'

export default function HermesagentComparisonPage() {
  return (
    <ComparisonPage
      competitorName="Hermes Agent (Nous Research)"
      pageTitle="Operit AI vs Hermes Agent: Open Source AI Comparison"
      metaDescription="Compare Operit AI vs Hermes Agent by Nous Research. Open source AI assistants, automation, terminal access and MCP support."
      lastUpdated="April 22, 2026"
      verdict="Hermes Agent is an excellent open source agent backend for servers/desktops. Operit AI is the Android port and implementation of Hermes, optimized for mobile, with native Android permissions, terminal, automation and UI. Operit brings the full Hermes agent stack to your pocket."
      features={{'name': 'Open Source', 'operit': true, 'competitor': true}, {'name': 'MCP Protocol Support', 'operit': true, 'competitor': true}, {'name': 'Skills System', 'operit': true, 'competitor': true}, {'name': 'Native Android App', 'operit': true, 'competitor': false}, {'name': 'Built-in Ubuntu Terminal', 'operit': true, 'competitor': false}, {'name': 'Android UI Automation', 'operit': true, 'competitor': false}, {'name': 'Local GGUF Inference', 'operit': true, 'competitor': true}, {'name': 'Subagent Delegation', 'operit': true, 'competitor': true}, {'name': 'Floating Overlay', 'operit': true, 'competitor': false}, {'name': 'Persistent Memory', 'operit': true, 'competitor': true}}
    />
  )
}
