import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-forest-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-6">
        <div>
          <BrandLogo imageClassName="h-16 w-16" className="text-primary-foreground" />
          <p className="mt-4 text-sm text-primary-foreground/70">Journeys crafted for a lifetime — through the Land of a Thousand Hills.</p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/destinations" className="hover:text-gold">Destinations</Link></li>
            <li><Link to="/tours" className="hover:text-gold">Packages</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />KG 7 Ave, Kigali, Rwanda</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />+250 791 900 016</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />info@edgelinktours.com</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">Follow</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-gold-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-primary-foreground/60">Working hours: Mon–Sat, 08:00–19:00 CAT</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-primary-foreground/60 md:px-6">
        © {new Date().getFullYear()} EDGELINK Tours · Explore the Beauty
      </div>
    </footer>
  );
}
