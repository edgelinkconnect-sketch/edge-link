import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Plus, Loader2, MessageSquare, Search } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { ChatThread } from "@/components/chat/chat-thread";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard/chat")({
  head: () => ({
    meta: [
      { title: "Support chat — EDGELINK Tours" },
      {
        name: "description",
        content:
          "Message your EDGELINK Tours travel designer in real time about bookings, itineraries and payments.",
      },
      { property: "og:title", content: "Support chat — EDGELINK Tours" },
      { property: "og:description", content: "Message your travel designer in real time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClientChat,
});

const CATEGORIES = ["Booking", "Itinerary", "Payment", "General"];

function ClientChat() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chats")
        .select("id, subject, category, status, last_message_at")
        .eq("client_id", user!.id)
        .order("last_message_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  const create = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("chats")
        .insert({ client_id: user!.id, subject: subject.trim() || "New conversation", category })
        .select("id")
        .single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: (id) => {
      setNewOpen(false);
      setSubject("");
      setActiveId(id);
      void qc.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Conversation started");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = (chats ?? []).filter((c) =>
    `${c.subject ?? ""} ${c.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  const active = filtered.find((c) => c.id === activeId) ?? filtered[0];

  return (
    <DashboardShell
      title="Support chat"
      description="A direct line to your dedicated EDGELINK travel team."
      actions={
        <Button
          size="sm"
          onClick={() => setNewOpen(true)}
          className="bg-gold text-gold-foreground hover:brightness-95"
        >
          <Plus className="mr-1.5 h-4 w-4" /> New conversation
        </Button>
      }
    >
      <div>
        <div className="grid gap-3 lg:grid-cols-[19rem_minmax(0,1fr)]">
          <Card className="dashboard-surface flex h-[min(68vh,44rem)] min-h-[32rem] flex-col overflow-hidden p-0">
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
              {isLoading && (
                <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin text-muted-foreground" />
              )}
              {!isLoading && filtered.length === 0 && (
                <div className="p-6 text-center">
                  <MessageSquare className="mx-auto h-5 w-5 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No conversations yet.</p>
                </div>
              )}
              {filtered.map((c) => (
                <Button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "h-auto w-full justify-start rounded-md border border-transparent p-3 text-left transition hover:bg-muted",
                    active?.id === c.id && "border-gold/40 bg-muted",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate font-semibold text-forest">{c.subject}</div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide",
                          c.status === "resolved"
                            ? "bg-muted text-muted-foreground"
                            : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                        )}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                      {c.category} ·{" "}
                      {formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true })}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="dashboard-surface overflow-hidden p-0">
            {active ? (
              <>
                <div className="border-b border-border bg-muted/40 px-4 py-3">
                  <div className="font-display text-lg font-semibold text-forest">
                    {active.subject}
                  </div>
                  <div className="text-xs text-muted-foreground">{active.category}</div>
                </div>
                <ChatThread chatId={active.id} role="client" />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="rounded-full bg-forest/10 p-4 text-forest">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <p className="mt-4 font-semibold text-forest">Start a conversation</p>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                  Ask about availability, permits, or a fully bespoke itinerary — we reply fast.
                </p>
                <Button
                  onClick={() => setNewOpen(true)}
                  className="mt-5 bg-gold text-gold-foreground hover:brightness-95"
                >
                  <Plus className="mr-1.5 h-4 w-4" /> New conversation
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New conversation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Subject</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Question about my gorilla trek"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs transition",
                      category === c
                        ? "border-forest bg-forest text-cream"
                        : "border-border hover:border-gold",
                    )}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => create.mutate()}
              disabled={create.isPending}
              className="w-full bg-gold text-gold-foreground"
            >
              {create.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Start chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
