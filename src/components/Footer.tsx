export function Footer() {
  const links = {
    Product: [
      { label: "Features", href: "#features", external: false, icon: null },
      { label: "Marketplace", href: "#marketplace", external: false, icon: null },
      { label: "Pricing", href: "#pricing", external: false, icon: null },
      { label: "FAQ", href: "#faq", external: false, icon: null },
      { label: "UI Automation", href: "#ui-automation", external: false, icon: null },
    ],
    Company: [
      { label: "About", href: "https://x.com/Jeff9James", external: true, icon: null },
      { label: "Blog", href: "/blog", external: false, icon: null },
      { label: "Contact", href: "mailto:jeffrin@twent.xyz", external: false, icon: null },
    ],
    Resources: [
      { label: "Documentation", href: "/docs", external: false, icon: null },
      {
        label: "Changelog",
        href: "https://github.com/AAswordman/Operit/releases",
        external: true,
        icon: null,
      },
      { label: "Discord", href: "https://discord.gg/dUFrWm4w", external: true, icon: null },
    ],
    Connect: [
      {
        label: "Twitter / X",
        href: "https://x.com/Jeff9James",
        external: true,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path>
          </svg>
        ),
      },
      {
        label: "Discord",
        href: "https://discord.gg/dUFrWm4w",
        external: true,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M26.413,6.536c-1.971-.902-4.052-1.543-6.189-1.904-.292,.523-.557,1.061-.793,1.612-2.277-.343-4.592-.343-6.869,0-.236-.551-.5-1.089-.793-1.612-2.139,.365-4.221,1.006-6.194,1.909C1.658,12.336,.596,17.987,1.127,23.558h0c2.294,1.695,4.861,2.984,7.591,3.811,.615-.827,1.158-1.704,1.626-2.622-.888-.332-1.744-.741-2.56-1.222,.215-.156,.425-.316,.628-.472,4.806,2.26,10.37,2.26,15.177,0,.205,.168,.415,.328,.628,.472-.817,.483-1.676,.892-2.565,1.225,.467,.918,1.011,1.794,1.626,2.619,2.732-.824,5.301-2.112,7.596-3.808h0c.623-6.461-1.064-12.06-4.46-17.025Zm-15.396,13.596c-1.479,0-2.702-1.343-2.702-2.994s1.18-3.006,2.697-3.006,2.73,1.354,2.704,3.006-1.192,2.994-2.699,2.994Zm9.967,0c-1.482,0-2.699-1.343-2.699-2.994s1.18-3.006,2.699-3.006,2.723,1.354,2.697,3.006-1.189,2.994-2.697,2.994Z"></path>
          </svg>
        ),
      },
      {
        label: "Email",
        href: "mailto:jeffrin@twent.xyz",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
          </svg>
        ),
      },
    ],
  };

  return (
    <footer className="relative border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/OKFINALTWENTLOGO-removebg.png"
              alt="Twent"
              className="w-12 h-12 object-contain"
            />
            <span className="font-display text-lg text-zinc-900 dark:text-zinc-100">
              Twent
            </span>
          </div>
          <p className="text-sm text-zinc-500 max-w-sm">
            Your personal agentic OS. An AI that can see, think, and act.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-secondary text-orange-500 uppercase tracking-[0.2em] mb-4">
                {category}
              </h4>
              <ul
                className={
                  category === "Connect"
                    ? "flex flex-row items-center gap-4"
                    : "space-y-2.5"
                }
              >
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors tracking-wide flex items-center gap-2"
                    >
                      {item.icon ? item.icon : item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/OKFINALTWENTLOGO-removebg.png"
              alt="Twent"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
              © 2026 Twent AI. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-400 dark:text-zinc-600">
            <a
              href="#"
              className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors tracking-wide"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors tracking-wide"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
