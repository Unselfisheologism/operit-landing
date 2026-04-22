import { Nav } from "./Nav";
import { Footer } from "./Footer";

interface ChangelogEntry {
  date: string;
  items: string[];
}

const entries: ChangelogEntry[] = [
  {
    date: "April 19, 2026",
    items: [
      "System prompt enhancement",
      "ClawHub integration",
      "Tool-calling robustness enhancement",
    ],
  },
  {
    date: "April 12, 2026",
    items: [
      "Agent CLIs",
      "Mini-apps",
      "Toolset page",
    ],
  },
  {
    date: "April 3, 2026",
    items: [
      "Workflows",
      "Composio integration",
      "Skills",
      "MCP",
      "Linux terminal",
    ],
  },
  {
    date: "March 27, 2026",
    items: [
      "UI automation",
      "Overlay Assistant",
      "Voice activation",
      "TTS",
    ],
  },
  {
    date: "March 20, 2026",
    items: [
      "AI Chat",
      "API Provider support",
      "Knowledge and Memory graph",
      "Character Cards",
    ],
  },
];

export function ChangelogPage({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Nav dark={dark} onToggle={onToggle} />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Changelog</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-16 text-sm tracking-wide">
          What's new in Twent — weekly updates.
        </p>

        <div className="space-y-16">
          {entries.map((entry) => (
            <div key={entry.date}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <h2 className="text-sm font-secondary uppercase tracking-[0.15em] text-orange-500">
                  {entry.date}
                </h2>
              </div>
              <ul className="space-y-2 pl-5">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-zinc-600 dark:text-zinc-400 tracking-wide list-disc"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
