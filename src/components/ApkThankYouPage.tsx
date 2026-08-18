const CHANGELOG_URL = "/changelog";
const DISCORD_URL = "https://discord.gg/dUFrWm4w";
const APK_URL = "https://assets.twent.xyz/app-release.apk";

// Custom glimm palette using blue/orange/grey tones only.
const DOWNLOAD_PALETTE = {
  a: [0.08, 0.08, 0.10],
  b: [0.35, 0.28, 0.18],
  c: [0.45, 0.55, 0.35],
  d: [0.12, 0.22, 0.38],
} as const;

import { GlimmProvider, useGlimm } from "glimm/react";
import { useEffect, useState } from "react";

function ThankYouContent() {
  const { sweep } = useGlimm();
  const [status, setStatus] = useState("Waiting to start...");

  useEffect(() => {
    let cancelled = false;
    let controller: AbortController | null = null;
    const start = async () => {
      try {
        setStatus("Starting download...");
        controller = new AbortController();
        const res = await fetch(APK_URL, { signal: controller.signal });
        if (!res.ok || !res.body) throw new Error("Download failed");
        const reader = res.body.getReader();
        const contentLength = Number(res.headers.get("content-length") || 0);
        let received = 0;
        setStatus("Downloading APK...");
        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;
          received += value?.byteLength || 0;
          if (contentLength > 0) {
            const pct = Math.min(100, Math.round((received / contentLength) * 100));
            setStatus(`Downloading... ${pct}%`);
          } else {
            setStatus(`Downloading... ${(received / 1024 / 1024).toFixed(1)} MB`);
          }
        }
        if (cancelled) return;
        setStatus("Finishing download...");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "twent.apk";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
        setStatus("Download started. Keep this page open while it completes.");
        await new Promise((r) => setTimeout(r, 8000));
        if (!cancelled) setStatus("Done! If the download hasn't finished, this page will stay open.");
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        if (cancelled) return;
        setStatus("Could not track completion automatically. Use the links below.");
      }
    };
    void start();
    return () => {
      cancelled = true;
      controller?.abort();
    };
  }, []);

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
            Your APK download is starting. Stay on this page while it completes — the
            glimm sweep will keep running until the file is saved.
          </p>

          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 mb-8">
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Status</div>
            <div className="font-mono text-sm text-blue-600 dark:text-blue-400 break-words">
              {status}
            </div>
          </div>

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
          </div>

          <div className="mt-10">
            <button
              onClick={() =>
                sweep(
                  () => {},
                  {
                    sweepMs: 1800,
                    outroMs: 500,
                    palette: DOWNLOAD_PALETTE,
                    direction: "ltr",
                  }
                )
              }
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline underline-offset-4"
            >
              Replay glimm sweep
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
      <ThankYouContent />
    </GlimmProvider>
  );
}
