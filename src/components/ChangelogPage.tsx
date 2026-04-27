import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { TableOfContents } from "./ui/TableOfContents";

interface ChangelogEntry {
  date: string;
  version: string;
  items: string[];
}

const entries: ChangelogEntry[] = [
  {
    date: "April 19, 2026",
    version: "v0.6.0",
    items: [
      "System prompt enhancement",
      "ClawHub integration",
      "Tool-calling robustness enhancement",
    ],
  },
  {
    date: "April 12, 2026",
    version: "v0.5.0",
    items: [
      "Agent CLIs",
      "Mini-apps",
      "Toolset page",
    ],
  },
  {
    date: "April 3, 2026",
    version: "v0.4.0",
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
    version: "v0.3.0",
    items: [
      "UI automation",
      "Overlay Assistant",
      "Voice activation",
      "TTS",
    ],
  },
  {
    date: "March 20, 2026",
    version: "v0.2.0",
    items: [
      "AI Chat",
      "API Provider support",
      "Knowledge and Memory graph",
      "Character Cards",
    ],
  },
];

// Build TOC items from changelog entries
const tocItems = entries.map((entry) => ({
  id: entry.version.replace(".", "-"),
  text: `${entry.version} - ${entry.date}`,
  level: 2,
}));

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
        <h1 className="font-display text-4xl tracking-tight mb-2">Changelog</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-16 text-sm tracking-wide">
          What's new in Twent — weekly updates.
        </p>

        <TableOfContents items={tocItems} />

        <div className="space-y-16">
          {entries.map((entry) => (
            <div key={entry.date} id={entry.version.replace(".", "-")}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <h2 className="font-display text-sm uppercase tracking-[0.15em] text-orange-500">
                  {entry.date} — {entry.version}
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
