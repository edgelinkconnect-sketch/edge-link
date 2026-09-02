import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/_authenticated/dashboard/bookings")({
  head: () => ({ meta: [{ title: "My bookings — EDGELINK Tours" }, { name: "robots", content: "noindex" }] }),
  component: MyBookings,
});

function MyBookings() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings-full", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("id, booking_number, status, travel_start, travel_end, adults, children, special_requests, created_at, tours(name, location, duration)")
        .eq("client_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  const cancel = async (id: string, number: string) => {
    const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Booking ${number} cancelled`);
    void qc.invalidateQueries({ queryKey: ["my-bookings-full"] });
    void qc.invalidateQueries({ queryKey: ["my-bookings"] });
  };

  return (
    <DashboardShell
      title="My bookings"
      description="Track requests, confirmations and completed journeys."
      actions={
        <Button asChild variant="outline" size="sm">
          <Link to="/tours">Book another</Link>
        </Button>
      }
    >
      <div>

        {isLoading && <Loader2 className="mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" />}

        {bookings?.length === 0 && (
          <Card className="mt-6 p-10 text-center text-sm text-muted-foreground">
            No bookings yet. Explore our <Link to="/tours" className="underline">itineraries</Link>.
          </Card>
        )}

        <div className="mt-6 space-y-4">
          {bookings?.map((b) => {
            const tour = (b as { tours?: { name?: string; location?: string; duration?: string } }).tours;
            return (
              <Card key={b.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">{b.booking_number}</div>
                    <div className="font-display text-lg font-bold text-forest">{tour?.name ?? "Tour"}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {tour?.location} · {tour?.duration} · {b.adults} adults
                      {b.children ? `, ${b.children} children` : ""}
                    </div>
                    {b.travel_start && (
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(b.travel_start), "PP")}
                        {b.travel_end ? ` → ${format(new Date(b.travel_end), "PP")}` : ""}
                      </div>
                    )}
                    {b.special_requests && <p className="mt-2 max-w-xl text-sm">{b.special_requests}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={b.status} />
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={whatsappUrl(`Hello EDGELINK Tours, about booking ${b.booking_number}:`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp
                        </a>
                      </Button>
                      {b.status === "pending" && (
                        <Button size="sm" variant="outline" onClick={() => void cancel(b.id, b.booking_number)}>
                          Cancel
                        </Button>
                      )}
                      {b.status === "completed" && (
                        <Button asChild size="sm" className="bg-gold text-gold-foreground">
                          <Link to="/dashboard/experiences">Share experience</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
