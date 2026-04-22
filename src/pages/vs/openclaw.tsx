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
      features={{'name': 'Open Source', 'operit': true, 'competitor': true}, {'name': '24/7 Persistent Runtime', 'operit': true, 'competitor': true}, {'name': 'Native Android Support', 'operit': true, 'competitor': false}, {'name': 'Ubuntu Terminal Emulation', 'operit': true, 'competitor': false}, {'name': 'MCP Protocol Support', 'operit': true, 'competitor': true}, {'name': 'Local Model Execution', 'operit': true, 'competitor': true}, {'name': 'Device Level Automation', 'operit': true, 'competitor': false}, {'name': 'Floating Overlay', 'operit': true, 'competitor': false}, {'name': 'Background Cron Jobs', 'operit': true, 'competitor': true}, {'name': 'Self Hostable', 'operit': true, 'competitor': true}}
    />
  )
}
