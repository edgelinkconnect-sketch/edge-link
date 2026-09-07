import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Camera,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { NotificationToggle } from "@/components/notification-toggle";
import { useAuth } from "@/hooks/use-auth";

const LINKS = [
  { to: "/dashboard", key: "overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/bookings", key: "bookings", icon: Calendar },
  { to: "/dashboard/chat", key: "chat", icon: MessageSquare },
  { to: "/dashboard/experiences", key: "experiences", icon: Camera },
  { to: "/dashboard/profile", key: "profile", icon: Settings },
] as const;

export function DashboardShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { isAdmin, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <AppShell>
      <div className="mx-auto max-w-[90rem] gap-6 px-3 py-4 sm:px-5 lg:flex lg:py-6">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="dashboard-surface sticky top-24 space-y-1 rounded-lg p-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: "exact" in l }}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/75 transition hover:bg-muted data-[status=active]:bg-forest data-[status=active]:text-cream"
              >
                <l.icon className="h-4 w-4" /> {t(`dashboardNav.${l.key}`)}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gold hover:bg-muted"
              >
                <Shield className="h-4 w-4" /> {t("nav.adminPanel")}
              </Link>
            )}
            <NotificationToggle className="w-full justify-start" />
            <Button
              onClick={() => void signOut()}
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground"
            >
              <LogOut className="h-4 w-4" /> {t("nav.signOut")}
            </Button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile tabs */}
          <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: "exact" in l }}
                className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium data-[status=active]:border-forest data-[status=active]:bg-forest data-[status=active]:text-cream"
              >
                {t(`dashboardNav.${l.key}`)}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="shrink-0 rounded-full border border-gold px-3.5 py-1.5 text-xs font-medium text-gold"
              >
                {t("nav.adminPanel")}
              </Link>
            )}
          </div>

          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
            <div className="min-w-0">
              <h1 className="truncate font-display text-3xl font-normal text-forest sm:text-4xl">
                {title}
              </h1>
              {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {actions}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => void signOut()}
              >
                <LogOut className="mr-1.5 h-4 w-4" /> {t("nav.signOut")}
              </Button>
            </div>
          </div>

          {children}
        </div>
      </div>
    </AppShell>
  );
}
