import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

// Extract headings from content and build TOC
export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /<h([23])[^>]*>([^<]+)<\/h[23]>/g;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    items.push({ id, text, level });
  }

  return items;
}

// Simple anchor link generator
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map((item) => document.getElementById(item.id));

      // Find the heading that's currently in view
      let currentId = "";
      for (const heading of headings) {
        if (heading) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 150) {
            currentId = heading.id;
          }
        }
      }

      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, activeId]);

  if (items.length === 0) return null;

  return (
    <nav
      className={`toc bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 mb-8 ${className}`}
      aria-label="Table of contents"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-2"
      >
        <h3 className="text-sm font-display text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          Table of Contents
        </h3>
        <span className="text-zinc-400 text-lg">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {/* TOC List */}
      {isExpanded && (
        <ol className="space-y-2">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`${
                item.level === 3 ? "ml-4" : ""
              } flex items-start gap-3`}
            >
              <span className="text-zinc-300 dark:text-zinc-600 text-sm mt-0.5">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    const offset = 100;
                    const top =
                      element.getBoundingClientRect().top +
                      window.scrollY -
                      offset;
                    window.scrollTo({ top, behavior: "smooth" });
                    setActiveId(item.id);
                  }
                }}
                className={`text-sm hover:text-blue-500 transition-colors ${
                  activeId === item.id
                    ? "text-blue-500 font-medium"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}

      {/* Skip to top */}
      {isExpanded && (
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="block mt-4 text-xs text-zinc-400 hover:text-blue-500 transition-colors"
        >
          ↑ Skip to top
        </a>
      )}
    </nav>
  );
}

// Add ID anchors to headings in HTML content
export function addHeadingIds(content: string): string {
  return content.replace(/<h([23])([^>]*)>([^<]+)<\/h[23]>/g, (_match, level, attrs, text) => {
    const id = slugify(text.trim());
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

// Example TOC data for static blog posts
export const marketplaceTocItems: TocItem[] = [
  { id: "what-even-is-the-marketplace", text: "What even is the marketplace?", level: 2 },
  { id: "how-does-pricing-work", text: "How does pricing work?", level: 2 },
  { id: "why-this-matters", text: "Why this matters", level: 2 },
  { id: "whats-next", text: "What's next?", level: 2 },
  { id: "tldr", text: "TL;DR", level: 2 },
];

export const changelogTocItems: TocItem[] = [
  { id: "v060-beta", text: "v0.6.0 - Major Beta Update", level: 2 },
  { id: "v050-beta", text: "v0.5.0 - Beta Launch", level: 2 },
  { id: "v040-alpha", text: "v0.4.0 - Alpha Updates", level: 2 },
  { id: "v030-alpha", text: "v0.3.0 - Core Features", level: 2 },
  { id: "v020-alpha", text: "v0.2.0 - Early Alpha", level: 2 },
];