import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";
import { SocialLinksInline } from "./SocialLinks";

// Grain overlay for editorial print feel
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

// Schema markup for SoftwareApplication
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Twent - Terminal on Android",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Android",
    description:
      "Full Ubuntu 24.04 LTS terminal on your Android phone with apt package manager. Run apt install nginx, python3 -m venv, git clone && npm install && npm run build, ssh -i ~/.ssh/key user@host. Real Linux environment — not a toy emulator.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Ubuntu 24.04 LTS (jammy)",
      "apt package manager (dpkg)",
      "Python 3.12 with pip and venv",
      "Node.js 20 LTS with npm",
      "Go 1.22 compiler toolchain",
      "Rust 1.77 stable",
      "Git 2.43 with GitHub CLI",
      "OpenSSH client and server (ssh, sshd)",
      "Vim 9, nano, emacs editors",
      "Docker CLI for container management",
      "systemd init scripts",
      "cron job scheduling",
      "Full filesystem access (/home, /root, /etc)",
      "Background process persistence",
      "Multiple terminal sessions (tmux)",
      "Nerd Font glyph rendering",
      "No root required",
    ],
    screenshot: "https://twent.xyz/terminal-hero.webp",
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

function BreadcrumbSchema() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://twent.xyz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://twent.xyz/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Terminal on Android",
        item: "https://twent.xyz/blog/terminal-on-android",
      },
    ],
  };
  return (
    <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
  );
}

// Feature card component
function FeatureCard({
  icon,
  title,
  description,
  visible,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
    >
      <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2 font-semibold">
        {title}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function TerminalOnAndroid({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [comparisonRef, comparisonInView] = useInView();
  const [ctaRef, _ctaInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <SchemaMarkup />
      <BreadcrumbSchema />
      <GrainOverlay />
      <Nav dark={dark} onToggle={onToggle} />

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Breadcrumb */}
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500">
                For Developers
              </span>
            </div>

            {/* Main Headline */}
            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                Terminal on Android:{" "}
                <span className="text-blue-500">Real Ubuntu, Not a Toy</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`transition-all duration-700 delay-200 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mb-8">
                Terminal on Android, the real way: Twent gives you{" "}
                <strong>Ubuntu 24.04 LTS</strong> with{" "}
                <strong>apt install nginx</strong>,{" "}
                <strong>python3 -m venv</strong>,{" "}
                <strong>git clone && npm install && npm run build</strong>, and
                real <strong>systemd services</strong>. No root required — real
                Linux in your pocket.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-300 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {[
                { label: "Ubuntu Version", value: "24.04 LTS", suffix: "" },
                { label: "Package Manager", value: "apt", suffix: "" },
                { label: "Language Runtimes", value: "7+", suffix: "" },
                { label: "Storage (base)", value: "3.5GB", suffix: "" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="font-display text-3xl text-blue-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="https://assets.twent.xyz/app-release.apk"
                aria-label="Download Twent APK"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
              >
                Download Free APK
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <a
                href="/docs#shell"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors duration-200"
              >
                View Terminal Docs
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-zinc-400 dark:text-zinc-600">
                Follow:
              </span>
              <SocialLinksInline />
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`max-w-6xl mx-auto px-6 mt-16 transition-all duration-700 delay-500 ${
              heroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img
                src="/terminal-hero.webp"
                width="1200"
                height="630"
                fetchPriority="high"
                alt="Twent Terminal on Android - Full Ubuntu 24.04 Linux terminal environment - SSH client, command line, mobile server management"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-mono">
                  apt install nginx | python3 -m venv | ssh -i ~/.ssh/key |
                  docker build — your Linux dev environment in your pocket
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              The Problem: Android Terminals Are Broken for Developers
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              You need to run <code>apt install postgresql</code>, set up a cron
              job that scrapes prices overnight, or SSH into your home lab from
              anywhere. But every terminal emulator fails in a specific way.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  problem: "No apt Package Manager",
                  desc: "Can't run apt install nginx, apt install postgresql, or any apt install command. You're stuck with whatever binaries the app bundled.",
                },
                {
                  problem: "No Real Linux Filesystem",
                  desc: "No /etc/systemd, no /var/log, no real /home directory. Android's chroot limitations mean no systemd services, no proper init scripts, no cron daemon.",
                },
                {
                  problem: "Requires Root for Anything Useful",
                  desc: "Want to bind mount directories or run privileged ports? Root your phone. Void your warranty. Introduce security holes. All for a terminal emulator.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <p className="font-display text-lg text-red-500 mb-2">
                    {item.problem}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Run Real Linux Commands on Your Phone
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Run a cron job that scrapes prices overnight. SSH into your home
                lab from anywhere. Build and deploy a Docker container. All from
                your Android phone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="apt Package Manager"
                description="Run apt install nginx, apt install postgresql-16, apt install redis-server. Any Ubuntu package works. Full dpkg support with proper dependency resolution. <a href='/android-automation-power-user' className='text-blue-500 hover:underline'>Combine with UI automation &rarr;</a>"
                visible={featuresInView}
                delay={0.1}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                }
                title="Python, Node.js, Go, Rust"
                description="python3 -m venv .venv && source .venv/bin/activate. node --version, go build, cargo build. Run git clone && npm install && npm run build to deploy. <a href='/ai-agent-for-developers' className='text-blue-500 hover:underline'>See full developer workflow &rarr;</a>"
                visible={featuresInView}
                delay={0.2}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
                title="Git & GitHub CLI"
                description="git clone https://github.com/user/repo.git && cd repo && git checkout -b fix/bug && git commit -m 'fix: issue' && gh pr create. Full GitHub CLI with issue tracking, PR reviews, and workflow automation. <a href='/ai-agent-for-developers' className='text-blue-500 hover:underline'>See how developers use it &rarr;</a>"
                visible={featuresInView}
                delay={0.3}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                }
                title="SSH Client & Server"
                description="ssh -i ~/.ssh/key user@host to access your servers. sshd to run a server on your phone. scp and sftp for file transfers. ssh-copy-id for key management. <a href='/ai-agent-for-developers' className='text-blue-500 hover:underline'>See developer use cases &rarr;</a>"
                visible={featuresInView}
                delay={0.4}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                }
                title="systemd & cron"
                description="systemctl enable nginx && systemctl start nginx. crontab -e to schedule jobs. Run a cron job that scrapes prices overnight and emails you the results. <a href='/android-automation-power-user' className='text-blue-500 hover:underline'>See automation possibilities &rarr;</a>"
                visible={featuresInView}
                delay={0.5}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                }
                title="No Root Required"
                description="Full Linux environment without rooting your device. Works on any Android 8+ phone. No warranty void, no security risks, no TWRP recovery needed. <a href='/privacy-first-ai-android' className='text-blue-500 hover:underline'>See our privacy-first approach &rarr;</a>"
                visible={featuresInView}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section
          ref={comparisonRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                How Twent Compares
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Only Twent gives you real apt, systemd services, and Docker CLI
                — no root required.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-4 font-display text-zinc-900 dark:text-zinc-100">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-display text-blue-500">
                      Twent
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Termux
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      UserLand
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Android Shell
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "apt install nginx",
                      "Full apt",
                      "pkg install",
                      "apt",
                      "No apt",
                    ],
                    [
                      "systemd services",
                      "systemctl",
                      "No systemd",
                      "No systemd",
                      "No systemd",
                    ],
                    [
                      "Docker CLI",
                      "docker build",
                      "No Docker",
                      "docker",
                      "No Docker",
                    ],
                    [
                      "cron jobs",
                      "crontab -e",
                      "cron support",
                      "Limited cron",
                      "No cron",
                    ],
                    ["sshd server", "sshd enabled", "sshd", "sshd", "No sshd"],
                    [
                      "Full /home dir",
                      "Real home",
                      "$PREFIX/home",
                      "chroot home",
                      "No home",
                    ],
                    [
                      "No root required",
                      "Works without root",
                      "Works without root",
                      "Root preferred",
                      "No root",
                    ],
                    [
                      "tmux/screen",
                      "tmux + screen",
                      "tmux only",
                      "Limited",
                      "No tmux",
                    ],
                    [
                      "Background tasks",
                      "nohup & disown",
                      "nohup",
                      "nohup",
                      "Killed on sleep",
                    ],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-100 dark:border-zinc-800/50 transition-all duration-500 ${
                        comparisonInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: comparisonInView
                          ? `${0.1 + i * 0.05}s`
                          : "0s",
                      }}
                    >
                      <td className="py-4 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {row[0]}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[1] === "Full apt" ||
                        row[1] === "systemctl" ||
                        row[1] === "docker build" ||
                        row[1] === "crontab -e" ||
                        row[1] === "sshd enabled" ||
                        row[1] === "Real home" ||
                        row[1] === "Works without root" ||
                        row[1] === "tmux + screen" ||
                        row[1] === "nohup & disown" ? (
                          <span className="text-green-500 font-bold">Yes</span>
                        ) : row[1] === "No apt" ||
                          row[1] === "No systemd" ||
                          row[1] === "No Docker" ||
                          row[1] === "No cron" ||
                          row[1] === "No sshd" ||
                          row[1] === "No home" ||
                          row[1] === "Killed on sleep" ||
                          row[1] === "No tmux" ? (
                          <span className="text-red-400">No</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[1]}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[2] === "pkg install" ? (
                          <span className="text-green-500 font-bold">Yes</span>
                        ) : row[2] === "No systemd" ||
                          row[2] === "No Docker" ? (
                          <span className="text-red-400">No</span>
                        ) : row[2] === "Limited cron" ? (
                          <span className="text-yellow-500 text-xs">
                            Limited
                          </span>
                        ) : row[2] === "sshd" ||
                          row[2] === "$PREFIX/home" ||
                          row[2] === "Works without root" ||
                          row[2] === "tmux only" ||
                          row[2] === "nohup" ? (
                          <span className="text-green-500 font-bold">Yes</span>
                        ) : (
                          <span className="text-red-400">No</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[3] === "apt" ? (
                          <span className="text-green-500 font-bold">Yes</span>
                        ) : row[3] === "No systemd" ? (
                          <span className="text-red-400">No</span>
                        ) : row[3] === "docker" ? (
                          <span className="text-green-500 font-bold">Yes</span>
                        ) : row[3] === "Limited cron" ||
                          row[3] === "sshd" ||
                          row[3] === "chroot home" ? (
                          <span className="text-yellow-500 text-xs">
                            Limited
                          </span>
                        ) : row[3] === "Root preferred" ? (
                          <span className="text-red-400">Root req.</span>
                        ) : (
                          <span className="text-red-400">No</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[4] === "No apt" ||
                        row[4] === "No systemd" ||
                        row[4] === "No Docker" ||
                        row[4] === "No cron" ||
                        row[4] === "No sshd" ||
                        row[4] === "No home" ||
                        row[4] === "Killed on sleep" ||
                        row[4] === "No tmux" ? (
                          <span className="text-red-400">No</span>
                        ) : (
                          <span className="text-red-400">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-blue-500">
                  Twent is the only Android terminal
                </strong>{" "}
                with real apt package management, systemd service support, and
                Docker CLI. Run apt install postgresql-16 && systemctl enable
                postgresql on your phone. No root required.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Developer FAQ
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "Does it support systemd services?",
                  a: "Yes. systemctl enable nginx && systemctl start nginx works. You can manage services, view logs with journalctl -u nginx, and set up init scripts. Runs in a proper systemd environment.",
                },
                {
                  q: "Can I run Docker containers?",
                  a: "The Docker CLI is included. You can docker build images, docker run containers, and docker ps to manage them. Note: Docker daemon requires root, but the CLI works for building and connecting to remote hosts.",
                },
                {
                  q: "How much storage does Ubuntu take?",
                  a: "The base Ubuntu 24.04 LTS system requires ~3.5GB. Adding packages like nginx, postgresql, or docker adds more. Most developers use 5-10GB total depending on their tools.",
                },
                {
                  q: "Does it work without root?",
                  a: "Yes, 100%. Twent runs as a standard Android app with no special permissions. You get full apt, sshd, cron, and most Linux features without rooting your device.",
                },
                {
                  q: "Can I schedule cron jobs?",
                  a: "Yes. crontab -e opens the editor. Add */5 * * * * /path/to/script.sh to run jobs periodically. Works great for scraping prices overnight, backing up files, or monitoring servers.",
                },
                {
                  q: "How do I SSH into my home lab?",
                  a: "ssh -i ~/.ssh/home_lab user@your-home-ip -p 22. Store your keys in ~/.ssh/, use ssh-copy-id to set up passwordless login, and add entries to ~/.ssh/config for shortcuts.",
                },
                {
                  q: "What Python version is included?",
                  a: "Python 3.12 with pip, setuptools, and venv support. Run python3 -m venv .venv && source .venv/bin/activate && pip install requests to set up a project environment.",
                },
                {
                  q: "Can I run Node.js build tools?",
                  a: "Yes. Node.js 20 LTS is installed with npm and yarn. git clone https://github.com/user/app.git && cd app && npm install && npm run build works exactly as on your desktop.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    {item.q}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-20 md:py-28 px-6 bg-zinc-900 dark:bg-zinc-950"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-6">
              Ready to Code on Your Phone?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Run apt install nginx, set up a cron job that scrapes prices
              overnight, and SSH into your servers from anywhere. Free forever,
              no root required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://assets.twent.xyz/app-release.apk"
                aria-label="Download Twent APK"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
              >
                Download Free APK
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <a
                href="/docs#shell"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 hover:border-zinc-600 text-white font-medium transition-colors duration-200"
              >
                Read the Docs
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="text-xs text-zinc-500">Follow:</span>
              <SocialLinksInline />
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Free forever. No subscriptions. No ads in the core experience.
            </p>
          </div>
        </section>
        {/* Related Pages */}
        <section className="py-16 px-6 bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-zinc-400 mb-6 text-center">
              Explore Other Audiences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a
                href="/ai-agent-for-developers"
                className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200"
              >
                <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors mb-1">
                  AI Agent for Developers
                </div>
                <div className="text-xs text-zinc-500">
                  Claude Code, MCP tools, GitHub CLI, full IDE on mobile
                </div>
              </a>
              <a
                href="/android-automation-power-user"
                className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200"
              >
                <div className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors mb-1">
                  Automation Power User
                </div>
                <div className="text-xs text-zinc-500">
                  Automate everything — apps, APIs, Tasker, cron jobs
                </div>
              </a>
              <a
                href="/privacy-first-ai-android"
                className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200"
              >
                <div className="text-sm font-medium text-white group-hover:text-green-400 transition-colors mb-1">
                  Privacy-First AI
                </div>
                <div className="text-xs text-zinc-500">
                  BYOK encryption, local MNN models, zero telemetry
                </div>
              </a>
              <a
                href="/ai-marketplace-creators"
                className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200"
              >
                <div className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors mb-1">
                  Marketplace Creators
                </div>
                <div className="text-xs text-zinc-500">
                  Sell AI skills, MCP servers, and custom tools
                </div>
              </a>
              <a
                href="/enterprise-ai-agent"
                className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200"
              >
                <div className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Enterprise
                </div>
                <div className="text-xs text-zinc-500">
                  On-premise deployment, custom workflows, team management
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
