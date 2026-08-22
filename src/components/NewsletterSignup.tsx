import { useState } from "react";
import type { FormEvent } from "react";
import { DButton, DCard, DInput } from "./ui/drawably";

/**
 * Newsletter signup — posts straight to Substack's public no-JS subscribe
 * endpoint for jeff9james.substack.com (the same endpoint the official
 * Substack embed form submits to). Cross-origin responses carry no CORS
 * headers, so the request goes out in `no-cors` mode from the visitor's own
 * browser; if the request can't even leave (adblock/offline) we fall back to
 * a native form POST in a new tab, which always reaches Substack.
 */
const SUBSTACK_SUBSCRIBE = "https://jeff9james.substack.com/api/v1/free?nojs=true";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "loading" | "success" | "error";

function submitViaNativeForm(email: string) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = SUBSTACK_SUBSCRIBE;
  form.target = "_blank";
  const fields: Array<[string, string]> = [
    ["email", email],
    ["source", "subscribe_page"],
  ];
  for (const [name, value] of fields) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  form.remove();
}

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      return;
    }
    if (status === "loading") return;
    setStatus("loading");
    try {
      await fetch(SUBSTACK_SUBSCRIBE, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email: trimmed, source: "subscribe_page" }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      // Request blocked locally — deliver through a real form navigation.
      try {
        submitViaNativeForm(trimmed);
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
      }
    }
  }

  return (
    <div className="mb-14 flex justify-center">
      <DCard color="blue" pad="lg" className="w-full max-w-xl text-center">
        <h2 className="font-display text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100 mb-2">
          Join my newsletter
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Notes on Twent, AI agents, and what I&apos;m building next — straight
          to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-stretch gap-3"
          noValidate
        >
          <DInput
            color="orange"
            type="email"
            name="email"
            placeholder="you@example.com"
            aria-label="Email address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className="flex-1"
          />
          <DButton
            type="submit"
            variant="solid"
            state={
              status === "loading"
                ? "loading"
                : status === "error"
                  ? "error"
                  : "idle"
            }
          >
            Subscribe
          </DButton>
        </form>

        <div aria-live="polite">
          {status === "success" && (
            <p className="mt-4 text-sm text-orange-500 font-mono">
              You&apos;re in! Check your inbox to confirm your subscription.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-red-500 font-mono">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-600">
          No spam. Unsubscribe anytime.
        </p>
      </DCard>
    </div>
  );
}
