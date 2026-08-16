import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Map, Image as ImageIcon, Calendar, MessageSquare, Star, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { NotificationToggle } from "@/components/notification-toggle";

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

const LINKS: { to: string; label: string; icon: React.ElementType; exact?: boolean }[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/tours", label: "Tours", icon: Map },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/experiences", label: "Experiences", icon: Star },
  { to: "/admin/chat", label: "Chat", icon: MessageSquare },
];

function AdminLayout() {
  const { signOut, user } = useAuth();
  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-forest text-cream md:flex">
        <div className="border-b border-cream/10 px-6 py-5">
          <div className="font-display text-lg font-bold">EDGELINK Admin</div>
          <div className="mt-1 truncate text-xs text-cream/60">{user?.email}</div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.exact }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-cream/80 hover:bg-cream/10 data-[status=active]:bg-gold data-[status=active]:text-gold-foreground data-[status=active]:font-semibold"
            >
              <l.icon className="h-4 w-4" /> {l.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-cream/10 p-3">
          <Link to="/" className="mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-cream/70 hover:bg-cream/10">
            ← Back to site
          </Link>
          <button
            onClick={() => void signOut()}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-cream/70 hover:bg-cream/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="border-b border-border bg-background px-4 py-3 md:hidden">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.exact }}
                className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs data-[status=active]:bg-forest data-[status=active]:text-cream data-[status=active]:border-forest"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
