import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, Globe, User, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/rwiza-logo.png.asset.json";
import { useI18n, LANGS, type Lang } from "@/lib/i18n";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/", key: "nav_home" as const },
  { to: "/destinations", key: "nav_destinations" as const },
  { to: "/tours", key: "nav_tours" as const },
  { to: "/about", key: "nav_about" as const },
  { to: "/dashboard", key: "nav_dashboard" as const },
  { to: "/admin", key: "nav_admin" as const },
];

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme, user, signIn, signOut } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src={logo.url} alt="RWIZA" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg font-bold tracking-wide text-forest">RWIZA</span>
            <span className="-mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Travel & Tour</span>
          </div>
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-foreground"
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Globe className="h-4 w-4" />
                <span className="hidden text-xs font-semibold sm:inline">{lang.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
              {LANGS.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLang(l.code as Lang)} className="gap-2">
                  <span className="text-base">{l.flag}</span>
                  <span className="font-medium">{l.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                <span className="hidden text-xs font-semibold sm:inline">{user.role === "guest" ? "Sign In" : user.name.split(" ")[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">Switch Role</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => signIn("Aisha Uwimana", "client")}>Client (Aisha)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signIn("Emmanuel Nkurunziza", "guide")}>Guide (Emmanuel)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signIn("Rwiza Admin", "admin")}>Admin</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>{t("cta_signout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild size="sm" className="ml-1 hidden bg-gold text-gold-foreground shadow-luxe hover:brightness-95 md:inline-flex">
            <Link to="/booking">{t("cta_book")}</Link>
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden animate-fade-in">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {[...NAV, { to: "/guide", key: "nav_guide" as const }, { to: "/media", key: "nav_media" as const }, { to: "/support", key: "nav_support" as const }, { to: "/booking", key: "cta_book" as const }].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
