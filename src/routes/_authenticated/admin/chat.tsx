import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ChatThread } from "@/components/chat/chat-thread";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/chat")({
  component: AdminChat,
});

const FILTERS = ["open", "resolved", "all"] as const;

function AdminChat() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("open");
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats", "admin", filter],
    queryFn: async () => {
      let q = supabase
        .from("chats")
        .select("id, subject, category, status, last_message_at, client_id")
        .order("last_message_at", { ascending: false });
      if (filter !== "all") q = q.eq("status", filter);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    refetchInterval: 15000,
  });

  const active = chats?.find((c) => c.id === activeId) ?? chats?.[0];

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("chats").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Conversation ${status}`);
    void qc.invalidateQueries({ queryKey: ["chats"] });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold text-forest">Support chat</h1>
        <div className="flex gap-2">
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
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[20rem_1fr]">
        <Card className="max-h-[34rem] overflow-y-auto p-2">
          {isLoading && <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin text-muted-foreground" />}
          {chats?.length === 0 && <p className="p-4 text-sm text-muted-foreground">No conversations.</p>}
          {chats?.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full rounded-md p-3 text-left text-sm hover:bg-muted ${active?.id === c.id ? "bg-muted" : ""}`}
            >
              <div className="font-semibold text-forest">{c.subject ?? "Conversation"}</div>
              <div className="text-xs text-muted-foreground">
                {c.category} · {formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true })}
              </div>
            </button>
          ))}
        </Card>

        <Card className="overflow-hidden">
          {active ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-3">
                <div>
                  <div className="font-semibold text-forest">{active.subject ?? "Conversation"}</div>
                  <div className="text-xs text-muted-foreground">
                    {active.category} · status {active.status}
                  </div>
                </div>
                {active.status !== "resolved" && (
                  <Button size="sm" variant="outline" onClick={() => void setStatus(active.id, "resolved")}>
                    <CheckCircle2 className="mr-1.5 h-4 w-4" /> Mark resolved
                  </Button>
                )}
              </div>
              <ChatThread chatId={active.id} role="admin" />
            </>
          ) : (
            <div className="p-10 text-center text-sm text-muted-foreground">Select a conversation.</div>
          )}
        </Card>
      </div>
    </div>
  );
}
