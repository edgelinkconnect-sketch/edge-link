import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Plus, Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { ChatThread } from "@/components/chat/chat-thread";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/chat")({
  head: () => ({ meta: [{ title: "Support chat — EDGELINK Tours" }, { name: "robots", content: "noindex" }] }),
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
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const active = chats?.find((c) => c.id === activeId) ?? chats?.[0];

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-forest">Support chat</h1>
            <p className="text-sm text-muted-foreground">Message your travel designer in real time.</p>
          </div>
          <Button onClick={() => setNewOpen(true)} className="bg-gold text-gold-foreground hover:brightness-95">
            <Plus className="mr-1.5 h-4 w-4" /> New conversation
          </Button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[18rem_1fr]">
          <Card className="max-h-[32rem] overflow-y-auto p-2">
            {isLoading && <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin text-muted-foreground" />}
            {chats?.length === 0 && <p className="p-4 text-sm text-muted-foreground">No conversations yet.</p>}
            {chats?.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full rounded-md p-3 text-left text-sm hover:bg-muted ${active?.id === c.id ? "bg-muted" : ""}`}
              >
                <div className="font-semibold text-forest">{c.subject}</div>
                <div className="text-xs text-muted-foreground">
                  {c.category} · {formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true })}
                </div>
              </button>
            ))}
          </Card>

          <Card className="overflow-hidden">
            {active ? (
              <ChatThread chatId={active.id} role="client" />
            ) : (
              <div className="p-10 text-center text-sm text-muted-foreground">
                Start a conversation to chat with our team.
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
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Question about my gorilla trek" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      category === c ? "border-forest bg-forest text-cream" : "border-border"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={() => create.mutate()} disabled={create.isPending} className="w-full bg-gold text-gold-foreground">
              {create.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Start chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
