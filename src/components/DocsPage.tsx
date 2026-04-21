import { useState, useEffect } from "react";

/* ──────────────────────────────────────────────
   Twent Docs — inline documentation page
   ────────────────────────────────────────────── */

interface DocSection {
  id: string;
  label: string;
}

interface DocCategory {
  title: string;
  sections: DocSection[];
}

const sidebar: DocCategory[] = [
  {
    title: "Getting Started",
    sections: [
      { id: "installation", label: "Installation" },
      { id: "first-setup", label: "First Setup" },
      { id: "first-chat", label: "Your First Chat" },
      { id: "permissions", label: "Permissions" },
    ],
  },
  {
    title: "Chat",
    sections: [
      { id: "chat-overview", label: "Overview" },
      { id: "chat-styles", label: "Chat Styles" },
      { id: "floating-chat", label: "Floating Chat" },
    ],
  },
  {
    title: "Tools",
    sections: [
      { id: "tools-overview", label: "Overview" },
      { id: "file-system", label: "File System" },
      { id: "shell", label: "Shell & Terminal" },
      { id: "web", label: "Web Tools" },
      { id: "media", label: "Media Tools" },
      { id: "ui-automation", label: "UI Automation" },
      { id: "javascript", label: "JavaScript" },
      { id: "mcp", label: "MCP Tools" },
    ],
  },
  {
    title: "Automation",
    sections: [
      { id: "automation-overview", label: "Overview" },
      { id: "tasker", label: "Tasker Integration" },
    ],
  },
  {
    title: "Packages",
    sections: [
      { id: "packages-overview", label: "Overview" },
      { id: "skills", label: "Skills" },
      { id: "marketplace", label: "Marketplace" },
    ],
  },
  {
    title: "Workflows",
    sections: [
      { id: "workflows-overview", label: "Overview" },
      { id: "workflow-examples", label: "Examples" },
    ],
  },
  {
    title: "More",
    sections: [
      { id: "memory", label: "Memory" },
      { id: "voice", label: "Voice" },
      { id: "settings", label: "Settings" },
      { id: "toolbox", label: "Toolbox" },
      { id: "tool-reference", label: "Tool Reference" },
    ],
  },
];

/* ──────── Reusable markdown-ish renderers ──────── */

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-100">
      {children}
    </h1>
  );
}
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-semibold mt-10 mb-3 text-zinc-800 dark:text-zinc-200 scroll-mt-24"
    >
      {children}
    </h2>
  );
}
function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-lg font-medium mt-6 mb-2 text-zinc-700 dark:text-zinc-300 scroll-mt-24"
    >
      {children}
    </h3>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4 tracking-wide">
      {children}
    </p>
  );
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 font-mono">
      {children}
    </code>
  );
}
function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="text-xs p-4 rounded-lg bg-zinc-950 text-zinc-100 font-mono overflow-x-auto mb-4 border border-zinc-800">
      {children}
    </pre>
  );
}
function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </ul>
  );
}
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="text-xs w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-zinc-100 dark:border-zinc-800"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="py-2 px-3 text-zinc-600 dark:text-zinc-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ──────── Doc content sections ──────── */

function DocInstallation() {
  return (
    <section>
      <H1>Installation</H1>
      <P>
        Twent runs on <strong>Android 8.0+</strong> (API 26).
      </P>
      <H2 id="download">Download</H2>
      <P>
        Get the latest release from{" "}
        <a
          href="https://twent.xyz"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          twent.xyz
        </a>
        . The APK is ~80MB and includes the main app, Ubuntu 24 environment,
        local speech recognition (Sherpa-NCNN), and FFmpeg.
      </P>
      <H2 id="requirements">System Requirements</H2>
      <Table
        headers={["Requirement", "Minimum"]}
        rows={[
          ["Android version", "8.0 (API 26)"],
          ["RAM", "3GB recommended"],
          ["Storage", "500MB+ free"],
          ["Architecture", "arm64-v8a"],
        ]}
      />
      <P>
        <strong>Note:</strong> Twent is completely free. If someone asks you to
        pay for it, it's a scam.
      </P>
    </section>
  );
}

function DocFirstSetup() {
  return (
    <section>
      <H1>First Setup</H1>
      <P>
        After installing Twent, configure an AI model to talk to. Twent supports
        NVIDIA NIMS, Kilo Gateway, OpenAI, Claude, Deepseek, Gemini, OpenRouter,
        LM Studio, local models (MNN/llama.cpp) and many more.
      </P>
      <H2 id="api-key">Setting up your API key</H2>
      <UL>
        <li>
          Open Twent → <Code>Settings</Code> →{" "}
          <Code>Model & Parameters Configuration</Code>
        </li>
        <li>Tap your provider of choice</li>
        <li>Enter your API key</li>
        <li>
          Select a model (e.g. <Code>gpt-4o</Code>,{" "}
          <Code>claude-sonnet-4-20250514</Code>)
        </li>
      </UL>
      <H2 id="local-models">Local Models</H2>
      <P>
        Run AI completely offline by downloading GGUF or MNN models directly
        on-device. Go to{" "}
        <Code>Settings → Model & Parameters Configuration → Local Model</Code>.
      </P>
      <H2 id="recommended">Recommended Models</H2>
      <Table
        headers={["Provider", "Model"]}
        rows={[
          ["OpenAI", "gpt-5.4"],
          ["Claude", "claude-opus-4.6"],
          ["OpenRouter", "minimax/minimax-m2.7"],
        ]}
      />
    </section>
  );
}

function DocFirstChat() {
  return (
    <section>
      <H1>Your First Chat</H1>
      <P>
        Open the chat screen and type a message. The AI can answer questions,
        run commands, browse the web, manage files, and automate UI
        interactions.
      </P>
      <H2 id="try-things">Try these</H2>
      <Pre>{`What's the weather today?
Create a calorie tracker mini app
Run ls -la in my home directory
Search for the latest AI news`}</Pre>
      <H2 id="tool-calls">Tool Calls</H2>
      <P>
        When the AI uses a tool (running a command, reading a file, etc.), you
        see it happen in real time as expandable cards showing the tool name,
        parameters, and results.
      </P>
      <H2 id="message-actions">Message Actions</H2>
      <P>
        Long-press any message to <strong>Copy</strong>, <strong>Edit</strong>{" "}
        &amp; resend, <strong>Branch</strong> the conversation, or{" "}
        <strong>Delete</strong>.
      </P>
    </section>
  );
}

function DocPermissions() {
  return (
    <section>
      <H1>Permissions</H1>
      <P>
        Twent uses Android's permission system to give AI access to device
        capabilities.
      </P>
      <H2 id="required">Required</H2>
      <UL>
        <li>
          <strong>Storage</strong> — file management, reading/writing documents
        </li>
        <li>
          <strong>Network</strong> — API calls, web browsing, MCP connections
        </li>
      </UL>
      <H2 id="optional">Optional (Recommended)</H2>
      <UL>
        <li>
          <strong>Accessibility</strong> — UI automation (tap, swipe, read
          screen). The most powerful permission.
        </li>
        <li>
          <strong>Display Over Other Apps</strong> — floating chat, screen
          capture
        </li>
        <li>
          <strong>Media Projection</strong> — screenshot capture for visual
          automation
        </li>
      </UL>
      <H2 id="advanced">Advanced</H2>
      <Table
        headers={["Permission", "Enables", "Risk"]}
        rows={[
          ["Storage", "Read/write files", "Low"],
          ["Network", "API calls, web", "Low"],
          ["Accessibility", "UI automation", "Medium"],
          ["ADB", "System commands", "Medium"],
          ["Root", "Full system", "High"],
        ]}
      />
    </section>
  );
}

function DocChatOverview() {
  return (
    <section>
      <H1>Chat</H1>
      <P>
        The chat screen is where you interact with your AI assistant. Messages
        stream in word-by-word, tool calls are visible in real time, and all
        conversations are saved locally.
      </P>
      <H2 id="features">Key Features</H2>
      <UL>
        <li>
          <strong>Streaming responses</strong> — no waiting for full replies
        </li>
        <li>
          <strong>Tool transparency</strong> — see every tool call, parameters,
          and results
        </li>
        <li>
          <strong>Conversation management</strong> — edit, branch, lock,
          auto-summarize
        </li>
        <li>
          <strong>Shared content</strong> — share files/links from other apps
        </li>
        <li>
          <strong>Markdown rendering</strong> — code blocks, tables, LaTeX,
          Mermaid diagrams
        </li>
      </UL>
      <H2 id="context">Context Window</H2>
      <P>
        The AI sees your recent conversation history. For long conversations,
        Twent auto-summarizes older messages. Configure in{" "}
        <Code>Settings → Context &amp; Summary</Code>.
      </P>
    </section>
  );
}

function DocChatStyles() {
  return (
    <section>
      <H1>Chat Styles</H1>
      <P>Two display modes and extensive visual customization.</P>
      <H2 id="modes">Display Modes</H2>
      <UL>
        <li>
          <strong>Cursor style</strong> — character-by-character streaming with
          blinking cursor
        </li>
        <li>
          <strong>Bubble style</strong> — traditional chat bubbles with avatars
        </li>
      </UL>
      <H2 id="customize">Customization</H2>
      <P>
        Set custom wallpapers, adjust colors for light/dark themes, change font
        sizes and message spacing, and configure code block styling. Go to{" "}
        <Code>Settings → Theme</Code>.
      </P>
    </section>
  );
}

function DocFloatingChat() {
  return (
    <section>
      <H1>Floating Chat</H1>
      <P>
        Use Twent in a floating overlay while doing other things. The AI can see
        your screen and interact with any app.
      </P>
      <H2 id="modes">Modes</H2>
      <UL>
        <li>
          <strong>Bubble</strong> — small draggable bubble that expands on tap
        </li>
        <li>
          <strong>Window</strong> — resizable chat window
        </li>
        <li>
          <strong>Fullscreen</strong> — full-screen overlay
        </li>
      </UL>
      <H2 id="use-cases">Use Cases</H2>
      <P>
        Get help with what's on screen, ask AI to fill forms, debug while
        reading errors, translate text from any app.
      </P>
    </section>
  );
}

function DocToolsOverview() {
  return (
    <section>
      <H1>Tools</H1>
      <P>
        40+ built-in tools give AI real capabilities on your device. Every tool
        call is transparent — you always see what's happening.
      </P>
      <Table
        headers={["Category", "What it does"]}
        rows={[
          ["File System", "Read, write, search, compress files"],
          ["Shell", "Run Linux commands, install packages"],
          ["Web", "Fetch pages, search, download"],
          ["Media", "FFmpeg, camera, OCR, TTS/STT"],
          ["UI Automation", "Tap, swipe, type, screenshot"],
          ["JavaScript", "Run JS/TS with Node.js"],
          ["MCP", "Tools from MCP servers"],
        ]}
      />
      <H2 id="parallel">Parallel Execution</H2>
      <P>
        Read-only tools run in parallel automatically — multiple file reads,
        network checks, and device info queries execute simultaneously for
        faster responses.
      </P>
    </section>
  );
}

function DocFileSystem() {
  return (
    <section>
      <H1>File System Tools</H1>
      <P>
        Read, write, search, and manage files on your device and in the built-in
        Ubuntu environment.
      </P>
      <H2 id="tools">Available Tools</H2>
      <Table
        headers={["Tool", "Description"]}
        rows={[
          ["read_file", "Read file contents (with offset/limit)"],
          ["write_file", "Write content to a file (creates dirs)"],
          ["patch", "Find-and-replace edits in a file"],
          ["search_files", "Search inside files or find by name"],
          ["compress/decompress", "ZIP, TAR, GZ operations"],
        ]}
      />
      <H2 id="locations">File Locations</H2>
      <Table
        headers={["Location", "Path"]}
        rows={[
          ["App data", "/data/data/com.ai.assistance.operit/"],
          ["Internal storage", "/sdcard/ or /storage/emulated/0/"],
          ["Ubuntu environment", "~/ (inside built-in Linux)"],
        ]}
      />
    </section>
  );
}

function DocShell() {
  return (
    <section>
      <H1>Shell &amp; Terminal</H1>
      <P>
        Full Ubuntu 24 environment on your phone — apt, Python, Node.js, vim,
        Git, everything.
      </P>
      <H2 id="tools">Shell Tools</H2>
      <Table
        headers={["Tool", "Description"]}
        rows={[["terminal", "Execute commands (supports background, PTY)"]]}
      />
      <H2 id="packages">Package Management</H2>
      <Pre>{`apt update
apt install python3-pip
pip install requests
npm install -g typescript`}</Pre>
      <H2 id="permission-levels">Permission Levels</H2>
      <Table
        headers={["Level", "Access"]}
        rows={[
          ["Standard", "Android shell"],
          ["ADB", "pm, am, dumpsys"],
          ["Root", "Full su access"],
          ["Shizuku", "Elevated without root"],
        ]}
      />
    </section>
  );
}

function DocWeb() {
  return (
    <section>
      <H1>Web Tools</H1>
      <P>Browse the web, search, and download content.</P>
      <Table
        headers={["Tool", "Description"]}
        rows={[
          ["fetch_url", "Fetch URL content as markdown"],
          ["search", "DuckDuckGo, Tavily, Bing, Scholar"],
          ["download_file", "Download files"],
          ["web_visit", "Built-in browser with JS execution"],
        ]}
      />
    </section>
  );
}

function DocMedia() {
  return (
    <section>
      <H1>Media Tools</H1>
      <P>
        Full FFmpeg, camera, OCR, image analysis, and speech processing built
        right in.
      </P>
      <H2 id="ffmpeg">FFmpeg Engine</H2>
      <UL>
        <li>Convert formats, extract audio, trim, merge</li>
        <li>Extract frames, add subtitles, adjust quality</li>
      </UL>
      <H2 id="stt">Speech-to-Text</H2>
      <Table
        headers={["Engine", "Type"]}
        rows={[
          ["Sherpa-NCNN", "Local/offline"],
          ["HTTP STT", "Cloud-based"],
        ]}
      />
      <H2 id="tts">Text-to-Speech</H2>
      <Table
        headers={["Engine", "Type"]}
        rows={[
          ["System TTS", "Built-in Android"],
          ["OpenAI TTS", "Cloud, high quality"],
          ["SiliconFlow TTS", "Cloud, Chinese voices"],
        ]}
      />
    </section>
  );
}

function DocUIAutomation() {
  return (
    <section>
      <H1>UI Automation</H1>
      <P>
        The most powerful feature — the AI can see your screen and interact with
        any app via tapping, swiping, and reading the UI tree.
      </P>
      <H2 id="tools">Tools</H2>
      <Table
        headers={["Tool", "Description"]}
        rows={[
          ["tap", "Tap a UI element by reference ID"],
          ["swipe", "Swipe gesture with coordinates"],
          ["scroll", "Scroll up/down/left/right"],
          ["type", "Type text into a field"],
          ["screenshot", "Capture the screen"],
          ["get_ui_tree", "Get full UI element hierarchy"],
          ["press_key", "Back, Home, Volume, etc."],
          ["open_app", "Launch an app by package name"],
        ]}
      />
      <H2 id="dual-pipeline">Dual Pipeline</H2>
      <P>
        Twent uses both the Accessibility UI tree AND visual screenshots to
        understand your screen. Every tool call automatically captures screen
        context before executing.
      </P>
      <H2 id="permission-levels">Permission Levels</H2>
      <Table
        headers={["Mode", "Requirement", "Capability"]}
        rows={[
          ["Accessibility", "Enable service", "Tap, type, scroll, read UI"],
          ["ADB", "USB debugging", "System-level automation"],
          ["Root", "Rooted device", "Full access"],
          ["Shizuku", "Shizuku running", "Elevated without root"],
        ]}
      />
    </section>
  );
}

function DocJavaScript() {
  return (
    <section>
      <H1>JavaScript Tools</H1>
      <P>
        Built-in JS engine for running custom code. Supports file I/O, HTTP,
        JSON, math, and npm packages.
      </P>
      <Table
        headers={["Tool", "Description"]}
        rows={[["execute_code", "Run Python code"]]}
      />
      <P>Install npm packages via the shell, then import them in scripts:</P>
      <Pre>{`cd /data/data/com.ai.assistance.operit/files/js
npm install axios lodash`}</Pre>
    </section>
  );
}

function DocMCP() {
  return (
    <section>
      <H1>MCP Tools</H1>
      <P>
        Model Context Protocol — a standard for giving AI access to external
        tools. Install MCP servers and the AI gets new capabilities.
      </P>
      <H2 id="installing">Installing</H2>
      <UL>
        <li>
          Browse <Code>Plugins → MCP → Shop Icon</Code>
        </li>
        <li>Or add manually via JSON config</li>
      </UL>
      <H2 id="popular">Popular Servers</H2>
      <Table
        headers={["Server", "What it does"]}
        rows={[
          ["Filesystem", "Extended file operations"],
          ["Git", "Repository management"],
          ["SQLite", "Query databases"],
          ["Brave Search", "Web search"],
          ["Puppeteer", "Browser automation"],
        ]}
      />
    </section>
  );
}

function DocAutomation() {
  return (
    <section>
      <H1>Automation</H1>
      <P>
        Twent automates anything on Android — UI automation, shell commands,
        intents, and workflows.
      </P>
      <H2 id="methods">Methods</H2>
      <UL>
        <li>
          <strong>UI Automation</strong> — control any app by tapping/swiping
        </li>
        <li>
          <strong>Shell</strong> — run Linux commands and scripts
        </li>
        <li>
          <strong>Intents</strong> — launch apps, send broadcasts
        </li>
        <li>
          <strong>Workflows</strong> — multi-step automations with triggers
        </li>
      </UL>
    </section>
  );
}

function DocTasker() {
  return (
    <section>
      <H1>Tasker Integration</H1>
      <P>
        Connect Twent with the Tasker automation app for advanced scenarios.
        Twent registers as a Tasker plugin — you can trigger Twent from Tasker
        and vice versa.
      </P>
      <H2 id="setup">Setup</H2>
      <UL>
        <li>Install Tasker from Play Store</li>
        <li>
          Enable in <Code>Settings → Integrations → Tasker</Code>
        </li>
      </UL>
      <H2 id="example">Example: Battery Monitor</H2>
      <P>
        Tasker profile: Battery &lt; 20% → sends to Twent: "My battery is at
        20%. Check what apps are draining it." Twent analyzes and gives
        recommendations.
      </P>
    </section>
  );
}

function DocPackages() {
  return (
    <section>
      <H1>Packages</H1>
      <P>
        Extension system for Twent — bundles tools, dependencies, and
        configuration into installable units.
      </P>
      <H2 id="structure">Package Structure</H2>
      <Pre>{`my-package/
├── package.json       # Metadata
├── tools/index.ts     # Tool definitions
├── scripts/           # Helper scripts
└── assets/            # Static data`}</Pre>
      <H2 id="installing">Installing</H2>
      <UL>
        <li>
          From the marketplace: <Code>Settings → Packages → Marketplace</Code>
        </li>
        <li>Manual: import ZIP or directory</li>
        <li>Via URL: the AI can install packages for you</li>
      </UL>
    </section>
  );
}

function DocSkills() {
  return (
    <section>
      <H1>Skills</H1>
      <P>
        Pre-configured behavior bundles that teach the AI how to do specific
        tasks — includes system prompts, tools, workflows, and assets.
      </P>
      <H2 id="how">How Skills Work</H2>
      <P>
        When you ask something, Twent checks if any installed skill is relevant.
        If so, it loads that skill's prompts and tools to handle the request.
      </P>
      <H2 id="popular">Popular Skills</H2>
      <Table
        headers={["Skill", "What it does"]}
        rows={[
          ["Code Review", "Analyze code for bugs and security"],
          ["Data Analysis", "Process CSVs, generate charts"],
          ["Writing Assistant", "Help with writing tasks"],
          ["Research", "Deep research on topics"],
        ]}
      />
    </section>
  );
}

function DocMarketplace() {
  return (
    <section>
      <H1>Marketplace</H1>
      <P>
        Browse and install community-built packages, skills, and MCP servers.
      </P>
      <H2 id="sections">Sections</H2>
      <UL>
        <li>
          <strong>Packages</strong> — JS/TS tool bundles
        </li>
        <li>
          <strong>Skills</strong> — AI behavior bundles
        </li>
        <li>
          <strong>MCP Servers</strong> — external tool providers
        </li>
      </UL>
      <H2 id="publishing">Publishing</H2>
      <P>
        Share your creations via <Code>Settings → Packages → Publish</Code>.
        Items are stored and indexed automatically.
      </P>
    </section>
  );
}

function DocWorkflows() {
  return (
    <section>
      <H1>Workflows</H1>
      <P>Multi-step automations combining triggers, conditions, and actions.</P>
      <H2 id="types">Workflow Types</H2>
      <UL>
        <li>
          <strong>Simple</strong> — one trigger, one action
        </li>
        <li>
          <strong>Chained</strong> — multiple actions in sequence
        </li>
        <li>
          <strong>Conditional</strong> — if/else branching
        </li>
        <li>
          <strong>Scheduled</strong> — run on a schedule
        </li>
      </UL>
      <H2 id="triggers">Trigger Types</H2>
      <Table
        headers={["Trigger", "Description"]}
        rows={[
          ["Schedule", "Cron-based timing"],
          ["Interval", "Every N minutes/hours"],
          ["App Launch", "When an app opens"],
          ["Notification", "On incoming notification"],
          ["Battery", "On battery level change"],
          ["Wake Word", "Voice trigger phrase"],
        ]}
      />
    </section>
  );
}

function DocWorkflowExamples() {
  return (
    <section>
      <H1>Workflow Examples</H1>
      <H2 id="morning">Morning Briefing</H2>
      <P>
        Trigger: Daily at 7:30am. Steps: get calendar events → get weather → AI
        summarizes → send notification.
      </P>
      <H2 id="backup">File Backup</H2>
      <P>
        Trigger: Daily at midnight. Steps: list files → compress → upload to
        cloud → notify.
      </P>
      <H2 id="battery">Low Battery Alert</H2>
      <P>
        Trigger: Battery below 15%. Steps: get battery details → get running
        apps → AI recommends which to close → notify.
      </P>
    </section>
  );
}

function DocMemory() {
  return (
    <section>
      <H1>Memory</H1>
      <P>
        Persistent knowledge storage that survives across conversations. The AI
        remembers your preferences, past discussions, and important information.
      </P>
      <H2 id="types">Memory Types</H2>
      <UL>
        <li>
          <strong>User Preferences</strong> — communication style, apps,
          contacts
        </li>
        <li>
          <strong>Conversation Summaries</strong> — key decisions and action
          items
        </li>
        <li>
          <strong>Knowledge Base</strong> — notes, reference material, research
        </li>
      </UL>
      <H2 id="tools">Memory Tools</H2>
      <Table
        headers={["Tool", "Description"]}
        rows={[
          ["memory_search", "Search across all memories"],
          ["memory_save", "Save new information"],
          ["memory_update", "Update existing memories"],
          ["memory_link", "Create relationships between memories"],
        ]}
      />
      <P>
        All memories are stored <strong>locally</strong> on your device. Nothing
        leaves your device except API calls.
      </P>
    </section>
  );
}

function DocVoice() {
  return (
    <section>
      <H1>Voice</H1>
      <P>
        Speak to your AI and hear it respond. Supports TTS, STT, wake word
        detection, and hands-free conversation mode.
      </P>
      <H2 id="tts">Text-to-Speech Engines</H2>
      <Table
        headers={["Engine", "Type"]}
        rows={[
          ["System TTS", "Built-in Android"],
          ["OpenAI TTS", "Cloud, 50+ languages"],
          ["SiliconFlow TTS", "Cloud, Chinese/English"],
        ]}
      />
      <H2 id="stt">Speech-to-Text Engines</H2>
      <Table
        headers={["Engine", "Offline"]}
        rows={[
          ["Sherpa-NCNN", "Yes"],
          ["HTTP STT", "No"],
        ]}
      />
      <H2 id="wake-word">Wake Word</H2>
      <P>
        Set a custom trigger phrase in{" "}
        <Code>Settings → Speech Services → Wake Word</Code>. The device listens
        for the phrase and starts recording your command.
      </P>
    </section>
  );
}

function DocSettings() {
  return (
    <section>
      <H1>Settings</H1>
      <P>Deep customization — every aspect of Twent is configurable.</P>
      <H2 id="sections">Settings Sections</H2>
      <Table
        headers={["Section", "What it covers"]}
        rows={[
          ["Quick Setup", "Agent theme, model config, prompts"],
          ["Interface", "Theme, display, language, layout"],
          ["Intelligence", "API usage, context, summarization"],
          ["Data", "Chat sessions, backup, custom headers"],
          ["System", "Speech, tool permissions, power user mode"],
        ]}
      />
      <H2 id="models">Model Configuration</H2>
      <P>
        Support for OpenAI, Claude, Gemini, OpenRouter, LM Studio, and local
        MNN/llama.cpp models. Configure temperature, max tokens, and other
        parameters per model.
      </P>
      <H2 id="themes">Themes</H2>
      <P>
        Full visual customization — colors, fonts, spacing, wallpapers. Create
        custom themes and share them. Configure at <Code>Settings → Theme</Code>
        .
      </P>
    </section>
  );
}

function DocToolbox() {
  return (
    <section>
      <H1>Toolbox</H1>
      <P>
        Built-in utility screens for debugging, development, and system
        management.
      </P>
      <H2 id="dev">Development Tools</H2>
      <UL>
        <li>
          <strong>Shell Executor</strong> — run commands directly
        </li>
        <li>
          <strong>Terminal</strong> — full terminal emulator
        </li>
        <li>
          <strong>File Manager</strong> — browse device files
        </li>
        <li>
          <strong>SQL Viewer</strong> — query SQLite databases
        </li>
      </UL>
      <H2 id="system">System Tools</H2>
      <UL>
        <li>
          <strong>Logcat Viewer</strong> — Android system logs
        </li>
        <li>
          <strong>UI Debugger</strong> — inspect UI hierarchy
        </li>
        <li>
          <strong>Tool Tester</strong> — test individual tools
        </li>
      </UL>
      <P>
        Access via <Code>Settings → Toolbox</Code>.
      </P>
    </section>
  );
}

function DocToolReference() {
  return (
    <section>
      <H1>Tool Reference</H1>
      <P>Complete parameter reference for all built-in tools.</P>
      <H2 id="read-file">read_file</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[
          ["path", "string", "Yes", "File path"],
          ["offset", "number", "No", "Start line (1-indexed)"],
          ["limit", "number", "No", "Max lines (default: 500)"],
        ]}
      />
      <H2 id="write-file">write_file</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[
          ["path", "string", "Yes", "File path"],
          ["content", "string", "Yes", "Content to write"],
        ]}
      />
      <H2 id="terminal">terminal</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[
          ["command", "string", "Yes", "Command to run"],
          ["timeout", "number", "No", "Max seconds"],
          ["workdir", "string", "No", "Working directory"],
          ["background", "boolean", "No", "Run in background"],
          ["pty", "boolean", "No", "Interactive mode"],
        ]}
      />
      <H2 id="tap">tap</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[["ref", "string", "Yes", "Element reference ID (@e5)"]]}
      />
      <H2 id="swipe">swipe</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[
          ["startX", "number", "Yes", "Start X"],
          ["startY", "number", "Yes", "Start Y"],
          ["endX", "number", "Yes", "End X"],
          ["endY", "number", "Yes", "End Y"],
          ["duration", "number", "No", "Duration in ms"],
        ]}
      />
      <H2 id="type">type</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[
          ["text", "string", "Yes", "Text to type"],
          ["ref", "string", "No", "Element to type into"],
        ]}
      />
      <H2 id="scroll">scroll</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[["direction", "string", "Yes", "up, down, left, right"]]}
      />
      <H2 id="press-key">press_key</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[["key", "string", "Yes", "back, home, volume_up, etc."]]}
      />
      <H2 id="open-app">open_app</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[["packageName", "string", "Yes", "Android package name"]]}
      />
      <H2 id="fetch-url">fetch_url</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[
          ["url", "string", "Yes", "URL to fetch"],
          ["max_length", "number", "No", "Max characters"],
        ]}
      />
      <H2 id="memory-search">memory_search</H2>
      <Table
        headers={["Param", "Type", "Required", "Description"]}
        rows={[
          ["query", "string", "Yes", "Search query"],
          ["limit", "number", "No", "Max results"],
        ]}
      />
    </section>
  );
}

/* ──────── Section map ──────── */

const sectionComponents: Record<string, React.FC> = {
  installation: DocInstallation,
  "first-setup": DocFirstSetup,
  "first-chat": DocFirstChat,
  permissions: DocPermissions,
  "chat-overview": DocChatOverview,
  "chat-styles": DocChatStyles,
  "floating-chat": DocFloatingChat,
  "tools-overview": DocToolsOverview,
  "file-system": DocFileSystem,
  shell: DocShell,
  web: DocWeb,
  media: DocMedia,
  "ui-automation": DocUIAutomation,
  javascript: DocJavaScript,
  mcp: DocMCP,
  "automation-overview": DocAutomation,
  tasker: DocTasker,
  "packages-overview": DocPackages,
  skills: DocSkills,
  marketplace: DocMarketplace,
  "workflows-overview": DocWorkflows,
  "workflow-examples": DocWorkflowExamples,
  memory: DocMemory,
  voice: DocVoice,
  settings: DocSettings,
  toolbox: DocToolbox,
  "tool-reference": DocToolReference,
};

/* ──────── Main Docs Page ──────── */

export function DocsPage({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [active, setActive] = useState("installation");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // read hash on mount
    const hash = window.location.hash.slice(1);
    if (hash && sectionComponents[hash]) setActive(hash);

    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (h && sectionComponents[h]) setActive(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const Section = sectionComponents[active] || DocInstallation;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* ── Docs header ── */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <a href="/" className="flex items-center gap-2">
              <img src="/OKFINALTWENTLOGO-removebg.png" alt="Twent" className="w-12 h-12 object-contain" />
              <span className="font-bold text-sm">Twent Docs</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            {/* Minecraft theme toggle */}
            <label className="relative inline-block w-[4em] h-[2em] cursor-pointer">
              <input
                type="checkbox"
                checked={dark}
                onChange={onToggle}
                className="opacity-0 w-0 h-0"
              />
              <span className="absolute inset-0 bg-zinc-300 dark:bg-zinc-600 transition-colors duration-400" />
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIG/8QAIxAAAgIABQQDAAAAAAAAAAAAAQMCBAAREiExBUFRcROBsf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAWEQADAAAAAAAAAAAAAAAAAAAAEiL/2gAMAwEAAhEDEQA/AMBTp03dNglMVuttjqnKQ2UPOfntkOThbqVVUJ12BKnogZQZpy+Ucc8knwePWJrWqyqEHVmrTahEBqpbBoAH1n635wt3a9mjN1p8X2pw0qVEbKB/CO/c4OphSVP/2Q=="
                alt="Light"
                className="absolute top-0 left-0 h-[2em] w-[2em] transition-all duration-400 image-rendering-pixelated"
                style={{
                  opacity: dark ? 0 : 1,
                  transform: dark ? "translateX(2em)" : "translateX(0)",
                }}
              />
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIEBf/EACMQAAEDAwQDAQEAAAAAAAAAAAQBAgUDESEAEjFBBlFhMkL/xAAUAQEAAAAAAAAAAAAAAAAAAAAF/8QAGBEAAwEBAAAAAAAAAAAAAAAAABIiMUH/2gAMAwEAAhEDEQA/AM+Bg4mS8coRccMOdNG01qVyH/kRvHPKKmMdr8uujPwUTG+NkRpw1AKWCbvHKa2zTGphc9u9p0q+rLqeMl4kSCGkYgtoE0HTahIz3bWGNanPrdyqWzn7p5ibh5CArnyZNMyVLpK0QSkt2BNXtVX+7ol1wuLJiyaHt+6Kyp//2Q=="
                alt="Dark"
                className="absolute top-0 left-0 h-[2em] w-[2em] transition-all duration-400 image-rendering-pixelated"
                style={{
                  opacity: dark ? 1 : 0,
                  transform: dark ? "translateX(2em)" : "translateX(0)",
                }}
              />
            </label>
            <a
              href="/"
              className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Home
            </a>
            <a
              href="https://twent.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white text-xs font-secondary uppercase tracking-wider hover:bg-orange-500 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* ── Sidebar ── */}
        <aside
          className={`fixed lg:sticky top-14 z-40 w-64 h-[calc(100vh-3.5rem)] overflow-y-auto bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-transform lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="p-4 space-y-6">
            {sidebar.map((cat) => (
              <div key={cat.title}>
                <h4 className="text-[10px] font-secondary uppercase tracking-[0.2em] text-orange-500 mb-2">
                  {cat.title}
                </h4>
                <ul className="space-y-0.5">
                  {cat.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={() => {
                          setActive(s.id);
                          setSidebarOpen(false);
                        }}
                        className={`block text-xs py-1.5 px-2 rounded tracking-wide transition-colors ${
                          active === s.id
                            ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-medium"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Content ── */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 py-10">
          <div className="max-w-3xl">
            <Section />
          </div>
        </main>
      </div>
    </div>
  );
}
