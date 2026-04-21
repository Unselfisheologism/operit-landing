import { Pricing } from "./Pricing";
import { Footer } from "./Footer";

export function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <main>
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}
