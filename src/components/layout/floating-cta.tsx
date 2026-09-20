import { ChevronDown, Headphones, Maximize2, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const PREVIEW_MESSAGES = [
  { from: "desk", text: "Hello. How can we help shape your Rwanda journey?" },
  { from: "traveller", text: "I would love to know more about gorilla permits." },
  { from: "desk", text: "Of course. We can help with permits, dates and the right lodge." },
];

export function FloatingCTA() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(PREVIEW_MESSAGES);
  const chatTarget = user ? "/dashboard/chat" : "/auth?redirect=%2Fdashboard%2Fchat";

  function sendMessage(event?: React.FormEvent) {
    event?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { from: "traveller", text }]);
    setDraft("");
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {open && (
        <div className="pointer-events-auto mb-1 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-forest px-4 py-3 text-cream">
            <div className="flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gold text-gold-foreground">
                <HeadsetIcon />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-forest bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold">EDGELINK Travel Desk</p>
                <p className="text-[11px] text-cream/65">Usually replies within a few minutes</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1.5 text-cream/70 transition hover:bg-cream/10 hover:text-cream" aria-label="Close chat preview">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2.5 bg-muted/35 p-3">
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`flex ${message.from === "traveller" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[86%] rounded-xl px-3 py-2 text-xs leading-relaxed ${message.from === "traveller" ? "rounded-br-sm bg-forest text-cream" : "rounded-bl-sm border border-border bg-card text-foreground"}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border bg-card p-3">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a message..."
              aria-label="Type a chat message"
              className="h-10 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-xs outline-none transition placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-forest text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="flex items-center gap-2 border-t border-border bg-card p-3">
            <a href={chatTarget} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gold px-3 text-xs font-semibold text-gold-foreground transition hover:brightness-95">
              <Maximize2 className="h-3.5 w-3.5" /> Open full chat
            </a>
            <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-gold hover:text-forest" aria-label="Minimize chat preview">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="pointer-events-auto flex items-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-cream shadow-luxe transition hover:bg-forest-deep" aria-expanded={open} aria-label={open ? "Close support chat" : "Open support chat"}>
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "Close chat" : "Chat with us"}</span>
        {!open && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
      </button>
    </div>
  );
}

function HeadsetIcon() {
  return <Headphones className="h-4 w-4" />;
}
