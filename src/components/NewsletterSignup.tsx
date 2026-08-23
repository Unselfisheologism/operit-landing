import { DCard } from "./ui/drawably";

/**
 * Newsletter signup — the official Substack embed for jeff9james.substack.com,
 * wrapped in a hand-drawn (drawably) blue-bordered card.
 *
 * The embed is a cross-origin iframe owned by Substack: subscription handling,
 * validation and confirmation are all done by Substack itself, so this always
 * works regardless of adblockers/CORS. Its internal styling (input field,
 * button) cannot be themed from our side — only the surrounding card is ours.
 */
export function NewsletterSignup() {
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

        <div className="flex justify-center">
          <iframe
            src="https://jeff9james.substack.com/embed"
            width={480}
            height={320}
            title="Subscribe to the newsletter on Substack"
            style={{
              border: "1px solid #EEE",
              background: "white",
              maxWidth: "100%",
            }}
            frameBorder={0}
            scrolling="no"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-600">
          No spam. Unsubscribe anytime.
        </p>
      </DCard>
    </div>
  );
}
