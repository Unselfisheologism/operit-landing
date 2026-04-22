import { ComparisonPage } from '../../components/ComparisonPage'

export default function NebulaComparisonPage() {
  return (
    <ComparisonPage
      competitorSlug="nebula" competitorName="Nebula.gg"
      pageTitle="Operit AI vs Nebula.gg: Full Comparison (2026)"
      metaDescription="Compare Operit AI vs Nebula.gg Android AI assistant. Features, terminal access, local models, automation capabilities."
      lastUpdated="April 22, 2026"
      verdict="Nebula.gg is a great new mobile AI assistant with good UI. Operit AI provides full Ubuntu terminal, local GGUF model support, MCP plugins and root automation that Nebula does not offer. Operit is also fully open source."
      features={[{name: 'Native Android App', operit: true, competitor: true}, {name: 'Built-in Ubuntu Terminal', operit: true, competitor: false}, {name: 'Local GGUF Inference', operit: true, competitor: false}, {name: 'MCP / Skill Plugins', operit: true, competitor: false}, {name: 'Android UI Automation', operit: true, competitor: false}, {name: 'Persistent Memory', operit: true, competitor: true}, {name: 'Floating Bubble Overlay', operit: true, competitor: true}, {name: 'Offline Operation', operit: true, competitor: false}, {name: 'Open Source', operit: true, competitor: false}, {name: 'ADB / Root Integration', operit: true, competitor: false}, {name: 'Free Tier Available', operit: true, competitor: false }]}
    />
  )
}
