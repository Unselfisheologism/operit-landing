import { useCallback, useEffect, useRef } from "react";
import { GlimmProvider, useGlimm } from "glimm/react";
import { DButton, DLink } from "./ui/drawably";
import { RoughAnnotation } from "./ui/rough";

const CHANGELOG_URL = "/changelog";
const DISCORD_URL = "https://discord.gg/dUFrWm4w";
const FEEDBACK_URL = "https://tally.so/r/81DyMk";
const APK_URL = "https://assets.twent.xyz/twent.apk";

// Tight blue/orange/grey cosine palette.
// Low c keeps the hue range narrow so it reads as blue/grey/orange,
// not rainbow.
const DOWNLOAD_PALETTE = {
  a: [0.38, 0.38, 0.40],
  b: [0.22, 0.18, 0.20],
  c: [0.18, 0.18, 0.18],
  d: [0.55, 0.15, 0.40],
} as const;

const SWEEP_OPTIONS = {
  sweepMs: 1800,
  outroMs: 500,
  palette: DOWNLOAD_PALETTE,
  direction: "ltr" as const,
};

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
    let timeout: number | null = null;

    const run = () => {
      if (cancelled) return;
      const handle = sweep(() => {}, SWEEP_OPTIONS);
      activeHandle = handle;
      handle.done
        .then(() => {
          activeHandle = null;
          if (!cancelled) {
            timeout = window.setTimeout(run, 180);
          }
        })
        .catch(() => {
          activeHandle = null;
        });
    };

    void triggerDownload();
    void run();

    return () => {
      cancelled = true;
      if (timeout !== null) {
        window.clearTimeout(timeout);
      }
      activeHandle?.cancel();
    };
  }, [sweep, triggerDownload]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-md w-full px-6 text-center">
          <RoughAnnotation
            text={
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
            }
            type="circle"
            color="blue"
            strokeWidth={2}
            padding={6}
          />

          <h1 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
            Thank you for installing Twent!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm md:text-base">
            Your APK download should start automatically. If the Download
            hasn't started, use the button below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <DLink
              href={CHANGELOG_URL}
              variant="outline"
              color="grey"
              className="d-btn-lg"
            >
              Changelog
            </DLink>
            <DLink
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              color="grey"
              className="d-btn-lg"
            >
              Discord
            </DLink>
            <DLink
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              color="grey"
              className="d-btn-lg"
            >
              Feedback
            </DLink>
            <DButton
              onClick={triggerDownload}
              variant="solid"
              className="d-btn-lg"
            >
              Download Again
            </DButton>
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
