import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function TermsOfService({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <Nav dark={dark} onToggle={onToggle} />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-3xl md:text-4xl mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-500 mb-10">
          Last updated: April 22, 2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By downloading, installing, or using Twent ("the App"), you agree
              to be bound by these Terms of Service. If you do not agree, do not
              use the App. Twent is operated by Twent AI ("we", "us", "our").
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              2. Description of Service
            </h2>
            <p>
              Twent is an AI assistant application for Android that provides:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>AI-powered chat with tool-calling capabilities</li>
              <li>UI automation via Android Accessibility Services</li>
              <li>A built-in Linux terminal environment</li>
              <li>File system, network, and media processing tools</li>
              <li>Workflow automation and scheduling</li>
              <li>A marketplace for agentic apps, skills, and MCP servers</li>
              <li>Voice interaction and text-to-speech</li>
            </ul>
            <p className="mt-2">
              Twent supports both cloud-based AI providers (OpenAI, Anthropic
              Claude, Google Gemini, Deepseek, Kimi, Mistral, Doubao, and
              others) and local inference via MNN/llama.cpp. You provide your
              own API keys for cloud providers.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              3. User Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                You are responsible for your own API keys and any costs incurred
                through third-party AI providers.
              </li>
              <li>
                You must comply with the terms of service of any third-party AI
                provider you connect to Twent.
              </li>
              <li>
                You are responsible for how you use automation, file access, and
                other system-level tools on your device.
              </li>
              <li>
                You must not use Twent for illegal activities, harassment,
                spamming, or any harmful purpose.
              </li>
              <li>
                You are responsible for any content you create, share, or
                publish through the App.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              4. Accessibility Services
            </h2>
            <p>
              Twent uses Android Accessibility Services to enable UI automation
              features (auto-clicking, screen reading, gesture simulation). This
              permission is requested explicitly and can be revoked at any time
              through your device settings. Twent does not use Accessibility
              Services for data collection or surveillance.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              5. Advertising
            </h2>
            <p>
              The free version of Twent displays advertisements within AI
              responses, provided by our advertising partner koahlabs.com. Twent
              PRO ($20 one-time purchase) removes all ads and unlocks cosmetic
              perks, early access features, and zero marketplace commissions.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              6. Marketplace
            </h2>
            <p>
              The Twent Marketplace allows users to buy and sell agentic apps,
              skills, MCP servers, and other add-ons. Twent takes a commission
              on marketplace transactions. PRO users pay zero commission.
              Creators are responsible for the quality and legality of their
              listed items. Twent reserves the right to remove listings that
              violate these terms.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              7. Intellectual Property
            </h2>
            <p>
              Twent is a proprietary application. All rights not expressly
              granted are reserved. You may not reverse-engineer, decompile, or
              redistribute the App without written permission. User-generated
              content (workflows, character cards, skills) belongs to the
              creator.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              8. Third-Party Services
            </h2>
            <p>
              Twent integrates with third-party AI providers, advertising
              networks, and services. We are not responsible for the privacy
              practices, content, or availability of third-party services. Your
              use of third-party services is governed by their respective terms.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              9. Disclaimer of Warranties
            </h2>
            <p>
              Twent is provided "as is" without warranties of any kind. We do
              not guarantee that the App will be error-free, uninterrupted, or
              secure. AI-generated content may be inaccurate, incomplete, or
              inappropriate. You use the App at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Twent AI shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the App, including but not
              limited to data loss, device damage, or financial loss.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              11. Changes to Terms
            </h2>
            <p>
              We may update these Terms of Service at any time. Continued use of
              the App after changes constitutes acceptance of the updated terms.
              We will notify users of significant changes through the App or our
              website.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              12. Contact
            </h2>
            <p>
              Questions about these terms? Reach out at{" "}
              <a
                href="mailto:jeffrinjames@twent.xyz"
                className="text-blue-500 hover:underline"
              >
                jeffrinjames@twent.xyz
              </a>{" "}
              or join our{" "}
              <a
                href="https://discord.gg/dUFrWm4w"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Discord
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
