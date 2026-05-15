import { useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════
// TWENT ANDROID APP — EXACT COLOR PALETTE FROM Color.kt + Theme.kt
// ═══════════════════════════════════════════════════════════════════════
const COLORS = {
  // Core background colors from Twent's DarkColorScheme
  bg: "#1E1E1E",               // DarkBg — main background
  surface: "#141414",          // DarkSurface — message bubbles
  surfaceVariant: "#282828",    // DarkSurfaceHigh — tool results
  surfaceHighest: "#3C3C3C",   // DarkSurfaceHighest — borders

  // Brand colors
  primary: "#F09020",          // OrangePrimary — main accent (orange)
  secondary: "#80C0F0",        // CyanPrimary — secondary accent (cyan)
  tertiary: "#809090",          // SteelPrimary — tertiary

  // Text colors
  onBg: "#B0B0B0",             // OnDarkBg — primary text on dark
  onSurfaceVariant: "#909090",  // muted text
  onPrimaryContainer: "#ffffff", // white on user bubble

  // Status colors
  success: "#4CAF50",          // green for tool results
  warning: "#F09020",          // orange for thinking/process
  error: "#FF4444",

  // Transparent variants
  primaryAlpha15: "rgba(240,144,32,0.15)",
  secondaryAlpha15: "rgba(128,192,240,0.15)",
  borderAlpha30: "rgba(128,128,128,0.3)",
};

// Tool icon map (from ToolDisplayComponents.kt getToolIcon function)
const TOOL_ICONS: Record<string, string> = {
  composio_get_toolkit_docs: "📦",
  composio_list_connections: "🔗",
  create_workflow: "⚙️",
  send_notification: "🔔",
  gmail_search: "📧",
  gmail_get_email: "📬",
  default: "⬡",
};

function getToolIcon(toolName: string): string {
  for (const [key, icon] of Object.entries(TOOL_ICONS)) {
    if (toolName.toLowerCase().includes(key)) return icon;
  }
  return TOOL_ICONS.default;
}

// ═══════════════════════════════════════════════════════════════════════
// ANIMATION SEQUENCE — 10.5 seconds total
// ═══════════════════════════════════════════════════════════════════════
const SCENARIO_MSGS = [
  // 0ms — User sends message
  {
    t: 0,
    sender: "user",
    content: "everyday at 9AM, report to me with all the actionable insights from all my newsletters.",
  },
  // 350ms — AI starts responding (empty bubble + "Response" header appears)
  {
    t: 350,
    sender: "ai-start",
    content: "",
  },
  // 600ms — Thinking bubble appears
  {
    t: 600,
    sender: "thinking",
    content: "Setting up a daily newsletter digest workflow. First I'll check the Gmail toolkit, then create a scheduled automation.",
  },
  // 1400ms — Tool call: composio_get_toolkit_docs
  {
    t: 1400,
    sender: "tool-call",
    tool: "composio_get_toolkit_docs",
    params: { toolkit_slug: "gmail" },
  },
  // 2000ms — Tool result
  {
    t: 2000,
    sender: "tool-result",
    content: "Gmail toolkit loaded — 47 tools: GMAIL_SEARCH_EMAILS, GMAIL_GET_EMAIL, GMAIL_LIST_LABELS, GMAIL_SEND_EMAIL...",
  },
  // 2700ms — Tool call: composio_list_connections
  {
    t: 2700,
    sender: "tool-call",
    tool: "composio_list_connections",
    params: {},
  },
  // 3200ms — Tool result
  {
    t: 3200,
    sender: "tool-result",
    content: "Connected: gmail_primary (OAuth, last sync: 5 min ago)",
  },
  // 3900ms — Tool call: create_workflow
  {
    t: 3900,
    sender: "tool-call",
    tool: "create_workflow",
    params: {
      trigger: "schedule",
      cron: "0 9 * * *",
      name: "Daily Newsletter Digest",
      steps: "GMAIL_SEARCH_EMAILS → AI Extract Insights → Send Notification",
    },
  },
  // 4700ms — Tool result
  {
    t: 4700,
    sender: "tool-result",
    content: "Workflow created ✓ wf_newsletter_daily — triggers at 09:00 AM daily",
  },
  // 5400ms — Tool call: send_notification
  {
    t: 5400,
    sender: "tool-call",
    tool: "send_notification",
    params: {
      title: "Newsletter Agent Active",
      body: "Daily digest scheduled. First report in 24h.",
    },
  },
  // 6000ms — Tool result
  {
    t: 6000,
    sender: "tool-result",
    content: "Notification delivered ✓",
  },
  // 6800ms — Final AI response
  {
    t: 6800,
    sender: "ai-complete",
    content: `Done! Your **Daily Newsletter Digest** workflow is now active.\n\n• Searches your Gmail for newsletter emails every morning\n• Extracts actionable insights using AI analysis\n• Sends you a notification at **9:00 AM** with a digest\n\n**Workflow:** wf_newsletter_daily | **Connection:** gmail_primary | **Next run:** Tomorrow 9:00 AM`,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// ESCAPE HTML
// ═══════════════════════════════════════════════════════════════════════
function escHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ═══════════════════════════════════════════════════════════════════════
// BUILD MESSAGE ELEMENTS
// ═══════════════════════════════════════════════════════════════════════

function buildUserMsg(content: string, ts: string): string {
  return `
  <div class="msg-user-wrap" style="
    width: 100%;
    margin-bottom: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  ">
    <div style="
      max-width: 88%;
      background: ${COLORS.surfaceVariant};
      border: 1px solid ${COLORS.borderAlpha30};
      border-radius: 8px;
      overflow: hidden;
    ">
      <div style="
        padding: 8px 14px 0;
        font-size: 10px;
        color: ${COLORS.onSurfaceVariant};
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      ">Prompt</div>
      <div style="
        padding: 6px 14px 10px;
        color: ${COLORS.onBg};
        font-size: 13.5px;
        line-height: 1.55;
        word-break: break-word;
      ">${escHtml(content)}</div>
    </div>
    <div style="
      font-size: 10px;
      color: ${COLORS.onSurfaceVariant};
      margin-top: 3px;
      padding: 0 4px;
    ">${ts}</div>
  </div>`;
}

function buildAiHeader(_provider: string = "Twen AI", model: string = "Deepseek v3"): string {
  return `<div style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px 6px;
    margin-bottom: 4px;
  ">
    <span style="font-size: 10px; color: ${COLORS.onSurfaceVariant}; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Response</span>
    <span style="font-size: 10px; color: ${COLORS.tertiary};">${model}</span>
  </div>`;
}

function buildAiStart(): string {
  return `
  <div class="msg-ai-wrap" style="
    width: 100%;
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    opacity: 0;
  ">
    ${buildAiHeader()}
    <div class="ai-bubble-typing" style="
      align-self: flex-start;
      padding: 4px 16px;
    ">
      <span style="
        display: inline-block;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: ${COLORS.tertiary};
        margin-right: 4px;
        animation: typingBounce 1.2s infinite;
      "></span>
      <span style="
        display: inline-block;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: ${COLORS.tertiary};
        margin-right: 4px;
        animation: typingBounce 1.2s infinite 0.2s;
      "></span>
      <span style="
        display: inline-block;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: ${COLORS.tertiary};
        animation: typingBounce 1.2s infinite 0.4s;
      "></span>
    </div>
  </div>`;
}

function buildThinking(content: string): string {
  return `
  <div class="msg-thinking-wrap" style="
    width: 100%;
    margin-bottom: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  ">
    <div style="
      max-width: 90%;
      background: ${COLORS.surface};
      border: 1px solid ${COLORS.borderAlpha30};
      border-left: 2px solid ${COLORS.warning};
      border-radius: 4px;
      padding: 8px 12px;
    ">
      <div style="
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 5px;
      ">
        <span style="color: ${COLORS.warning}; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;">Thinking</span>
        <span style="
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: ${COLORS.warning};
          animation: pulse 1s infinite;
        "></span>
      </div>
      <div style="
        color: ${COLORS.onSurfaceVariant};
        font-size: 11.5px;
        line-height: 1.55;
        font-style: italic;
        opacity: 0.85;
      ">${escHtml(content)}</div>
    </div>
  </div>`;
}

function buildToolCall(toolName: string, params: Record<string, string>, resultDone: boolean): string {
  const icon = getToolIcon(toolName);
  const paramsHtml = Object.keys(params).length > 0
    ? `<div style="
        margin-top: 8px;
        padding: 8px 10px;
        background: rgba(0,0,0,0.25);
        border-top: 1px solid ${COLORS.borderAlpha30};
        font-size: 11px;
        font-family: 'JetBrains Mono', 'Courier New', monospace;
      ">
        ${Object.entries(params).map(([k, v]) => `
          <div style="margin-top: 3px;">
            <span style="color: ${COLORS.secondary}; font-weight: 500;">${escHtml(k)}:</span>
            <span style="color: ${COLORS.onSurfaceVariant};"> ${escHtml(v)}</span>
          </div>
        `).join("")}
      </div>`
    : "";

  return `
  <div class="tool-call-card" style="
    width: 100%;
    margin-bottom: 5px;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.borderAlpha30};
    border-radius: 8px;
    overflow: hidden;
  ">
    <div style="
      display: flex;
      align-items: center;
      padding: 7px 12px;
      gap: 8px;
    ">
      <span style="
        color: ${COLORS.onSurfaceVariant};
        font-size: 11px;
        display: flex;
        align-items: center;
        gap: 6px;
      ">
        <span class="tool-status-dot" style="
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${resultDone ? COLORS.success : COLORS.warning};
          ${!resultDone ? "animation: pulse 1s infinite;" : ""}
        "></span>
        <span>${icon}</span>
      </span>
      <span style="
        font-size: 12px;
        font-weight: 500;
        color: ${COLORS.primary};
        font-family: 'JetBrains Mono', 'Courier New', monospace;
      ">${escHtml(toolName)}</span>
      ${paramsHtml ? `<div style="flex: 1; display: none;"></div>` : ""}
    </div>
    ${paramsHtml}
  </div>`;
}

function buildToolResult(content: string): string {
  return `
  <div class="msg-tool-result-wrap" style="
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  ">
    <div style="
      max-width: 90%;
      background: ${COLORS.surface};
      border: 1px solid ${COLORS.borderAlpha30};
      border-left: 2px solid ${COLORS.success};
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 11.5px;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      color: ${COLORS.onSurfaceVariant};
      line-height: 1.55;
    ">
      <span style="color: ${COLORS.success}; font-weight: 600;">✓</span>
      <span style="margin-left: 6px;">${escHtml(content)}</span>
    </div>
  </div>`;
}

function buildAiComplete(content: string): string {
  // Simple markdown-ish rendering: **bold**, line breaks
  const rendered = content
    .split("\n")
    .map(line => {
      // Bold: **text**
      line = line.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${COLORS.onBg};font-weight:600;">$1</strong>`);
      return line;
    })
    .join("<br>");

  return `
  <div class="msg-ai-complete-wrap" style="
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  ">
    ${buildAiHeader()}
    <div style="
      align-self: flex-start;
      max-width: 92%;
      background: ${COLORS.surface};
      border: 1px solid ${COLORS.borderAlpha30};
      border-radius: 8px;
      padding: 10px 16px 12px;
    ">
      <div style="
        color: ${COLORS.onBg};
        font-size: 13px;
        line-height: 1.65;
        word-break: break-word;
      ">${rendered}</div>
    </div>
  </div>`;
}

function buildTimestamp(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════
export function ChatAnimation() {
  const chatRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!chatRef.current || startedRef.current) return;
    startedRef.current = true;

    const chat = chatRef.current;
    const ts = buildTimestamp();

    // Inject keyframes once
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }
      @keyframes typingBounce {
        0%, 100% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(styleEl);

    function addMsg(html: string) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      const el = wrapper.firstElementChild as HTMLElement;
      if (!el) return;
      chat.appendChild(el);
      // Scroll into view
      setTimeout(() => {
        chat.scrollTop = chat.scrollHeight;
      }, 20);
      return el;
    }

    function animateIn(el: HTMLElement, delay: number) {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = el.classList.contains("tool-call-card") ? "translateX(0)" : "translateY(0)";
      }, delay);
    }

    function doneTool(el: HTMLElement) {
      // Mark status dot as green
      const dot = el.querySelector(".tool-status-dot") as HTMLElement;
      if (dot) {
        dot.style.background = COLORS.success;
        dot.style.animation = "none";
      }
    }

    // ── User message ──────────────────────────────────────────────────
    const userEl = addMsg(buildUserMsg(SCENARIO_MSGS[0].content!, ts));
    if (userEl) animateIn(userEl, 0);

    // ── AI starts (typing indicator) ─────────────────────────────────
    const aiStartEl = addMsg(buildAiStart());
    if (aiStartEl) animateIn(aiStartEl, SCENARIO_MSGS[1].t);

    // ── Thinking bubble ──────────────────────────────────────────────
    const thinkingEl = addMsg(buildThinking(SCENARIO_MSGS[2].content!));
    if (thinkingEl) animateIn(thinkingEl, SCENARIO_MSGS[2].t);

    // ── Tool call 1: composio_get_toolkit_docs ────────────────────────
    const tc1 = addMsg(buildToolCall("composio_get_toolkit_docs", { toolkit_slug: "gmail" }, false));
    if (tc1) {
      animateIn(tc1, SCENARIO_MSGS[3].t);
      animateIn(tc1, SCENARIO_MSGS[4].t - 300);
      doneTool(tc1);
    }

    // ── Tool result 1 ────────────────────────────────────────────────
    const tr1 = addMsg(buildToolResult(SCENARIO_MSGS[4].content!));
    if (tr1) animateIn(tr1, SCENARIO_MSGS[4].t);

    // ── Tool call 2: composio_list_connections ───────────────────────
    const tc2 = addMsg(buildToolCall("composio_list_connections", {}, false));
    if (tc2) {
      animateIn(tc2, SCENARIO_MSGS[5].t);
      animateIn(tc2, SCENARIO_MSGS[6].t - 300);
      doneTool(tc2);
    }

    // ── Tool result 2 ────────────────────────────────────────────────
    const tr2 = addMsg(buildToolResult(SCENARIO_MSGS[6].content!));
    if (tr2) animateIn(tr2, SCENARIO_MSGS[6].t);

    // ── Tool call 3: create_workflow ─────────────────────────────────
    const tc3 = addMsg(buildToolCall("create_workflow", {
      trigger: "schedule",
      cron: "0 9 * * *",
      name: "Daily Newsletter Digest",
      steps: "GMAIL_SEARCH_EMAILS → AI → Send Notification",
    }, false));
    if (tc3) {
      animateIn(tc3, SCENARIO_MSGS[7].t);
      animateIn(tc3, SCENARIO_MSGS[8].t - 300);
      doneTool(tc3);
    }

    // ── Tool result 3 ────────────────────────────────────────────────
    const tr3 = addMsg(buildToolResult(SCENARIO_MSGS[8].content!));
    if (tr3) animateIn(tr3, SCENARIO_MSGS[8].t);

    // ── Tool call 4: send_notification ───────────────────────────────
    const tc4 = addMsg(buildToolCall("send_notification", {
      title: "Newsletter Agent Active",
      body: "Daily digest scheduled. First report in 24h.",
    }, false));
    if (tc4) {
      animateIn(tc4, SCENARIO_MSGS[9].t);
      animateIn(tc4, SCENARIO_MSGS[10].t - 300);
      doneTool(tc4);
    }

    // ── Tool result 4 ────────────────────────────────────────────────
    const tr4 = addMsg(buildToolResult(SCENARIO_MSGS[10].content!));
    if (tr4) animateIn(tr4, SCENARIO_MSGS[10].t);

    // ── Final AI response ─────────────────────────────────────────────
    const aiCompleteEl = addMsg(buildAiComplete(SCENARIO_MSGS[11].content!));
    if (aiCompleteEl) {
      animateIn(aiCompleteEl, SCENARIO_MSGS[11].t);
      // fade out typing indicator when AI response appears
      const typing = chat.querySelector(".ai-bubble-typing") as HTMLElement;
      if (typing) {
        typing.style.transition = "opacity 0.2s";
        typing.style.opacity = "0";
      }
    }

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "0 16px 32px",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes typingBounce {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          aspectRatio: "9 / 16",
          maxHeight: "660px",
          background: COLORS.bg,
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${COLORS.surfaceHighest}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
          position: "relative",
          fontFamily: "'Roboto', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* ── Status bar ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 14px 6px",
            background: COLORS.bg,
            borderBottom: `1px solid ${COLORS.surfaceHighest}`,
            flexShrink: 0,
          }}
        >
          {/* Left: avatar + name */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* History icon placeholder */}
            <div style={{
              width: "26px", height: "26px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.onSurfaceVariant} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
              </svg>
            </div>
            {/* Avatar */}
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "700",
                color: "#fff",
              }}
            >
              T
            </div>
            {/* Name + status */}
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: COLORS.onBg }}>
                Twent AI
              </div>
              <div style={{ fontSize: "10px", color: COLORS.success }}>
                ● Online
              </div>
            </div>
          </div>

          {/* Right: provider tag */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            color: COLORS.onSurfaceVariant,
          }}>
            <span>●</span>
            <span style={{ color: COLORS.secondary }}>Deepseek v3</span>
          </div>
        </div>

        {/* ── Toolset bar ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 12px",
            background: COLORS.surface,
            borderBottom: `1px solid ${COLORS.surfaceHighest}`,
            overflowX: "auto",
            flexShrink: 0,
          }}
        >
          {[
            { label: "Android", active: true },
            { label: "Safety", active: false },
            { label: "Web", active: false },
            { label: "Skills", active: false },
          ].map(({ label, active }) => (
            <div
              key={label}
              style={{
                padding: "3px 9px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: active ? "600" : "400",
                background: active ? COLORS.primaryAlpha15 : "transparent",
                color: active ? COLORS.primary : COLORS.onSurfaceVariant,
                border: `1px solid ${active ? COLORS.primary + "44" : COLORS.surfaceHighest}`,
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >
              {label}
            </div>
          ))}
          {/* Toolsets count */}
          <div style={{
            marginLeft: "auto",
            fontSize: "10px",
            color: COLORS.onSurfaceVariant,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            6/6 toolsets
          </div>
        </div>

        {/* ── Chat area ───────────────────────────────────────────────── */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 0 8px",
            display: "flex",
            flexDirection: "column",
          }}
        />

        {/* ── Input bar ───────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            background: COLORS.surface,
            borderTop: `1px solid ${COLORS.surfaceHighest}`,
            flexShrink: 0,
          }}
        >
          {/* Plus button */}
          <div style={{
            width: "34px", height: "34px",
            borderRadius: "50%",
            background: COLORS.surfaceVariant,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.onSurfaceVariant} strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          {/* Input field */}
          <div style={{
            flex: 1,
            background: COLORS.surfaceVariant,
            borderRadius: "18px",
            padding: "9px 14px",
            fontSize: "13px",
            color: COLORS.onSurfaceVariant,
            border: `1px solid ${COLORS.surfaceHighest}`,
          }}>
            Ask Twent anything...
          </div>
          {/* Send button (disabled, decorative) */}
          <div style={{
            width: "34px", height: "34px",
            borderRadius: "50%",
            background: COLORS.primary + "33",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>

        {/* ── Bottom notch indicator ──────────────────────────────────── */}
        <div style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "4px",
          borderRadius: "2px",
          background: COLORS.surfaceHighest,
        }} />
      </div>
    </div>
  );
}