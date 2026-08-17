import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { BounceSidebar } from "./ui/BounceSidebar";

interface BlogPostLayoutProps {
  dark?: boolean;
  tocItems: Array<string | { label: string; href?: string }>;
  dotColor?: string;
  children: ReactNode;
  className?: ComponentPropsWithoutRef<"section">["className"];
}

export function BlogPostLayout({
  dark,
  tocItems,
  dotColor,
  children,
  className,
}: BlogPostLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <Nav dark={dark} />

      <main>
        <section className={`max-w-4xl mx-auto px-6 pb-24 ${className ?? ""}`}>
          <div className="animate-fadeIn">
            <div className="grid md:grid-cols-[1fr_220px] gap-12">
              <article className="min-w-0">{children}</article>

              <aside className="hidden md:block">
                <div className="sticky top-24">
                  <BounceSidebar items={tocItems} dotColor={dotColor} />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
