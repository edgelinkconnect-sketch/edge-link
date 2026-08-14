import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Send, Loader2, Check, CheckCheck } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_role: string;
  message: string | null;
  read_status: boolean;
  created_at: string;
};

export function ChatThread({ chatId, role }: { chatId: string; role: "client" | "admin" }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [peerTyping, setPeerTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingChannel = useRef<ReturnType<typeof supabase.channel> | null>(null);

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
    const channel = supabase
      .channel(`chat-${chatId}`)
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
      .subscribe();
    typingChannel.current = channel;
    return () => {
      void supabase.removeChannel(channel);
      typingChannel.current = null;
    };
  }, [chatId, qc, role]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length, peerTyping]);

  // mark incoming messages as read
  useEffect(() => {
    if (!messages || !user) return;
    const unread = messages.filter((m) => m.sender_id !== user.id && !m.read_status).map((m) => m.id);
    if (unread.length === 0) return;
    void supabase.from("messages").update({ read_status: true }).in("id", unread);
  }, [messages, user]);

  const send = async () => {
    const text = draft.trim();
    if (!text || !user) return;
    setSending(true);
    setDraft("");
    const { error } = await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: user.id,
      sender_role: role,
      message: text,
      delivered_status: true,
    });
    setSending(false);
    if (error) setDraft(text);
    void qc.invalidateQueries({ queryKey: ["messages", chatId] });
  };

  const notifyTyping = () => {
    void typingChannel.current?.send({ type: "broadcast", event: "typing", payload: { role } });
  };

  return (
    <div className="flex h-full min-h-[24rem] flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {isLoading && <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />}
        {messages?.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No messages yet — say hello and our team will reply shortly.
          </p>
        )}
        {messages?.map((m) => {
          const mine = m.sender_id === user?.id;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm ${
                  mine ? "rounded-br-sm bg-forest text-cream" : "rounded-bl-sm bg-muted text-foreground"
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{m.message}</div>
                <div className={`mt-1 flex items-center gap-1 text-[10px] ${mine ? "text-cream/60" : "text-muted-foreground"}`}>
                  {format(new Date(m.created_at), "HH:mm")}
                  {mine && (m.read_status ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />)}
                </div>
              </div>
            </div>
          );
        })}
        {peerTyping && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3">
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
        <div ref={bottomRef} />
      </div>

      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <Input
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            notifyTyping();
          }}
          placeholder="Type a message…"
          aria-label="Message"
        />
        <Button type="submit" disabled={sending || !draft.trim()} className="bg-gold text-gold-foreground hover:brightness-95">
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
