import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — EDGELINK Tours" },
      { name: "description", content: "Terms of Service for EDGELINK Tours." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <span className="auth-eyebrow">EDGELINK Tours</span>
        <h1 className="mt-4 font-display text-4xl text-forest md:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: September 18, 2026</p>

        <div className="mt-10 space-y-8 text-foreground/80">
          <section>
            <h2 className="font-display text-2xl text-forest">Using EDGELINK</h2>
            <p className="mt-2 leading-7">
              By using this website or creating an account, you agree to use EDGELINK Tours for lawful purposes and to provide accurate information when making an inquiry or booking.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-forest">Bookings and payments</h2>
            <p className="mt-2 leading-7">
              Trip details, availability, pricing, payment schedules, and cancellation terms will be confirmed with you before a booking is accepted. A booking is only final once EDGELINK confirms it in writing.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-forest">Responsible travel</h2>
            <p className="mt-2 leading-7">
              Guests are expected to follow local laws, guide instructions, conservation rules, and reasonable safety guidance during their journey.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-forest">Contact</h2>
            <p className="mt-2 leading-7">
              Questions about these terms can be sent through our contact page or to the EDGELINK team before you book.
            </p>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
