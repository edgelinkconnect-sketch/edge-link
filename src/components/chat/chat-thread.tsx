import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Check, CheckCheck, MessageCircle, Headphones } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_role: string;
  message: string | null;
  read_status: boolean;
  created_at: string;
};

type Pending = { id: string; message: string; created_at: string };

const QUICK_REPLIES = ["Hello 👋", "What's included?", "Can we adjust the dates?", "Thank you!"];

function dayLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, d MMM yyyy");
}

export function ChatThread({ chatId, role }: { chatId: string; role: "client" | "admin" }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [pending, setPending] = useState<Pending[]>([]);
  const [peerTyping, setPeerTyping] = useState(false);
  const [peerOnline, setPeerOnline] = useState(false);
  const typingChannel = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const lastTypingSent = useRef(0);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, chat_id, sender_id, sender_role, message, read_status, created_at")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Message[];
    },
  });

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`chat-${chatId}`, { config: { presence: { key: `${role}:${user.id}` } } })
      .on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` }, () => {
        void qc.invalidateQueries({ queryKey: ["messages", chatId] });
        void qc.invalidateQueries({ queryKey: ["chats"] });
      })
      .on("broadcast", { event: "typing" }, (payload) => {
        if ((payload.payload as { role?: string })?.role !== role) {
          setPeerTyping(true);
          window.setTimeout(() => setPeerTyping(false), 2500);
        }
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setPeerOnline(Object.keys(state).some((k) => !k.startsWith(`${role}:`)));
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") void channel.track({ role, at: Date.now() });
      });
    typingChannel.current = channel;
    return () => {
      void supabase.removeChannel(channel);
      typingChannel.current = null;
    };
  }, [chatId, qc, role, user]);

  // mark incoming messages as read
  useEffect(() => {
    if (!messages || !user) return;
    const unread = messages.filter((m) => m.sender_id !== user.id && !m.read_status).map((m) => m.id);
    if (unread.length === 0) return;
    void supabase.from("messages").update({ read_status: true }).in("id", unread);
  }, [messages, user]);

  // clear optimistic bubbles once the real rows arrive
  useEffect(() => {
    if (!messages || pending.length === 0) return;
    setPending((p) => p.filter((x) => !messages.some((m) => m.message === x.message && m.sender_id === user?.id)));
  }, [messages, pending.length, user?.id]);

  const groups = useMemo(() => {
    const all = [
      ...(messages ?? []).map((m) => ({ kind: "real" as const, m })),
      ...pending.map((p) => ({ kind: "pending" as const, m: p })),
    ];
    const out: { day: string; items: typeof all }[] = [];
    for (const item of all) {
      const day = dayLabel(new Date(item.m.created_at));
      const last = out[out.length - 1];
      if (last && last.day === day) last.items.push(item);
      else out.push({ day, items: [item] });
    }
    return out;
  }, [messages, pending]);

  const send = async (text: string) => {
    const body = text.trim();
    if (!body || !user) return;
    const tempId = `tmp-${Date.now()}`;
    setSending(true);
    setDraft("");
    setPending((p) => [...p, { id: tempId, message: body, created_at: new Date().toISOString() }]);
    const { error } = await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: user.id,
      sender_role: role,
      message: body,
      delivered_status: true,
    });
    setSending(false);
    if (error) {
      setPending((p) => p.filter((x) => x.id !== tempId));
      setDraft(body);
    }
    void qc.invalidateQueries({ queryKey: ["messages", chatId] });
  };

  const notifyTyping = () => {
    const now = Date.now();
    if (now - lastTypingSent.current < 1200) return;
    lastTypingSent.current = now;
    void typingChannel.current?.send({ type: "broadcast", event: "typing", payload: { role } });
  };

  const isEmpty = !isLoading && (messages?.length ?? 0) === 0 && pending.length === 0;

  return (
    <div className="flex h-[min(68vh,44rem)] min-h-[32rem] flex-col bg-card">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-card px-4 py-3">
        <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-md bg-forest text-cream">
          <Headphones className="h-5 w-5" />
          <span className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card", peerOnline ? "bg-gold" : "bg-muted-foreground/40")} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-forest">{role === "client" ? "EDGELINK Travel Desk" : "Traveller conversation"}</div>
          <div className="truncate text-xs text-muted-foreground">
            {peerOnline ? "Online now" : role === "client" ? "Usually replies within a few minutes" : "Currently offline"}
          </div>
        </div>
        <div className="rounded-md bg-gold/15 px-2 py-1 text-[10px] font-semibold uppercase text-forest">Live support</div>
      </div>

      <Conversation className="chat-scrollbar min-h-0 flex-1 bg-muted/30">
        <ConversationContent className="space-y-4 p-4 sm:p-5">
        {isLoading && (
          <div className="flex min-h-40 items-center justify-center"><Shimmer className="text-sm">Loading conversation…</Shimmer></div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-forest/10 p-4 text-forest">
              <MessageCircle className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-semibold text-forest">No messages yet</p>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Say hello — our team replies quickly and can tailor any itinerary to you.
            </p>
          </div>
        )}

        {groups.map((g) => (
          <div key={g.day} className="space-y-1.5">
            <div className="my-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="rounded-md border border-border bg-card px-3 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                {g.day}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            {g.items.map((item, idx) => {
              const isPending = item.kind === "pending";
              const m = item.m as Message & Partial<Pending>;
              const mine = isPending || m.sender_id === user?.id;
              const prev = g.items[idx - 1];
              const prevMine = prev ? prev.kind === "pending" || (prev.m as Message).sender_id === user?.id : null;
              const grouped = prevMine === mine;
              return (
                <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start", grouped ? "mt-0.5" : "mt-3")}>
                  <div
                    className={cn(
                       "max-w-[84%] px-3.5 py-2 text-sm shadow-sm transition sm:max-w-[72%]",
                      mine
                         ? "rounded-lg rounded-br-sm bg-forest text-cream"
                         : "rounded-lg rounded-bl-sm border border-border bg-card text-card-foreground",
                      isPending && "opacity-70",
                    )}
                  >
                    <div className="whitespace-pre-wrap break-words leading-relaxed">{m.message}</div>
                    <div
                      className={cn(
                        "mt-1 flex items-center justify-end gap-1 text-[10px]",
                        mine ? "text-cream/60" : "text-muted-foreground",
                      )}
                    >
                      {format(new Date(m.created_at), "HH:mm")}
                      {mine &&
                        (isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (m as Message).read_status ? (
                          <CheckCheck className="h-3 w-3" />
                        ) : (
                          <Check className="h-3 w-3" />
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {peerTyping && (
          <div className="flex justify-start">
             <div className="flex gap-1 rounded-lg rounded-bl-sm border border-border bg-card px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        )}
        </ConversationContent>
        <ConversationScrollButton className="bottom-3" />
      </Conversation>

      {isEmpty && (
        <div className="flex flex-wrap gap-2 border-t border-border px-3 pt-3">
          {QUICK_REPLIES.map((q) => (
             <button
              key={q}
              type="button"
              onClick={() => void send(q)}
               className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-gold hover:text-forest"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-border bg-card p-3">
        <PromptInput
          className="rounded-lg bg-background shadow-none"
          onSubmit={({ text }) => void send(text)}
        >
          <PromptInputTextarea
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              notifyTyping();
            }}
            placeholder="Write a message"
            aria-label="Message"
            className="min-h-11"
          />
          <PromptInputFooter className="justify-end px-2 pb-2">
            <PromptInputSubmit
              status={sending ? "submitted" : undefined}
              disabled={sending || !draft.trim()}
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
