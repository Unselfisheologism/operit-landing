import { useCallback, useEffect, useState } from "react";
import { GlimmProvider, useGlimm } from "glimm/react";

const CHANGELOG_URL = "/changelog";
const DISCORD_URL = "https://discord.gg/dUFrWm4w";
const APK_URL = "https://assets.twent.xyz/app-release.apk";

// Tight blue/orange/grey cosine palette.
// Low c keeps the hue range narrow so it reads as blue/grey/orange,
// not rainbow.
const DOWNLOAD_PALETTE = {
  a: [0.40, 0.45, 0.55],
  b: [0.25, 0.20, 0.15],
  c: [0.30, 0.30, 0.30],
  d: [0.60, 0.15, 0.05],
} as const;

function ApkContent() {
  const { sweep } = useGlimm();

  const triggerDownload = useCallback(() => {
    try {
      const a = document.createElement("a");
      a.href = APK_URL;
      a.download = "twent.apk";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      // ignore — manual button remains available
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let activeHandle: { cancel: () => void } | null = null;
    let ran = false;

    const loop = async () => {
      if (ran || cancelled) return;
      ran = true;
      await triggerDownload();
      while (!cancelled) {
        const handle = sweep(
          () => {},
          {
            sweepMs: 1800,
            outroMs: 500,
            palette: DOWNLOAD_PALETTE,
            direction: "ltr",
          }
        );
        activeHandle = handle;
        await handle.done;
        activeHandle = null;
        if (cancelled) break;
        break;
      }
    };

    void loop();

    return () => {
      cancelled = true;
      activeHandle?.cancel();
    };
  }, [sweep, triggerDownload]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-md w-full px-6 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-blue-500 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
            Thank you for installing Twent!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm md:text-base">
            Your APK download should start automatically. If the Download hasn't started, use the button below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={CHANGELOG_URL}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors"
            >
              Changelog
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors"
            >
              Discord
            </a>
            <button
              onClick={triggerDownload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors"
            >
              Download APK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApkThankYouPage() {
  return (
    <GlimmProvider
      palette={DOWNLOAD_PALETTE}
      sweepMs={1800}
      outroMs={500}
      direction="ltr"
      bandTight={18}
    >
      <ApkContent />
    </GlimmProvider>
  );
}
