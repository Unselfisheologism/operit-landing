import React from 'react'
import { ComparisonPage } from '../../components/ComparisonPage'

export default function OpenclawComparisonPage() {
  return (
    <ComparisonPage
      competitorName="OpenClaw AI"
      pageTitle="Operit AI vs OpenClaw AI: Comparison 2026"
      metaDescription="Operit AI vs OpenClaw.ai comparison. Compare open source AI assistants, terminal access, automation and Android support."
      lastUpdated="April 22, 2026"
      verdict="OpenClaw is an excellent desktop AI assistant that runs on Mac/Windows. Operit AI is the only one of the two that runs natively on Android, has full terminal access and device level automation. Both are fully open source."
      features=[{'name': 'Open Source', 'operit': True, 'competitor': True}, {'name': '24/7 Persistent Runtime', 'operit': True, 'competitor': True}, {'name': 'Native Android Support', 'operit': True, 'competitor': False}, {'name': 'Ubuntu Terminal Emulation', 'operit': True, 'competitor': False}, {'name': 'MCP Protocol Support', 'operit': True, 'competitor': True}, {'name': 'Local Model Execution', 'operit': True, 'competitor': True}, {'name': 'Device Level Automation', 'operit': True, 'competitor': False}, {'name': 'Floating Overlay', 'operit': True, 'competitor': False}, {'name': 'Background Cron Jobs', 'operit': True, 'competitor': True}, {'name': 'Self Hostable', 'operit': True, 'competitor': True}]
    />
  )
}
