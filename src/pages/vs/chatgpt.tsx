import { ComparisonPage } from '../../components/ComparisonPage'

export default function ChatgptComparisonPage() {
  return (
    <ComparisonPage
      competitorSlug="chatgpt" competitorName="ChatGPT Android App"
      pageTitle="Operit AI vs ChatGPT Android: Full Comparison (2026)"
      metaDescription="Compare Operit AI vs ChatGPT Android app. Full feature comparison including terminal access, local models, automation and plugin support."
      lastUpdated="April 22, 2026"
      verdict="Operit AI is the clear choice for power users who need a full development environment, local AI models and Android system automation. ChatGPT is better for simple casual chat use cases."
      features={[
        { name: "Built-in Ubuntu 24 Terminal", operit: true, competitor: false },
        { name: "Local GGUF model inference", operit: true, competitor: false },
        { name: "MCP / Skill plugin ecosystem", operit: true, competitor: false },
        { name: "Android UI automation", operit: true, competitor: false },
        { name: "Persistent memory system", operit: true, competitor: true },
        { name: "Voice wake word", operit: true, competitor: false },
        { name: "Floating bubble overlay", operit: true, competitor: false },
        { name: "Character cards / personas", operit: true, competitor: false },
        { name: "Parallel tool execution", operit: true, competitor: false },
        { name: "ADB / Root integration", operit: true, competitor: false },
        { name: "Offline operation", operit: true, competitor: false },
        { name: "File system access", operit: true, competitor: true },
        { name: "Free tier available", operit: true, competitor: true },
        { name: "Open source", operit: true, competitor: false }
      ]}
    />
  )
}
