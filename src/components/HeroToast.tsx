export function HeroToast() {
  return (
    <div className="flex flex-col items-center gap-3 mb-6 animate-fade-in-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
        <span className="w-2 h-2 bg-orange-500 animate-pulse-glow" />
        <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 tracking-wide uppercase">
          50+ tools. One pocket.
        </span>
      </div>
      {/* Social proof in hero — principle 4: cascade starts here */}
      <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-500">
        <span>Trusted by developers worldwide</span>
      </div>
    </div>
  );
}
