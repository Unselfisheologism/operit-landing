import { useEffect, useRef } from "react";

// Color palette matching the Android AI Chat page
const COLORS = {
  bg: "#09090b",           // zinc-950 (dark background)
  surface: "#18181b",      // zinc-900 (AI message bg)
  surfaceVariant: "#27272a",// zinc-800 (tool result bg)
  primaryContainer: "#3b82f6", // blue primaryContainer (user message bg)
  onPrimaryContainer: "#ffffff", // white text on user messages
  onSurface: "#f4f4f5",     // zinc-100 (AI text)
  onSurfaceVariant: "#a1a1aa", // zinc-400 (secondary text)
  border: "#3f3f46",        // zinc-700
  success: "#22c55e",       // green
  warning: "#f97316",       // orange
  toolBg: "#18181b",
  toolText: "#a1a1aa",
  toolAccent: "#3b82f6",
  thinkingBg: "#27272a",
  thinkingText: "#a1a1aa",
};

interface ToolCall {
  id: string;
  name: string;
  params?: Record<string, string>;
  result?: string;
  status?: "loading" | "success" | "done";
}

const SCENARIO: {
  messages: Array<{
    sender: "user" | "ai" | "thinking" | "tool-call" | "tool-result";
    content: string;
    timestamp?: number;
    toolCalls?: ToolCall[];
  }>;
  duration: number;
} = {
  duration: 10500,
  messages: [
    {
      sender: "user",
      content: "everyday at 9AM, report to me with all the actionable insights from all my newsletters.",
      timestamp: 0,
    },
    {
      sender: "ai",
      content: "",
      timestamp: 300,
    },
    {
      sender: "thinking",
      content: "The user wants a daily automated newsletter summary. I'll set up a scheduled workflow using Composio's Gmail toolkit to fetch newsletter emails and deliver insights.",
      timestamp: 600,
    },
    {
      sender: "tool-call",
      content: "composio_get_toolkit_docs",
      timestamp: 1400,
      toolCalls: [
        {
          id: "1",
          name: "composio_get_toolkit_docs",
          params: { toolkit_slug: "gmail" },
          status: "loading",
        },
      ],
    },
    {
      sender: "tool-result",
      content: "Gmail toolkit loaded — found 47 tools including GMAIL_SEARCH_EMAILS, GMAIL_GET_EMAIL, GMAIL_LIST_LABELS",
      timestamp: 2200,
    },
    {
      sender: "tool-call",
      content: "composio_list_connections",
      timestamp: 2900,
      toolCalls: [
        {
          id: "2",
          name: "composio_list_connections",
          status: "loading",
        },
      ],
    },
    {
      sender: "tool-result",
      content: "Found 1 Gmail connection: account_id=gmail_primary (oauth: true, last_sync: 2026-05-15T07:30:00Z)",
      timestamp: 3700,
    },
    {
      sender: "tool-call",
      content: "create_workflow",
      timestamp: 4500,
      toolCalls: [
        {
          id: "3",
          name: "create_workflow",
          params: {
            trigger: "schedule",
            schedule: "0 9 * * *",
            name: "Daily Newsletter Insights",
            steps: '1. GMAIL_SEARCH_EMAILS (label:Newsletter, from:last-week)\n2. AI process & extract insights\n3. send_notification with summary',
          },
          status: "loading",
        },
      ],
    },
    {
      sender: "tool-result",
      content: "Workflow created: workflow_id=wf_newsletter_daily — triggers every day at 09:00 AM",
      timestamp: 5700,
    },
    {
      sender: "tool-call",
      content: "send_notification",
      timestamp: 6500,
      toolCalls: [
        {
          id: "4",
          name: "send_notification",
          params: {
            title: "Newsletter Agent Active",
            body: "Daily newsletter insights workflow scheduled. First report at 9:00 AM tomorrow.",
          },
          status: "loading",
        },
      ],
    },
    {
      sender: "tool-result",
      content: "Notification sent ✓",
      timestamp: 7300,
    },
    {
      sender: "ai",
      content: "Done! I've set up a daily scheduled workflow that will:\n\n• Search your Gmail for newsletter emails each morning\n• Extract actionable insights using AI analysis\n• Send you a notification at 9:00 AM with the digest\n\nFirst report arrives tomorrow at 9 AM. Your connected Gmail account (gmail_primary) is already authorized.",
      timestamp: 8100,
    },
  ],
};

export function ChatAnimation() {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) return;

    const chat = chatRef.current;

    function createTimestamp(date: Date = new Date()) {
      const h = date.getHours().toString().padStart(2, "0");
      const m = date.getMinutes().toString().padStart(2, "0");
      return h + ":" + m;
    }

    function createMessageEl(
      sender: string,
      content: string,
      time: string,
      extraClasses: string = ""
    ) {
      const div = document.createElement("div");
      div.className = `msg-wrap ${sender === "user" ? "msg-user" : "msg-ai"} ${extraClasses}`;
      div.style.cssText = `
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 6px;
        opacity: 0;
        transform: translateY(8px);
      `;

      if (sender === "user") {
        div.innerHTML = `
          <div class="msg-content user-bubble" style="
            align-self: flex-end;
            max-width: 88%;
            background: ${COLORS.primaryContainer};
            color: ${COLORS.onPrimaryContainer};
            padding: 10px 14px;
            border-radius: 12px 12px 4px 12px;
            font-size: 13.5px;
            line-height: 1.5;
            font-family: inherit;
            word-break: break-word;
          ">${escapeHtml(content)}</div>
          <span style="
            align-self: flex-end;
            font-size: 10px;
            color: ${COLORS.onSurfaceVariant};
            margin-top: 3px;
            padding: 0 4px;
          ">${time}</span>
        `;
      } else if (sender === "ai") {
        div.innerHTML = `
          <div class="msg-content ai-bubble" style="
            align-self: flex-start;
            max-width: 88%;
            background: ${COLORS.surface};
            color: ${COLORS.onSurface};
            padding: 10px 14px;
            border-radius: 4px 12px 12px 4px;
            border-left: 2px solid ${COLORS.toolAccent};
            font-size: 13.5px;
            line-height: 1.55;
            font-family: inherit;
            word-break: break-word;
            white-space: pre-wrap;
          ">${content}</div>
          <span style="
            align-self: flex-start;
            font-size: 10px;
            color: ${COLORS.onSurfaceVariant};
            margin-top: 3px;
            padding: 0 4px;
          ">${time}</span>
        `;
      } else if (sender === "thinking") {
        div.innerHTML = `
          <div style="
            align-self: flex-start;
            max-width: 88%;
            background: ${COLORS.thinkingBg};
            color: ${COLORS.thinkingText};
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.5;
            font-family: 'JetBrains Mono', monospace;
            border-left: 2px solid ${COLORS.warning};
            opacity: 0.85;
          ">
            <span style="color: ${COLORS.warning}; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Thinking</span>
            <div style="margin-top: 4px; font-style: italic; opacity: 0.8;">${escapeHtml(content)}</div>
          </div>
        `;
      } else if (sender === "tool-call") {
        // Tool call display
        div.innerHTML = `
          <div style="
            align-self: flex-start;
            width: 100%;
            margin: 4px 0;
          ">
            ${content}
          </div>
        `;
      } else if (sender === "tool-result") {
        div.innerHTML = `
          <div style="
            align-self: flex-start;
            max-width: 88%;
            background: ${COLORS.surfaceVariant};
            color: ${COLORS.onSurfaceVariant};
            padding: 8px 12px;
            border-radius: 4px 12px 12px 4px;
            border-left: 2px solid ${COLORS.success};
            font-size: 12px;
            line-height: 1.5;
            font-family: 'JetBrains Mono', monospace;
          ">✓ ${escapeHtml(content)}</div>
        `;
      }

      return div;
    }

    function createToolCallCard(tool: ToolCall, delay: number) {
      const card = document.createElement("div");
      card.className = "tool-call-card";
      card.style.cssText = `
        align-self: flex-start;
        width: 100%;
        margin: 3px 0;
        opacity: 0;
        transform: translateX(-6px);
        background: ${COLORS.toolBg};
        border: 1px solid ${COLORS.border};
        border-radius: 8px;
        overflow: hidden;
      `;

      const headerBg = tool.status === "loading" ? "transparent" : COLORS.toolBg;
      const statusDot = tool.status === "loading"
        ? `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${COLORS.warning};margin-right:6px;animation:pulse 1s infinite"></span>`
        : `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${COLORS.success};margin-right:6px"></span>`;

      const paramsHtml = tool.params
        ? `<div style="padding:6px 12px 8px;font-size:11px;font-family:'JetBrains Mono',monospace;color:${COLORS.toolText};border-top:1px solid ${COLORS.border};margin-top:4px;">
            ${Object.entries(tool.params).map(([k, v]) =>
              `<div style="margin-top:2px;"><span style="color:${COLORS.toolAccent}">${k}:</span> ${escapeHtml(v)}</div>`
            ).join("")}
           </div>`
        : "";

      card.innerHTML = `
        <div style="display:flex;align-items:center;padding:7px 12px;background:${headerBg};">
          <span style="color:${COLORS.toolText};font-size:11px;font-family:'JetBrains Mono',monospace;display:flex;align-items:center;">
            ${statusDot}⬡ <span style="color:${COLORS.toolAccent};margin-left:6px;">${escapeHtml(tool.name)}</span>
          </span>
        </div>
        ${paramsHtml}
      `;

      chat.appendChild(card);

      // Animate in
      requestAnimationFrame(() => {
        card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
      });

      // Animate result
      if (tool.status === "loading") {
        setTimeout(() => {
          card.style.transition = "opacity 0.2s ease";
          card.style.opacity = "0.6";
          setTimeout(() => {
            card.style.opacity = "1";
            const dot = card.querySelector("span");
            if (dot) {
              dot.style.background = COLORS.success;
              dot.style.animation = "none";
            }
          }, 200);
        }, delay);
      }

      return card;
    }

    function escapeHtml(text: string): string {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
    }

    function scrollToBottom() {
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    }

    // Build animation
    const now = new Date();

    SCENARIO.messages.forEach((msg) => {
      if (msg.sender === "tool-call" && msg.toolCalls) {
        const baseDelay = msg.timestamp ?? 0;
        msg.toolCalls.forEach((tool, i) => {
          setTimeout(() => {
            createToolCallCard(tool, 600);
            scrollToBottom();
          }, baseDelay + i * 50);
        });
      } else if (msg.sender === "tool-result") {
        const delay = msg.timestamp ?? 0;
        setTimeout(() => {
          const el = createMessageEl("tool-result", msg.content, createTimestamp(new Date(now.getTime() + delay)));
          chat.appendChild(el);
          el.style.transition = "opacity 0.2s ease, transform 0.2s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          scrollToBottom();
        }, delay);
      } else {
        const delay = msg.timestamp ?? 0;
        setTimeout(() => {
          const el = createMessageEl(msg.sender, msg.content, createTimestamp(new Date(now.getTime() + delay)));
          chat.appendChild(el);
          el.style.transition = "opacity 0.25s ease, transform 0.25s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          scrollToBottom();
        }, delay);
      }
    });

    return () => {
      if (!chatRef.current) return;
      chatRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "0 16px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          aspectRatio: "9/16",
          maxHeight: "680px",
          background: COLORS.bg,
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
          position: "relative",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px 6px",
            background: COLORS.bg,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.toolAccent}, #60a5fa)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "700",
                color: "#fff",
              }}
            >
              T
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: COLORS.onSurface }}>
                Twent AI
              </div>
              <div style={{ fontSize: "10px", color: COLORS.success }}>● Online</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: COLORS.onSurfaceVariant,
              fontFamily: "monospace",
            }}
          >
            <span>●</span>
            <span style={{ color: COLORS.success }}>Deepseek</span>
            <span style={{ marginLeft: "6px", fontSize: "10px" }}>v3</span>
          </div>
        </div>

        {/* Toolset bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: `${COLORS.surface}`,
            borderBottom: `1px solid ${COLORS.border}`,
            overflowX: "auto",
          }}
        >
          {["Android", "Safety", "Web", "Skills"].map((t, i) => (
            <div
              key={t}
              style={{
                padding: "3px 8px",
                borderRadius: "6px",
                fontSize: "10px",
                background: i === 0 ? `${COLORS.toolAccent}22` : "transparent",
                color: i === 0 ? COLORS.toolAccent : COLORS.onSurfaceVariant,
                border: `1px solid ${i === 0 ? COLORS.toolAccent + "44" : COLORS.border}`,
                whiteSpace: "nowrap",
                fontWeight: i === 0 ? "600" : "400",
              }}
            >
              {t}
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontSize: "10px", color: COLORS.onSurfaceVariant }}>
            6/6 toolsets
          </div>
        </div>

        {/* Chat area */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            scrollBehavior: "smooth",
          }}
        />

        {/* Input area */}
        <div
          style={{
            padding: "8px 10px",
            background: COLORS.surface,
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "10px",
              border: `1px solid ${COLORS.border}`,
              background: COLORS.surfaceVariant,
              fontSize: "12px",
              color: COLORS.onSurfaceVariant,
              fontFamily: "inherit",
            }}
          >
            Type a message...
          </div>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: COLORS.toolAccent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            ↑
          </div>
        </div>

        {/* Bottom notch area */}
        <div
          style={{
            height: "24px",
            background: COLORS.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              background: COLORS.border,
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          marginTop: "16px",
          fontSize: "12px",
          color: COLORS.onSurfaceVariant,
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        AI Chat — Twent
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}