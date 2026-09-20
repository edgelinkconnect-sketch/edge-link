import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — EDGELINK Tours" },
      { name: "description", content: "Privacy Policy for EDGELINK Tours." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <span className="auth-eyebrow">EDGELINK Tours</span>
        <h1 className="mt-4 font-display text-4xl text-forest md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: September 18, 2026</p>

        <div className="mt-10 space-y-8 text-foreground/80">
          <section>
            <h2 className="font-display text-2xl text-forest">Information we collect</h2>
            <p className="mt-2 leading-7">
              We collect information you provide when you create an account, request a trip, contact us, or manage a booking. This can include your name, email address, phone number, travel preferences, and booking details.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-forest">How we use information</h2>
            <p className="mt-2 leading-7">
              We use your information to provide travel services, respond to inquiries, manage bookings, improve the website, and send service-related messages. We do not sell your personal information.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-forest">Storage and security</h2>
            <p className="mt-2 leading-7">
              We use reasonable administrative and technical safeguards to protect account and booking information. No online service can guarantee absolute security, so please protect your password and contact us promptly about suspicious activity.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-forest">Your choices</h2>
            <p className="mt-2 leading-7">
              You can ask us to review, correct, or delete personal information we hold about you, subject to legal and operational requirements. Contact the EDGELINK team through our contact page to make a request.
            </p>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
