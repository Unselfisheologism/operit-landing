// Server-side entry for build-time prerendering of the home page.
// Renders the same tree as main.tsx to static HTML so the browser can
// paint the nav + hero immediately, before any JS downloads.
//
// Uses renderToPipeableStream (not renderToString): the tree contains a
// Suspense boundary (the lazy footer slot), and the stream API waits for
// suspended boundaries to finish on the server. renderToString would leave
// that boundary in an errored/pending state, producing a `<!--$!-->` marker
// that makes the client log React error #419 on hydration.
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";

// Initialize i18n (deterministic: pinned to 'en' outside the browser)
import "./i18n";
import App from "./App";
import { AuthProvider } from "./lib/AuthContext";
import { SketchCardProvider } from "./components/ui/rough";

const RENDER_TIMEOUT_MS = 15_000;

export function renderHome(): Promise<string> {
  return new Promise((resolve, reject) => {
    const errors: unknown[] = [];
    const timer = setTimeout(() => {
      reject(new Error("renderHome timed out — a Suspense boundary never finished"));
    }, RENDER_TIMEOUT_MS);

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <AuthProvider>
          <App />
          <SketchCardProvider />
        </AuthProvider>
      </StrictMode>,
      {
        onError(err) {
          errors.push(err);
        },
        onAllReady() {
          clearTimeout(timer);
          let out = "";
          pipe(
            new Writable({
              write(chunk, _enc, cb) {
                out += chunk.toString();
                cb();
              },
              final(cb) {
                cb();
                if (errors.length > 0) {
                  reject(
                    new Error(
                      "renderHome: Suspense boundary errors:\n" +
                        errors.map((e) => (e instanceof Error ? e.stack || e.message : String(e))).join("\n---\n"),
                    ),
                  );
                } else {
                  resolve(out);
                }
              },
            }),
          );
        },
        onShellError(err) {
          clearTimeout(timer);
          reject(err);
        },
      },
    );
  });
}
