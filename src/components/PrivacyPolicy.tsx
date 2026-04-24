import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PrivacyPolicy({
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
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500 mb-10">
          Last updated: April 22, 2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              1. Overview
            </h2>
            <p>
              Twent ("the App") is designed with privacy as a core principle.
              Your data stays on your device whenever possible. This policy
              explains what data we collect, why, and how it's handled.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              2. Data Stored Locally on Your Device
            </h2>
            <p>
              The following data is stored exclusively on your device using
              Android's local storage (SharedPreferences, Room database, file
              system). We do not have access to this data.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Chat history:</strong> All conversations with AI
                providers are stored locally. You can delete them at any time.
              </li>
              <li>
                <strong>API keys:</strong> Your API keys for third-party AI
                providers (OpenAI, Claude, Gemini, etc.) are stored on-device.
                They are sent directly to the respective provider's API — we
                never see or store them on our servers.
              </li>
              <li>
                <strong>Character cards & personality settings:</strong> Your AI
                customization data stays on your device.
              </li>
              <li>
                <strong>Memory vault:</strong> The AI's learned memories and
                context are stored locally.
              </li>
              <li>
                <strong>Workflows & skills:</strong> Your automation workflows
                and installed skills are local.
              </li>
              <li>
                <strong>User preferences:</strong> Theme, language, font
                settings, and app configuration.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              3. Data Sent to Third-Party AI Providers
            </h2>
            <p>
              When you use cloud-based AI providers, your messages and context
              are sent directly to the provider's API (OpenAI, Anthropic,
              Google, etc.) using your API key. Twent does not proxy, log, or
              store these requests on our servers. Each provider has its own
              privacy policy:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <a
                  href="https://openai.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  OpenAI Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.anthropic.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Anthropic Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Google Privacy Policy
                </a>
              </li>
            </ul>
            <p className="mt-2">
              <strong>Local AI inference</strong> (MNN/llama.cpp) processes data
              entirely on your device with no network requests. Use local models
              for maximum privacy.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              4. Permissions & What We Access
            </h2>
            <p>
              Twent requests Android permissions to enable its features. Each
              permission is used only for its stated purpose:
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs border border-zinc-200 dark:border-zinc-800">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900">
                    <th className="text-left p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Permission
                    </th>
                    <th className="text-left p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Internet
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Communicating with AI providers, web tools, marketplace
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Storage (Read/Write)
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      File management tools, media processing, backups
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Accessibility Services
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      UI automation (auto-click, screen reading, gesture
                      simulation). Optional — can be revoked anytime.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Microphone
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Voice input and wake-word detection
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Camera
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Image capture for AI vision analysis
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Location
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Location-aware tools (maps, nearby search)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Phone / SMS
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Call and messaging automation tools
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Overlay (Draw over apps)
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Floating assistant overlay
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Install packages
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      APK installation from marketplace
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Notifications
                    </td>
                    <td className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                      Workflow alerts, scheduled task notifications
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              5. Advertising
            </h2>
            <p>
              The free version of Twent displays ads within AI responses,
              powered by koahlabs.com. The ad provider may collect anonymized
              data (device type, ad interactions) as described in their privacy
              policy. Twent PRO ($20 one-time) removes all ads entirely.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              6. Analytics on Our Website
            </h2>
            <p>
              Our website (twent.xyz) uses Databuddy for privacy-friendly
              analytics. Databuddy does not use cookies and does not track
              individual users across sessions. It collects anonymized metrics
              like page views, device types, and referral sources. The Twent app
              itself does not include any analytics SDK.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              7. Data We Do NOT Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                We do not read, log, or store your chat messages on our servers.
              </li>
              <li>
                We do not access your API keys — they go directly from your
                device to the AI provider.
              </li>
              <li>
                We do not track your location, contacts, or browsing history.
              </li>
              <li>We do not sell user data to any third party.</li>
              <li>
                We do not use Firebase, Crashlytics, Sentry, or any
                crash-reporting SDK in the app.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              8. Local AI & Offline Mode
            </h2>
            <p>
              Twent supports fully local AI inference via MNN and llama.cpp
              (GGUF models). When using local models, no data leaves your device
              at all. You can use Twent entirely offline for AI chat, file
              management, terminal access, and local tools.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              9. Data Deletion
            </h2>
            <p>You can delete any data stored by Twent at any time:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Clear chat history from within the app</li>
              <li>Remove API keys from settings</li>
              <li>Uninstall the app to remove all local data</li>
              <li>
                Clear app data via Android Settings → Apps → Twent → Clear Data
              </li>
            </ul>
            <p className="mt-2">
              We have no server-side data to delete because we don't store your
              data on our servers.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              10. Children's Privacy
            </h2>
            <p>
              Twent is not directed at children under 13. We do not knowingly
              collect personal information from children. If you believe a child
              has provided data through the App, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy as the App evolves. Any changes
              will be posted on this page with an updated date. Continued use
              after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-secondary text-lg text-zinc-900 dark:text-zinc-100 mb-3">
              12. Contact
            </h2>
            <p>
              Privacy questions or concerns? Reach out at{" "}
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
