import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Client Communications — RWIZA" }, { name: "robots", content: "noindex" }] }),
  component: Support,
});

const CANNED = [
  "Send Gorilla Permit FAQ",
  "Share packing checklist",
  "Confirm airport pickup",
  "Send invoice reminder",
];

function Support() {
  const { conversations, activeConvId, setActiveConvId, sendMessage } = useApp();
  const [draft, setDraft] = useState("");
  const active = conversations.find((c) => c.id === activeConvId) ?? conversations[0];

  const send = (text: string) => {
    if (!text.trim() || !active) return;
    sendMessage(active.id, text, "admin");
    setDraft("");
  };

  return (
    <AppShell hideFooter>
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Support</p>
          <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Client Communications</h1>
        </div>

        <div className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-luxe md:grid-cols-[320px_1fr]">
          {/* List */}
          <div className="border-r border-border">
            <div className="border-b border-border p-4">
              <Input placeholder="Search inquiries…" />
            </div>
            <ul className="max-h-[600px] overflow-y-auto">
              {conversations.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveConvId(c.id)}
                    className={`flex w-full items-center gap-3 border-b border-border p-4 text-left transition ${
                      c.id === active?.id ? "bg-gold/10" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-sm font-bold text-primary-foreground">{c.avatar}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="truncate font-semibold">{c.client}</div>
                        {c.unread > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[10px] font-bold text-gold-foreground">{c.unread}</span>}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground">{c.messages[c.messages.length - 1]?.text}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat */}
          <div className="flex min-h-[600px] flex-col">
            {active ? (
              <>
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-forest text-sm font-bold text-primary-foreground">{active.avatar}</div>
                  <div>
                    <div className="font-semibold">{active.client}</div>
                    <div className="text-xs text-forest">● Online</div>
                  </div>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto p-6">
                  {active.messages.map((m) => (
                    <div key={m.id} className={`flex ${m.from === "admin" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                        m.from === "admin" ? "bg-forest text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                      }`}>
                        {m.text}
                        <div className="mt-1 text-[10px] opacity-60">{m.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border p-3">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {CANNED.map((c) => (
                      <button key={c} onClick={() => send(c)} className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] font-semibold text-gold hover:bg-gold/20">
                        <Sparkles className="h-3 w-3" />{c}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(draft)} placeholder="Type a message…" />
                    <Button onClick={() => send(draft)} className="bg-gold text-gold-foreground"><Send className="h-4 w-4" /></Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid flex-1 place-items-center text-sm text-muted-foreground">Select a conversation</div>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
