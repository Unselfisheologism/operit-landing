import { useState } from "react";
import { useInView } from "../hooks/useInView";

const testimonials = [
  { quote: "I replaced my entire dev workflow on the go. Claude Code in a terminal on my phone? This is the future.", name: "Android Developer", role: "Early Adopter" },
  { quote: "The overlay agent is insane. I told it to check my email, compose a reply, and attach a file. It just... did it.", name: "Power User", role: "Beta Tester" },
  { quote: "I'm not technical at all. Basic Mode makes it feel like talking to JARVIS. The voice activation is chef's kiss.", name: "Non-Technical User", role: "Community Member" },
  { quote: "I automated my entire morning routine — weather, emails, calendar summary — saving 45 min/day. That's 22 hours a month I got back.", name: "Productivity Enthusiast", role: "Early Adopter", caseStudy: true },
  { quote: "Built a full Python data pipeline on the bus ride home. Ubuntu in my pocket. Still can't believe it.", name: "Data Scientist", role: "Beta Tester" },
  { quote: "BYOK + local models = privacy done right. I run llama.cpp on device and my data never leaves my phone.", name: "Privacy Advocate", role: "Community Member" },
  { quote: "The MCP integration alone makes this worth it. I connected my Notion, GitHub, and Slack — my agent manages my entire day.", name: "Product Manager", role: "Early Adopter" },
  { quote: "I've tried every AI assistant app. Twent is the only one that actually DOES things instead of just talking about them.", name: "Tech Reviewer", role: "Beta Tester" },
];

export function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView();
  const visible = expanded ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="relative py-20 sm:py-28 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-blue-500" />
          <span className="text-xs font-secondary text-blue-500 uppercase tracking-[0.2em]">Testimonials</span>
          <div className="w-8 h-px bg-blue-500" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-12 text-center">
          People are building things<br /><span className="text-orange-500">we never imagined.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div key={i} className={`p-6 bg-zinc-50 dark:bg-zinc-900 border transition-colors flex flex-col ${'caseStudy' in t ? 'border-orange-500/30 md:col-span-1' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'}`}>
              {'caseStudy' in t && (
                <div className="text-[10px] font-mono text-orange-500 uppercase tracking-wider mb-3">Case Study</div>
              )}
              <div className="flex-1">
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 font-retro text-base">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-sm font-display text-zinc-900 dark:text-zinc-100">{t.name}</div>
                <div className="text-xs text-orange-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="mt-8 text-center">
            <button onClick={() => setExpanded(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-secondary uppercase tracking-wider hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">
              Show all testimonials
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
