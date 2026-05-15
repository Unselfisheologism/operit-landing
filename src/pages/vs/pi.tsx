import { ComparisonPage } from "../../components/ComparisonPage";

export default function PiComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="pi"
        competitorName="Pi (Inflection AI)"
        pageTitle="twent AI vs Pi (Inflection) — Empathetic Chatbot vs Action Agent (2026)"
        lastUpdated="May 15, 2026"
        verdict="Pi is an empathetic, conversational AI designed for supportive talk. twent AI is an action-oriented AI agent that actually runs tasks on your Android phone. Choose Pi for conversation; choose twent to get things done."
        metaKeywords="pi ai chatbot, inflection pi, inflection ai app, conversational ai assistant, empathetic chatbot, pi ai android, pi vs twent"
        metaDescription="Complete comparison of twent AI vs Pi by Inflection AI. Pi excels at empathetic conversation and emotional support. Twent runs real tasks, automates your Android phone, has Claude Code, MCP plugins, and a full Ubuntu terminal."
        faq={[
          {
            question: "Can Pi automate tasks on my Android phone?",
            answer: "No, Pi is a conversational AI focused on empathetic dialogue and emotional support — it cannot interact with Android UI, run terminal commands, or automate workflows. Twent is specifically designed for device automation and task execution.",
          },
          {
            question: "Is Pi free to use?",
            answer: "Yes, Pi is completely free with no subscription. Twent has a free tier with Ubuntu terminal + basic AI features, then $9.99/month for the full feature set including Claude Code, MCP plugins, and UI automation.",
          },
          {
            question: "Does Pi have a mobile app for Android?",
            answer: "Yes, Pi has Android and iOS apps but they are limited to voice and text chat. There is no terminal, no tool execution, no automation capabilities — it's a pure conversational experience.",
          },
          {
            question: "What makes Pi different from Twent?",
            answer: "Pi was designed by Inflection AI as a 'personal intelligence' — kind, empathetic, good at conversation. Twent is an AI agent OS that runs Ubuntu, executes Claude Code, automates your phone UI, supports MCP plugins, and gives you a full development environment on your device.",
          },
        ]}
        features={[
          {
            name: "Empathetic conversation / emotional support",
            twent: false,
            competitor: true,
          },
          {
            name: "Voice conversations",
            twent: true,
            competitor: true,
          },
          {
            name: "Full Ubuntu terminal",
            twent: true,
            competitor: false,
          },
          {
            name: "Android UI automation",
            twent: true,
            competitor: false,
          },
          {
            name: "Claude Code tool execution",
            twent: true,
            competitor: false,
          },
          {
            name: "MCP / Composio integrations",
            twent: true,
            competitor: false,
          },
          {
            name: "Skills and workflows marketplace",
            twent: true,
            competitor: false,
          },
          {
            name: "Floating bubble overlay",
            twent: true,
            competitor: false,
          },
          {
            name: "Local GGUF model inference (offline)",
            twent: true,
            competitor: false,
          },
          {
            name: "Persistent memory system",
            twent: true,
            competitor: false,
          },
          {
            name: "Completely free",
            twent: false,
            competitor: true,
          },
          {
            name: "Privacy BYOK model",
            twent: true,
            competitor: false,
          },
          {
            name: "Multi-platform (Web + iOS + Android)",
            twent: true,
            competitor: true,
          },
        ]}
      />
    </div>
  );
}
