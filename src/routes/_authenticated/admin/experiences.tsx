import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/experiences")({
  component: AdminExperiences,
});

const FILTERS = ["pending", "approved", "rejected", "all"];

function AdminExperiences() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("pending");

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-experiences", filter],
    queryFn: async () => {
      let q = supabase
        .from("experiences")
        .select("*, tours(name, region)")
        .order("submitted_at", { ascending: false });
      if (filter !== "all") q = q.eq("status", filter);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });

  const decide = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("experiences")
      .update({ status, approved_at: status === "approved" ? new Date().toISOString() : null })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Experience ${status}`);
    void qc.invalidateQueries({ queryKey: ["admin-experiences"] });
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-forest">Experiences</h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs capitalize ${
              filter === f ? "border-forest bg-forest text-cream" : "border-border bg-background"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading && <Loader2 className="mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" />}
      {!isLoading && rows?.length === 0 && (
        <Card className="mt-6 p-10 text-center text-sm text-muted-foreground">Nothing here right now.</Card>
      )}

      <div className="mt-5 space-y-3">
        {rows?.map((x) => (
          <Card key={x.id} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-forest">{(x as { tours?: { name?: string } }).tours?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {"★".repeat(x.rating)} · {format(new Date(x.submitted_at), "PP")} · {x.images?.length ?? 0} photo(s)
                </div>
                <p className="mt-2 max-w-2xl text-sm">{x.message}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={x.status} />
                {x.status !== "approved" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-forest text-cream" onClick={() => void decide(x.id, "approved")}>
                      <Check className="mr-1.5 h-4 w-4" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void decide(x.id, "rejected")}>
                      <X className="mr-1.5 h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
