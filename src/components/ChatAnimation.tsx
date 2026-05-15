import { useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════
// EXACT COLORS FROM THE TWENT APP (verified via screenshot pixel analysis)
// ═══════════════════════════════════════════════════════════════════════
const C = {
  // Brand accent (used for the ENTIRE top header)
  orange: "#F09020",
  // Logo colors (from FINAL TWENT LOGO.png)
  logoDark: "#181E23",
  logoRed: "#C94828",
  logoCyan: "#A9F7F9",
  // Background colors
  bg: "#1E1E1E",        // DarkBg
  surface: "#141414",   // DarkSurface
  surfaceHigh: "#202020", // DarkSurfaceHigh
  surfaceHighest: "#3C3C3C", // DarkSurfaceHighest
  // User message — PURPLE as seen in screenshot
  userBubble: "#4B3582",
  userText: "#EAD9FF",  // light purple/white
  // AI content
  aiText: "#B0B0B0",    // OnDarkBg
  aiMuted: "#909090",   // secondary text
  // Accents
  success: "#4CAF50",   // green checkmark
  cyan: "#80C0F0",      // CyanPrimary from Color.kt
  // Input bar
  inputBg: "#2C221A",   // warm dark
  inputBorder: "#3C3C3C",
};

// ═══════════════════════════════════════════════════════════════════════
// ANIMATION SEQUENCE TIMING (~10s total)
// ═══════════════════════════════════════════════════════════════════════
const S = [
  { t: 0,    type: "user",    msg: "everyday at 9AM, report to me with all the actionable insights from all my newsletters." },
  { t: 400,  type: "ai-start" },
  { t: 700,  type: "think",   msg: "Setting up a daily newsletter digest workflow. First I'll check the Gmail toolkit, then create a scheduled automation." },
  { t: 1500, type: "tool",    name: "composio_get_toolkit_docs", params: { "toolkit_slug": "gmail" } },
  { t: 2200, type: "result",  msg: "Gmail toolkit loaded — 47 tools available" },
  { t: 2900, type: "tool",    name: "composio_list_connections", params: {} },
  { t: 3500, type: "result",  msg: "Connected: gmail_primary (OAuth, last sync: 5 min ago)" },
  { t: 4200, type: "tool",    name: "create_workflow", params: { "trigger": "schedule", "cron": "0 9 * * *", "name": "Daily Newsletter Digest" } },
  { t: 5000, type: "result",  msg: "Workflow created ✓ wf_newsletter_daily — triggers at 09:00 AM" },
  { t: 5700, type: "tool",    name: "send_notification", params: { "title": "Newsletter Agent Active", "body": "First report in 24h" } },
  { t: 6300, type: "result",  msg: "Notification delivered ✓" },
  { t: 7100, type: "ai-end",  msg: "Done! Your Daily Newsletter Digest workflow is now active.\n\n• Searches Gmail for newsletter emails every morning\n• Extracts actionable insights using AI analysis\n• Sends a notification at 9:00 AM with the digest" },
];

function esc(s: string) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// ═══════════════════════════════════════════════════════════════════════
// HTML BUILDERS
// ═══════════════════════════════════════════════════════════════════════

function userBubble(msg: string) {
  return `<div class="msg" style="width:100%;margin-bottom:8px;display:flex;flex-direction:column;align-items:flex-end;opacity:0;transform:translateY(12px);transition:all 0.35s ease;">
    <div style="max-width:90%;background:${C.userBubble};border-radius:8px 8px 8px 8px;overflow:hidden;">
      <div style="padding:8px 14px 0;font-size:10px;color:${C.userText}80;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;">Prompt</div>
      <div style="padding:4px 14px 10px;color:${C.userText};font-size:13px;line-height:1.55;word-break:break-word;">${esc(msg)}</div>
    </div>
  </div>`;
}

function typingDots() {
  return `<div class="msg" style="width:100%;margin-bottom:4px;display:flex;flex-direction:column;opacity:0;transition:opacity 0.3s;">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 16px 4px;">
      <span style="font-size:10px;color:${C.aiMuted};font-weight:500;letter-spacing:0.05em;text-transform:uppercase;">Response</span>
      <span style="font-size:9px;color:${C.cyan};">Deepseek v3</span>
    </div>
    <div style="padding:4px 16px;display:flex;gap:4px;">
      <span class="d" style="width:5px;height:5px;border-radius:50%;background:${C.aiMuted};animation:bounce 1.2s infinite;display:inline-block;"></span>
      <span class="d" style="width:5px;height:5px;border-radius:50%;background:${C.aiMuted};animation:bounce 1.2s infinite 0.15s;display:inline-block;"></span>
      <span class="d" style="width:5px;height:5px;border-radius:50%;background:${C.aiMuted};animation:bounce 1.2s infinite 0.3s;display:inline-block;"></span>
    </div>
  </div>`;
}

function thinking(msg: string) {
  return `<div class="msg" style="width:100%;margin-bottom:6px;display:flex;flex-direction:column;align-items:flex-start;opacity:0;transform:translateX(-8px);transition:all 0.3s ease;">
    <div style="max-width:92%;background:${C.surface};border:1px solid ${C.surfaceHighest};border-left:2px solid ${C.orange};border-radius:4px;padding:8px 12px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="color:${C.orange};font-size:9px;text-transform:uppercase;letter-spacing:0.07em;font-weight:600;">Thinking</span>
        <span class="p" style="display:inline-block;width:4px;height:4px;border-radius:50%;background:${C.orange};animation:pulse 1s infinite;"></span>
      </div>
      <div style="color:${C.aiMuted};font-size:11.5px;line-height:1.55;font-style:italic;opacity:0.85;">${esc(msg)}</div>
    </div>
  </div>`;
}

function toolCard(name: string, params: Record<string, string>) {
  const pHtml = Object.keys(params).length > 0
    ? `<div style="margin-top:6px;padding:6px 10px;background:rgba(0,0,0,0.25);border-top:1px solid ${C.surfaceHighest};font-size:10.5px;font-family:monospace;">
        ${Object.entries(params).map(([k, v]) => `<div style="margin-top:2px;"><span style="color:${C.cyan};">${esc(k)}:</span> <span style="color:${C.aiMuted};">${esc(v)}</span></div>`).join("")}
      </div>`
    : "";
  return `<div class="msg tc" style="width:100%;margin-bottom:5px;display:flex;flex-direction:column;opacity:0;transform:translateX(-8px);transition:all 0.25s ease;">
    <div style="background:${C.surface};border:1px solid ${C.surfaceHighest};border-radius:8px;overflow:hidden;">
      <div style="display:flex;align-items:center;padding:7px 12px;gap:8px;">
        <span style="color:${C.aiMuted};font-size:11px;display:flex;align-items:center;gap:5px;">
          <span class="td" style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${C.orange};animation:pulse 1s infinite;"></span>
          <span>⚡</span>
        </span>
        <span style="font-size:11.5px;font-weight:500;color:${C.orange};font-family:monospace;">${esc(name)}</span>
      </div>
      ${pHtml}
    </div>
  </div>`;
}

function toolResult(msg: string) {
  return `<div class="msg" style="width:100%;margin-bottom:5px;display:flex;flex-direction:column;align-items:flex-start;opacity:0;transform:translateY(6px);transition:all 0.25s ease;">
    <div style="max-width:92%;background:${C.surface};border:1px solid ${C.surfaceHighest};border-left:2px solid ${C.success};border-radius:4px;padding:5px 12px;font-size:11px;font-family:monospace;color:${C.aiMuted};line-height:1.5;">
      <span style="color:${C.success};font-weight:600;">✓</span> <span style="margin-left:4px;">${esc(msg)}</span>
    </div>
  </div>`;
}

function aiComplete(msg: string) {
  const body = msg.split("\n").map(l => l.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${C.aiText};">$1</strong>`)).join("<br>");
  return `<div class="msg" style="width:100%;margin-bottom:8px;display:flex;flex-direction:column;opacity:0;transform:translateY(10px);transition:all 0.4s ease;">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 16px 4px;">
      <span style="font-size:10px;color:${C.aiMuted};font-weight:500;letter-spacing:0.05em;text-transform:uppercase;">Response</span>
      <span style="font-size:9px;color:${C.cyan};">Deepseek v3</span>
    </div>
    <div style="margin:0 8px;background:${C.surface};border:1px solid ${C.surfaceHighest};border-radius:8px;padding:10px 14px 12px;">
      <div style="color:${C.aiText};font-size:13px;line-height:1.65;word-break:break-word;">${body}</div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════
export function ChatAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!ref.current || done.current) return;
    done.current = true;

    const ch = ref.current;

    // Inject keyframes once
    const ks = document.createElement("style");
    ks.textContent = `
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(.85)}}
@keyframes bounce{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
`;
    document.head.appendChild(ks);

    function add(html: string) {
      const d = document.createElement("div");
      d.innerHTML = html;
      const e = d.firstElementChild as HTMLElement | null;
      if (e) ch.appendChild(e);
      return e;
    }

    function arrive(el: HTMLElement, ms: number, transformDone?: (e: HTMLElement) => void) {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = el.classList.contains("tc") ? "translateX(0)" : "translateY(0)";
        if (transformDone) setTimeout(() => transformDone(el), 400);
      }, ms);
    }

    // ── User message ──────────────────────────────────
    const u = add(userBubble(S[0].msg!));
    if (u) arrive(u, S[0].t);

    // ── AI starts typing ──────────────────────────────
    const as = add(typingDots());
    if (as) arrive(as, S[1].t);

    // ── Thinking ──────────────────────────────────────
    const th = add(thinking(S[2].msg!));
    if (th) arrive(th, S[2].t);

    // ── Tool 1: composio_get_toolkit_docs ─────────────
    const t1 = add(toolCard("composio_get_toolkit_docs", { "toolkit_slug": "gmail" }));
    if (t1) {
      arrive(t1, S[3].t, (e) => {
        const dot = e.querySelector(".td") as HTMLElement;
        if (dot) { dot.style.background = C.success; dot.style.animation = "none"; }
      });
    }

    // ── Result 1 ──────────────────────────────────────
    const r1 = add(toolResult(S[4].msg!));
    if (r1) arrive(r1, S[4].t);

    // ── Tool 2: composio_list_connections ─────────────
    const t2 = add(toolCard("composio_list_connections", {}));
    if (t2) {
      arrive(t2, S[5].t, (e) => {
        const dot = e.querySelector(".td") as HTMLElement;
        if (dot) { dot.style.background = C.success; dot.style.animation = "none"; }
      });
    }

    // ── Result 2 ──────────────────────────────────────
    const r2 = add(toolResult(S[6].msg!));
    if (r2) arrive(r2, S[6].t);

    // ── Tool 3: create_workflow ───────────────────────
    const t3 = add(toolCard("create_workflow", { "trigger": "schedule", "cron": "0 9 * * *", "name": "Daily Newsletter Digest" }));
    if (t3) {
      arrive(t3, S[7].t, (e) => {
        const dot = e.querySelector(".td") as HTMLElement;
        if (dot) { dot.style.background = C.success; dot.style.animation = "none"; }
      });
    }

    // ── Result 3 ──────────────────────────────────────
    const r3 = add(toolResult(S[8].msg!));
    if (r3) arrive(r3, S[8].t);

    // ── Tool 4: send_notification ─────────────────────
    const t4 = add(toolCard("send_notification", { "title": "Newsletter Agent Active", "body": "First report in 24h" }));
    if (t4) {
      arrive(t4, S[9].t, (e) => {
        const dot = e.querySelector(".td") as HTMLElement;
        if (dot) { dot.style.background = C.success; dot.style.animation = "none"; }
      });
    }

    // ── Result 4 ──────────────────────────────────────
    const r4 = add(toolResult(S[10].msg!));
    if (r4) arrive(r4, S[10].t);

    // ── Final AI response ─────────────────────────────
    const ae = add(aiComplete(S[11].msg!));
    if (ae) {
      arrive(ae, S[11].t);
      // Fade typing indicator
      const dots = ch.querySelector(".d")?.parentElement?.parentElement;
      if (dots) { (dots as HTMLElement).style.transition = "opacity 0.3s"; (dots as HTMLElement).style.opacity = "0"; }
    }

    // Auto-scroll
    const check = setInterval(() => { ch.scrollTop = ch.scrollHeight; }, 100);
    setTimeout(() => clearInterval(check), 8500);

    return () => { document.head.removeChild(ks); clearInterval(check); };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 16px 32px" }}>
      <div style={{
        width: "100%", maxWidth: "390px",
        aspectRatio: "9 / 16", maxHeight: "660px",
        background: C.bg,
        borderRadius: "20px", overflow: "hidden",
        display: "flex", flexDirection: "column",
        border: `1px solid ${C.surfaceHighest}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        position: "relative",
      }}>
        {/* ── ORANGE HEADER (entire top bar) ─────────────*/}
        <div style={{
          background: C.orange,
          flexShrink: 0,
          position: "relative",
        }}>
          {/* Status bar + header combined */}
          <div style={{
            height: "48px",
            display: "flex", alignItems: "center",
            padding: "0 12px",
            gap: "8px",
          }}>
            {/* T Avatar — dark circle with T logo */}
            <div style={{
              width: "34px", height: "34px",
              borderRadius: "50%",
              background: C.logoDark,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              {/* Cyan accent arc at top */}
              <div style={{
                position: "absolute", top: "-4px", left: "50%",
                transform: "translateX(-50%)",
                width: "12px", height: "12px",
                borderRadius: "50% 50% 0 0",
                background: C.logoCyan,
                opacity: 0.6,
              }} />
              {/* T letter in red-orange */}
              <span style={{
                color: C.logoRed,
                fontSize: "18px", fontWeight: "700",
                fontFamily: "serif",
                lineHeight: 1,
                position: "relative",
                zIndex: 1,
              }}>T</span>
            </div>
            {/* Title */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff", lineHeight: 1.2 }}>Twent AI</div>
            </div>
            {/* Provider tag */}
            <div style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "10px",
              padding: "2px 8px",
              fontSize: "9px",
              color: "#fff",
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}>
              Deepseek v3
            </div>
          </div>

          {/* Toolset bar pills */}
          <div style={{
            display: "flex", alignItems: "center", gap: "4px",
            padding: "4px 12px 8px",
            overflowX: "auto",
          }}>
            {[
              { l: "Android", a: true }, { l: "Safety", a: false },
              { l: "Web", a: false }, { l: "Skills", a: false },
            ].map(({ l, a }) => (
              <div key={l} style={{
                padding: "2px 8px", borderRadius: "4px",
                fontSize: "9.5px", fontWeight: a ? "600" : "400",
                background: a ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
                color: a ? "#fff" : "rgba(255,255,255,0.7)",
                border: `1px solid ${a ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}`,
                whiteSpace: "nowrap",
              }}>{l}</div>
            ))}
            <div style={{
              marginLeft: "auto", fontSize: "9px",
              color: "rgba(255,255,255,0.6)",
              whiteSpace: "nowrap",
            }}>6/6 toolsets</div>
          </div>
        </div>

        {/* ── CHAT AREA ──────────────────────────────────*/}
        <div ref={ref} style={{
          flex: 1, overflowY: "auto",
          padding: "10px 10px 4px",
          display: "flex", flexDirection: "column",
        }} />

        {/* ── INPUT BAR ──────────────────────────────────*/}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "8px 12px",
          background: C.inputBg,
          borderTop: `1px solid ${C.surfaceHighest}`,
          flexShrink: 0,
        }}>
          {/* Plus */}
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: C.surfaceHigh, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.aiMuted} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          {/* Field */}
          <div style={{
            flex: 1, background: C.surfaceHigh, borderRadius: "16px",
            padding: "8px 12px", fontSize: "12px", color: C.aiMuted,
            border: `1px solid ${C.surfaceHighest}`,
          }}>Ask Twent anything...</div>
          {/* Send */}
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: `${C.orange}44`, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>

        {/* bottom notch */}
        <div style={{
          position: "absolute", bottom: "6px", left: "50%", transform: "translateX(-50%)",
          width: "70px", height: "4px", borderRadius: "2px", background: C.surfaceHighest,
        }} />
      </div>
    </div>
  );
}