import { Link } from "@tanstack/react-router";
import logo from "@/assets/rwiza-logo.png.asset.json";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-forest-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="RWIZA" className="h-14 w-14 rounded-full ring-2 ring-gold" />
            <div>
              <div className="font-display text-xl font-bold">RWIZA</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Travel & Tour</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">Explore the Beauty of the Land of a Thousand Hills.</p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/destinations" className="hover:text-gold">Destinations</Link></li>
            <li><Link to="/tours" className="hover:text-gold">Tours</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/support" className="hover:text-gold">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />KG 7 Ave, Kigali, Rwanda</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />+250 788 000 000</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />hello@rwiza.travel</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">Follow</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-gold-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-primary-foreground/60 md:px-6">
        © {new Date().getFullYear()} RWIZA Travel & Tour · Explore the Beauty
      </div>
    </footer>
  );
}
