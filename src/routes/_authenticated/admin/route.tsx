import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Map,
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  Newspaper,
  Star,
  LogOut,
  Circle,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "react-i18next";
import { NotificationToggle } from "@/components/notification-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw redirect({ to: "/auth", search: { redirect: location.href } });
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AdminLayout,
});

const LINKS: { to: string; key: string; icon: React.ElementType; exact?: boolean }[] = [
  { to: "/admin", key: "overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/tours", key: "tours", icon: Map },
  { to: "/admin/gallery", key: "gallery", icon: ImageIcon },
  { to: "/admin/journal", key: "journal", icon: Newspaper },
  { to: "/admin/quotations", key: "bookings", icon: Calendar },
  { to: "/admin/experiences", key: "experiences", icon: Star },
  { to: "/admin/chat", key: "chat", icon: MessageSquare },
];

function AdminLayout() {
  const { signOut, user } = useAuth();
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen bg-forest-deep text-cream">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-cream/10 bg-forest-deep md:flex">
        <div className="border-b border-cream/10 px-5 py-5">
          <BrandLogo
            imageClassName="h-14 w-14"
            className="text-cream"
          />
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-cream/45">
            Admin account · operator console
          </div>
          <NotificationToggle className="mt-3 border-cream/30 text-cream hover:bg-cream/10" />
          <div className="mt-2 flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.exact }}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream/65 transition hover:bg-cream/5 hover:text-cream data-[status=active]:border-r-2 data-[status=active]:border-gold data-[status=active]:bg-gold/10 data-[status=active]:font-semibold data-[status=active]:text-gold"
            >
              <l.icon className="h-4 w-4" /> {t(`admin.${l.key}`)}
            </Link>
          ))}
        </nav>
        <div className="border-t border-cream/10 p-3">
          <div className="mb-3 flex items-center gap-3 rounded-md bg-cream/5 p-3">
            <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gold font-semibold text-gold-foreground">
              {(user?.email?.[0] ?? "S").toUpperCase()}
              <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-gold text-forest-deep" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold">Admin account</div>
              <div className="truncate text-[10px] text-cream/55">{user?.email}</div>
            </div>
          </div>
          <Link
            to="/"
            className="mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-cream/70 hover:bg-cream/10"
          >
            ← {t("common.back")}
          </Link>
          <Button
            onClick={() => void signOut()}
            variant="ghost"
            className="w-full justify-start gap-3 text-cream/70 hover:bg-cream/10 hover:text-cream"
          >
            <LogOut className="h-4 w-4" /> {t("nav.signOut")}
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden bg-background text-foreground md:rounded-l-lg">
        <div className="border-b border-border bg-background px-4 py-3 md:hidden">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <NotificationToggle />
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.exact }}
                className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs data-[status=active]:bg-forest data-[status=active]:text-cream data-[status=active]:border-forest"
              >
                {t(`admin.${l.key}`)}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-3 sm:p-5 md:p-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
