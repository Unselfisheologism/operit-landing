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
      features=[{'name': 'Open Source', 'operit': True, 'competitor': True}, {'name': 'MCP Protocol Support', 'operit': True, 'competitor': True}, {'name': 'Skills System', 'operit': True, 'competitor': True}, {'name': 'Native Android App', 'operit': True, 'competitor': False}, {'name': 'Built-in Ubuntu Terminal', 'operit': True, 'competitor': False}, {'name': 'Android UI Automation', 'operit': True, 'competitor': False}, {'name': 'Local GGUF Inference', 'operit': True, 'competitor': True}, {'name': 'Subagent Delegation', 'operit': True, 'competitor': True}, {'name': 'Floating Overlay', 'operit': True, 'competitor': False}, {'name': 'Persistent Memory', 'operit': True, 'competitor': True}]
    />
  )
}
