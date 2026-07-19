import { Link } from "@tanstack/react-router";
import { Menu, X, User as UserIcon, LogIn } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "@/assets/rwiza-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();

  const NAV = [
    { to: "/", label: t("nav.home") },
    { to: "/destinations", label: t("nav.destinations") },
    { to: "/packages", label: t("nav.packages") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/sustainability", label: t("nav.sustainability") },
    { to: "/journal", label: t("nav.journal") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="RWIZA Travel and Tour logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-gold" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg font-bold tracking-wide text-forest">{t("brand.name")}</span>
            <span className="-mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("brand.tagline")}</span>
          </div>
        </Link>

        <nav className="ml-6 hidden flex-1 items-center gap-1 xl:flex" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-forest data-[status=active]:text-forest data-[status=active]:font-semibold"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          {user ? (
            <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
              <Link to={isAdmin ? "/admin" : "/dashboard"}>
                <UserIcon className="mr-1.5 h-4 w-4" />
                {isAdmin ? t("nav.admin") : t("nav.dashboard")}
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="ghost" className="hidden md:inline-flex">
              <Link to="/auth">
                <LogIn className="mr-1.5 h-4 w-4" /> {t("nav.signIn")}
              </Link>
            </Button>
          )}
          <Button asChild size="sm" className="hidden bg-gold text-gold-foreground shadow-luxe hover:brightness-95 md:inline-flex">
            <Link to="/contact">{t("nav.bookNow")}</Link>
          </Button>
          <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border bg-background xl:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  {n.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-gold px-3 py-2.5 text-center text-sm font-semibold text-gold-foreground">{t("nav.bookNow")}</Link>
              {user ? (
                <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setOpen(false)} className="rounded-md border border-forest px-3 py-2.5 text-center text-sm font-semibold text-forest">
                  {isAdmin ? t("nav.adminPanel") : t("nav.myDashboard")}
                </Link>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)} className="rounded-md border border-forest px-3 py-2.5 text-center text-sm font-semibold text-forest">
                  {t("nav.signIn")} / {t("nav.createAccount")}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
