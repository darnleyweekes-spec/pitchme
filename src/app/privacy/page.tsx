import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy overview for PitchMe by Prime24 AI.",
};

export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Privacy</p>
        <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Privacy overview</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">Last updated August 20, 2026. PitchMe is an early-access product by Prime24 AI.</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
          <section>
            <h2 className="font-display text-xl font-medium text-ink">What PitchMe stores</h2>
            <p className="mt-2">Google sign-in provides basic account information such as your email address. Candidate profile fields, visibility preferences, and received role pitches are stored so the product can operate.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">What becomes public</h2>
            <p className="mt-2">Candidate profiles start private. If you opt into Browse Talent, only your public profile ID, name, title, location, headline, and open-to-offers status are exposed through the public marketplace. Your email address and authentication user ID are not included in the public profile view.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Service providers</h2>
            <p className="mt-2">PitchMe currently relies on Google for OAuth sign-in, Supabase for authentication and database services, and Cloudflare for website hosting and delivery. Those providers process data according to their own terms and privacy practices.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Your controls</h2>
            <p className="mt-2">You can make your candidate profile private or turn off new pitches from your dashboard. To request account or data deletion during early access, email darnleyweekes@prime24ai.com.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Early-access status</h2>
            <p className="mt-2">This page is a plain-language product privacy overview, not a substitute for legal advice. The policy may be updated as employer accounts, billing, and additional product features are introduced.</p>
          </section>
        </div>
      </div>
    </Container>
  );
}
