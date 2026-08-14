import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Download, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  component: AdminBookings,
});

const STATUSES = ["pending", "under_review", "available", "confirmed", "completed", "cancelled"];

function AdminBookings() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [notesFor, setNotesFor] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, tours(name, location)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (bookings ?? []).filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (!q) return true;
      return [b.booking_number, b.full_name, b.email, b.phone].some((v) => (v ?? "").toLowerCase().includes(q));
    });
  }, [bookings, filter, search]);

  const update = async (id: string, patch: { status?: string; admin_notes?: string }) => {
    const { error } = await supabase.from("bookings").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Booking updated");
    void qc.invalidateQueries({ queryKey: ["admin-bookings"] });
  };

  const exportCsv = () => {
    const head = ["Reference", "Status", "Tour", "Name", "Email", "Phone", "Adults", "Children", "Start", "End", "Created"];
    const body = rows.map((b) => [
      b.booking_number,
      b.status,
      (b as { tours?: { name?: string } }).tours?.name ?? "",
      b.full_name,
      b.email,
      b.phone,
      b.adults,
      b.children,
      b.travel_start ?? "",
      b.travel_end ?? "",
      b.created_at,
    ]);
    const csv = [head, ...body].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `edgelink-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold text-forest">Bookings</h1>
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download className="mr-1.5 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1.5 text-xs capitalize ${
              filter === s ? "border-forest bg-forest text-cream" : "border-border bg-background"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
        <div className="relative ml-auto w-full max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, ref" className="pl-8" />
        </div>
      </div>

      {isLoading && <Loader2 className="mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" />}
      {!isLoading && rows.length === 0 && (
        <Card className="mt-6 p-10 text-center text-sm text-muted-foreground">No bookings match this filter.</Card>
      )}

      <div className="mt-5 space-y-3">
        {rows.map((b) => (
          <Card key={b.id} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-[16rem]">
                <div className="font-mono text-xs text-muted-foreground">{b.booking_number}</div>
                <div className="font-semibold text-forest">
                  {(b as { tours?: { name?: string } }).tours?.name ?? "Tour"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {b.full_name} · {b.email} · {b.phone}
                </div>
                <div className="text-xs text-muted-foreground">
                  {b.adults} adults{b.children ? `, ${b.children} children` : ""}
                  {b.travel_start ? ` · ${format(new Date(b.travel_start), "PP")}` : ""}
                  {` · requested ${format(new Date(b.created_at), "PP")}`}
                </div>
                {b.special_requests && <p className="mt-2 max-w-2xl text-sm">{b.special_requests}</p>}
                {b.admin_notes && (
                  <p className="mt-2 max-w-2xl rounded-md bg-muted p-2 text-xs">Internal: {b.admin_notes}</p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={b.status} />
                <select
                  value={b.status}
                  onChange={(e) => void update(b.id, { status: e.target.value })}
                  className="rounded-md border border-input bg-background px-2 py-1.5 text-xs"
                  aria-label="Change status"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNotesFor(notesFor === b.id ? null : b.id);
                    setNoteDraft(b.admin_notes ?? "");
                  }}
                >
                  Internal note
                </Button>
              </div>
            </div>

            {notesFor === b.id && (
              <div className="mt-3 space-y-2">
                <Textarea rows={3} value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} />
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setNotesFor(null)}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-forest text-cream"
                    onClick={() => {
                      void update(b.id, { admin_notes: noteDraft });
                      setNotesFor(null);
                    }}
                  >
                    Save note
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
