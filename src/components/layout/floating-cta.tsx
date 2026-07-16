import { Link } from "@tanstack/react-router";
import { MessageCircle, Sparkles } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      <a
        href="https://wa.me/250788000000"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-luxe transition hover:brightness-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <Link
        to="/contact"
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-primary-foreground shadow-luxe transition hover:bg-forest-deep"
      >
        <Sparkles className="h-4 w-4 text-gold" />
        <span>Book a Consultation</span>
      </Link>
    </div>
  );
}
