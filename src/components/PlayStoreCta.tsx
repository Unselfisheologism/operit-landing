import { useCallback } from "react";
import { DLink } from "./ui/drawably";

const APK_THANKYOU_URL = "/apk";
const APK_URL = "https://assets.twent.xyz/twent.apk";

/**
 * Start the APK download WITHOUT leaving the current page.
 *
 * Desktop: fetch the APK as a blob (works because desktop browsers send
 * Origin headers and R2/Cloudflare serves the file fine; even when CORS is
 * missing we fall back to a hidden-iframe navigation, which downloads in
 * place thanks to Content-Disposition: attachment) and click an <a download>.
 * The user stays exactly where they are.
 *
 * Mobile: cross-origin blob + programmatic clicks are blocked by mobile
 * browsers, and a hidden iframe download is unreliable. So we return false
 * and let the caller do a real top-level navigation to the APK URL — mobile
 * browsers see Content-Disposition: attachment and start the download while
 * remaining on the current page.
 */
function useApkDownload() {
  return useCallback((): boolean => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.platform));

    if (isMobile) {
      // Caller must navigate to APK_URL directly (download starts via
      // Content-Disposition: attachment; page URL is preserved by the browser).
      return false;
    }

    // Desktop path: blob download keeps us on-page.
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
        // CORS or network failure: hidden iframe still triggers the
        // attachment download without navigating this tab away.
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = APK_URL;
        document.body.appendChild(iframe);
        window.setTimeout(() => iframe.remove(), 120_000);
      });

    return true;
  }, []);
}

interface PlayStoreCtaProps {
  size?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Renders the APK download link only — as a hand-drawn control.
 * Small (nav) renders a grey outline; large (hero/final CTA) renders a
 * solid blue primary button.
 *
 * Click behavior: navigates to /apk (the thank-you / setup page). On desktop
 * it also starts the APK download immediately; on mobile the /apk page's own
 * auto-download handles it (direct navigation to the APK URL, which mobile
 * browsers download via Content-Disposition: attachment).
 */
export function PlayStoreCta({
  size = "h-11",
  className = "",
  showText = false,
}: PlayStoreCtaProps) {
  const big = size !== "h-8";
  const downloadApk = useApkDownload();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Let the SPA navigate to /apk normally...
      void e;
      // ...and on desktop also kick off the download right now so the file
      // is already downloading while the thank-you page loads.
      downloadApk();
    },
    [downloadApk],
  );

  return (
    <DLink
      href={APK_THANKYOU_URL}
      target="_self"
      rel=""
      aria-label="Download Twent APK"
      onClick={handleClick}
      variant={big ? "solid" : "outline"}
      color={big ? "blue" : "grey"}
      className={`${big ? "d-btn-lg" : "d-btn-sm"} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span>APK</span>
    </DLink>
  );
}

/**
 * APK-only button variant — big solid primary CTA.
 * Same click behavior as PlayStoreCta (see above).
 */
export function PlayStoreCtaGroup({
  size = "h-8",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  const downloadApk = useApkDownload();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      void e;
      downloadApk();
    },
    [downloadApk],
  );

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <DLink
        href={APK_THANKYOU_URL}
        target="_self"
        rel=""
        onClick={handleClick}
        variant="solid"
        className="d-btn-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="font-medium">Download APK</span>
      </DLink>
    </div>
  );
}
