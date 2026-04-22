import React from 'react'
import { ComparisonPage } from '../../components/ComparisonPage'

export default function AnythingllmComparisonPage() {
  return (
    <ComparisonPage
      competitorName="Anything LLM"
      pageTitle="Operit AI vs Anything LLM: Comparison 2026"
      metaDescription="Compare Operit AI vs Anything LLM for Android. RAG, local models, privacy and AI assistant capabilities."
      lastUpdated="April 22, 2026"
      verdict="Anything LLM is the best open source RAG system for desktops/servers. Operit AI is built for Android, includes full terminal, automation, MCP plugins and device integration in addition to all the RAG capabilities of Anything LLM."
      features=[{'name': 'Local Model Support', 'operit': True, 'competitor': True}, {'name': 'RAG Knowledge Base', 'operit': True, 'competitor': True}, {'name': 'Open Source', 'operit': True, 'competitor': True}, {'name': 'Native Android App', 'operit': True, 'competitor': False}, {'name': 'Full Ubuntu Terminal', 'operit': True, 'competitor': False}, {'name': 'Android System Automation', 'operit': True, 'competitor': False}, {'name': 'MCP Plugins', 'operit': True, 'competitor': False}, {'name': 'Persistent Memory', 'operit': True, 'competitor': True}, {'name': 'Offline Operation', 'operit': True, 'competitor': True}, {'name': 'Floating Overlay', 'operit': True, 'competitor': False}]
    />
  )
}
