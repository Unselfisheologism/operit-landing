import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";

// Grain overlay for editorial print feel
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

// Animated counter for the hero stat
function AnimatedDate({ visible }: { visible: boolean }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <span className="inline-block w-24 text-left">
      {"·".repeat(dots)}
      {"·".repeat(3 - dots)}
    </span>
  );
}

// Large decorative "00" watermark
function IssueWatermark() {
  return (
    <div className="absolute -right-8 md:right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
      <span
        className="font-display text-[20rem] md:text-[28rem] leading-none text-zinc-100 dark:text-zinc-900/[0.4] tracking-tighter"
        style={{ wordSpacing: "-0.2em" }}
      >
        00
      </span>
    </div>
  );
}

// Blog post type definition
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  image?: string;
}

// Featured post card — large editorial layout
function FeaturedPostCard({ post, visible }: { post: BlogPost; visible: boolean }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={`group block relative overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? "0.2s" : "0s" }}
    >
      <div className="grid md:grid-cols-[1fr_1.2fr] min-h-[28rem]">
        {/* Left — editorial info */}
        <div className="p-8 md:p-12 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-medium">
                {post.category}
              </span>
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                Featured
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 leading-[1.1] mb-4 tracking-tight">
              {post.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
              {post.excerpt}
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wide">
              {post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wide">
              {post.readTime}
            </span>
          </div>
          {/* Arrow indicator */}
          <div className="absolute bottom-8 right-8 md:right-auto md:left-12 w-10 h-10 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
            <svg
              className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors duration-300 -rotate-45 group-hover:rotate-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Right — visual image or placeholder */}
        <div className="relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.2em]">
                  Cover image
                </span>
              </div>
            </div>
          )}
          {/* Diagonal lines pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
            }}
          />
        </div>
      </div>
    </a>
  );
}

// Regular post card
function PostCard({
  post,
  visible,
  index,
}: {
  post: BlogPost;
  visible: boolean;
  index: number;
}) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={`group block border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 md:p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${0.1 + index * 0.08}s` : "0s" }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500 font-medium shrink-0">
          {post.category}
        </span>
        <span className="w-8 h-px bg-zinc-200 dark:bg-zinc-800 self-center" />
        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 tracking-wide shrink-0">
          {post.date}
        </span>
      </div>
      <h3 className="font-display text-xl md:text-2xl text-zinc-900 dark:text-zinc-100 leading-tight mb-3 tracking-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
        {post.title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wide">
          {post.readTime}
        </span>
        <div className="w-8 h-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
          <svg
            className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-300 -rotate-45 group-hover:rotate-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
}

// Empty state — premium "premiere issue" editorial feel
function EmptyState({ visible }: { visible: boolean }) {
  return (
    <div
      className={`relative py-24 md:py-32 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Decorative frame */}
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Corner decorations */}
        <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-zinc-200 dark:border-zinc-800" />
        <div className="absolute -top-6 -right-6 w-12 h-12 border-t border-r border-zinc-200 dark:border-zinc-800" />
        <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b border-l border-zinc-200 dark:border-zinc-800" />
        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-zinc-200 dark:border-zinc-800" />

        {/* Issue number */}
        <div className="mb-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500 font-medium">
            Volume 01 · Issue 00
          </span>
        </div>

        {/* Large decorative number */}
        <div className="mb-8 relative inline-block">
          <span
            className="font-display text-[8rem] md:text-[10rem] leading-none text-zinc-100 dark:text-zinc-900 tracking-tighter select-none"
            style={{ wordSpacing: "-0.2em" }}
          >
            00
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
          The first issue is coming
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto mb-10">
          We're crafting long-form pieces on agentic AI, on-device intelligence,
          and building software that thinks. No filler — only signal.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="w-16 h-px bg-zinc-200 dark:bg-zinc-800" />
          <span className="w-1.5 h-1.5 rotate-45 border border-zinc-300 dark:border-zinc-700" />
          <span className="w-16 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>


      </div>
    </div>
  );
}

// Category filter tags
function CategoryTags({
  categories,
  active,
  onSelect,
}: {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] border transition-all duration-200 ${
            active === cat
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export function BlogPage({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [heroRef, heroInView] = useInView();
  const [contentRef, contentInView] = useInView();
  const [activeCategory, setActiveCategory] = useState("All");

  // Sample blog posts — marketplace post added
  const posts: BlogPost[] = [
    {
      slug: "marketplace",
      title: "The Twent Marketplace: Your Agentic App Store",
      excerpt: "where creators sell anything from mini apps to custom skins, and everyone else gets to level up their agent for free (▀̿Ĺ̯▀̿ ̿)",
      date: "April 19, 2026",
      readTime: "5 min read",
      category: "Product",
      featured: true,
      image: "/marketplace-hero.png",
    }
  ];

  const categories = ["All", "Engineering", "Product", "AI Research", "Tutorials"];

  // Filter posts by category
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  // Find featured post (only when posts exist)
  const featured = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <GrainOverlay />
      <Nav dark={dark} onToggle={onToggle} />

      <main>
        {/* Hero — editorial masthead */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <IssueWatermark />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Breadcrumb / publication line */}
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500">
                The Twent Journal
              </span>
            </div>

            {/* Main title */}
            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-zinc-900 dark:text-zinc-100 leading-[0.9] tracking-tighter mb-6">
                Blog
              </h1>
            </div>

            {/* Subtitle row */}
            <div
              className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700 delay-200 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
                Deep dives on agentic AI, on-device intelligence, and building
                the future of human-computer interaction.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                  {posts.length === 0 ? "Coming soon" : `${posts.length} articles`}
                </span>
                <AnimatedDate visible={heroInView} />
              </div>
            </div>
          </div>

          {/* Bottom border — thick editorial rule */}
          <div
            className={`max-w-6xl mx-auto px-6 mt-12 transition-all duration-700 delay-300 ${
              heroInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />
          </div>
        </section>

        {/* Content area */}
        <section ref={contentRef} className="max-w-6xl mx-auto px-6 pb-24">
          {posts.length === 0 ? (
            <EmptyState visible={contentInView} />
          ) : (
            <div
              className={`transition-all duration-700 ${
                contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Category filter */}
              <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                <CategoryTags
                  categories={categories}
                  active={activeCategory}
                  onSelect={setActiveCategory}
                />
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wide">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Featured post */}
              {featured && (
                <div className="mb-8">
                  <FeaturedPostCard post={featured} visible={contentInView} />
                </div>
              )}

              {/* Post grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800">
                {regularPosts.map((post, i) => (
                  <div key={post.slug} className="bg-white dark:bg-zinc-950">
                    <PostCard post={post} visible={contentInView} index={i} />
                  </div>
                ))}
              </div>

              {/* Empty state for filtered results */}
              {filteredPosts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-sm text-zinc-400 dark:text-zinc-500 font-mono">
                    No articles in this category yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
