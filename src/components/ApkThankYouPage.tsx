import { useCallback, useEffect, useRef } from "react";
import { GlimmProvider, useGlimm } from "glimm/react";
import { DCard, DLink } from "./ui/drawably";
import { RoughAnnotation } from "./ui/rough";
import PhoneVideoPlayer from "./fancy/blocks/PhoneVideoPlayer";

const CHANGELOG_URL = "/changelog";
const DISCORD_URL = "https://discord.gg/dUFrWm4w";
const FEEDBACK_URL = "https://tally.so/r/81DyMk";
const APK_URL = "https://assets.twent.xyz/twent.apk";
const SETUP_VIDEO = {
  src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787466575/lv_0_20260823112114_se0sch.mp4",
  description: "How to install Twent: allow the install and complete setup",
};

// Tight blue/orange/grey cosine palette.
// Low c keeps the hue range narrow so it reads as blue/grey/orange,
// not rainbow.
const DOWNLOAD_PALETTE = {
  a: [0.38, 0.38, 0.4],
  b: [0.22, 0.18, 0.2],
  c: [0.18, 0.18, 0.18],
  d: [0.55, 0.15, 0.4],
} as const;

const SWEEP_OPTIONS = {
  sweepMs: 1800,
  outroMs: 500,
  palette: DOWNLOAD_PALETTE,
  direction: "ltr" as const,
};

function ApkContent() {
  const { sweep } = useGlimm();
  const autoTriggered = useRef(false);

  const triggerDownload = useCallback(() => {
    // Desktop path: fetch as a blob so the file downloads while this page
    // stays put.
    fetch(APK_URL, { mode: "cors" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "twent.apk";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      })
      .catch(() => {
        // CORS/network failure: hidden iframe still triggers the
        // attachment download without navigating this tab away.
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = APK_URL;
        document.body.appendChild(iframe);
        window.setTimeout(() => iframe.remove(), 120_000);
      });
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

    void run();

    // Mobile auto-download: assign location.href to the APK URL. Because the
    // R2 asset serves Content-Disposition: attachment, the browser starts
    // the download WITHOUT leaving this page — this works on Android/iOS
    // browsers where programmatic <a>.click() and hidden iframes are ignored.
    // Small delay so the page paints first.
    const ua = navigator.userAgent;
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.platform));
    let dlTimeout: number | null = null;
    if (isMobile && !autoTriggered.current) {
      autoTriggered.current = true;
      dlTimeout = window.setTimeout(() => {
        if (!cancelled) window.location.href = APK_URL;
      }, 1000);
    }

    return () => {
      cancelled = true;
      if (timeout !== null) {
        window.clearTimeout(timeout);
      }
      if (dlTimeout !== null) {
        window.clearTimeout(dlTimeout);
      }
      activeHandle?.cancel();
    };
  }, [sweep]);

  // Desktop: start downloading immediately on mount.
  const desktop = !(
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.platform))
  );
  useEffect(() => {
    if (desktop) triggerDownload();
  }, [desktop, triggerDownload]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Normal flow (NOT absolute inset-0): content taller than one viewport
          must extend the page and scroll — absolute centering clipped it and
          left dead white space below on mobile. */}
      <div className="flex min-h-screen items-start sm:items-center justify-center">
        <div className="max-w-md w-full px-6 pt-10 pb-16 text-center">
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
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            twent.xyz is the only official Twent site — the APK comes from
            assets.twent.xyz.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm md:text-base">
            Your APK download should start automatically. If it hasn&apos;t,
            tap the Download button below.
          </p>

          {/* flex-wrap keeps buttons on one row where they fit (desktop) and
              wraps cleanly instead of stacking a full-width tower (mobile). */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Real anchor: mobile browsers only start downloads for genuine
                taps on an href — programmatic clicks are ignored. */}
            <DLink
              href={APK_URL}
              variant="solid"
              color="blue"
              className="d-btn-lg"
            >
              Download
            </DLink>
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
          </div>

          {/* Survey CTA — direct feedback from people who just installed */}
          <div className="mt-10">
            <DCard color="orange" pad="lg" className="text-center">
              <h2 className="font-display text-xl sm:text-2xl tracking-tight mb-2">
                Can you answer this survey about Twent?
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">
                It will help us improve Twent{" "}
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  DRASTICALLY!
                </span>{" "}
                6 quick questions, under a minute.
              </p>
              <DLink
                href={FEEDBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                color="orange"
                className="d-btn-lg"
              >
                Take the survey
              </DLink>
            </DCard>
          </div>

          {/* Installation / setup video tutorial — tap to open in a blurred popup */}
          <div className="mt-10 text-center">
            <h2 className="font-display text-lg tracking-tight mb-1">
              Installation setup video
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              Tap the video to watch it full-screen.
            </p>
            <div className="mx-auto max-w-[300px] aspect-[9/16]">
              <PhoneVideoPlayer videos={[SETUP_VIDEO]} accentColor="#3b82f6" />
            </div>
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
