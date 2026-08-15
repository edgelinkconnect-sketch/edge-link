import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Loader2, CheckCircle2, Search, MessageSquare, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ChatThread } from "@/components/chat/chat-thread";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/chat")({
  component: AdminChat,
});

const FILTERS = ["active", "resolved", "all"] as const;

function AdminChat() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("active");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  const { data: unread } = useQuery({
    queryKey: ["chats", "admin", "unread"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("chat_id")
        .eq("sender_role", "client")
        .eq("read_status", false);
      if (error) throw error;
      const map: Record<string, number> = {};
      for (const m of data ?? []) map[m.chat_id] = (map[m.chat_id] ?? 0) + 1;
      return map;
    },
    refetchInterval: 15000,
  });

  const filtered = (chats ?? []).filter((c) =>
    `${c.subject ?? ""} ${c.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  const active = filtered.find((c) => c.id === activeId) ?? filtered[0];

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("chats").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Conversation ${status}`);
    void qc.invalidateQueries({ queryKey: ["chats"] });
  };

  const totalUnread = Object.values(unread ?? {}).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Support chat</h1>
          <p className="text-sm text-muted-foreground">
            {totalUnread > 0 ? `${totalUnread} unread traveller message${totalUnread > 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs capitalize transition",
                filter === f ? "border-forest bg-forest text-cream" : "border-border bg-background hover:border-gold",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[21rem_1fr]">
        <Card className="flex max-h-[38rem] flex-col overflow-hidden p-0">
          <div className="relative border-b border-border p-3">
            <Search className="pointer-events-none absolute left-6 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations"
              className="h-9 pl-8 text-sm"
              aria-label="Search conversations"
            />
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {isLoading && <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin text-muted-foreground" />}
            {!isLoading && filtered.length === 0 && (
              <p className="p-6 text-center text-sm text-muted-foreground">No conversations.</p>
            )}
            {filtered.map((c) => {
              const count = unread?.[c.id] ?? 0;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "w-full rounded-xl border border-transparent p-3 text-left transition hover:bg-muted",
                    active?.id === c.id && "border-gold/40 bg-muted",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate font-semibold text-forest">{c.subject ?? "Conversation"}</div>
                    {count > 0 && (
                      <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-gold-foreground">
                        {count}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">
                    {c.category} · {formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true })}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          {active ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 p-3">
                <div>
                  <div className="font-display text-lg font-semibold text-forest">{active.subject ?? "Conversation"}</div>
                  <div className="text-xs text-muted-foreground">
                    {active.category} · status {active.status}
                  </div>
                </div>
                {active.status === "resolved" ? (
                  <Button size="sm" variant="outline" onClick={() => void setStatus(active.id, "active")}>
                    <RotateCcw className="mr-1.5 h-4 w-4" /> Reopen
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => void setStatus(active.id, "resolved")}>
                    <CheckCircle2 className="mr-1.5 h-4 w-4" /> Mark resolved
                  </Button>
                )}
              </div>
              <ChatThread chatId={active.id} role="admin" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">Select a conversation.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
