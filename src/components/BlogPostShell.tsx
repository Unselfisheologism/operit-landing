import { type ComponentProps } from "react";
import { BounceSidebar } from "./ui/BounceSidebar";

export type BlogPostShellProps = {
  tocItems: Array<string | { label: string; href?: string }>;
  dotColor?: string;
  className?: ComponentProps<"div">["className"];
  children: React.ReactNode;
};

export function BlogPostShell({ tocItems, dotColor, className, children }: BlogPostShellProps) {
  return (
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
  );
}
