import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Check, CheckCheck, MessageCircle, Headphones, Sparkles, Mic, Square } from "lucide-react";
import { Pause, Play } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_role: string;
  message: string | null;
  attachment_url: string | null;
  read_status: boolean;
  created_at: string;
};

type Pending = { id: string; message: string; created_at: string };

const CLIENT_SHORTCUTS = [
  { label: "Send my dates", message: "I would like to share my travel dates. They are: " },
  { label: "Ask for a quote", message: "Please prepare a quotation for my trip." },
  { label: "Request a voice note", message: "Could you send me a voice note with the trip details?" },
  { label: "What's included?", message: "Could you tell me what is included in this trip?" },
  { label: "Change my dates", action: "dates" as const },
];

const ADMIN_SHORTCUTS = [
  { label: "Ask for dates", message: "Please share your preferred travel dates." },
  { label: "Prepare quotation", message: "I will prepare your quotation and send it shortly." },
  { label: "Ask group size", message: "Please confirm the number of adults and children travelling." },
  { label: "Send a voice note", message: "I will send you a voice note with more details shortly." },
  { label: "Ask preferences", message: "Do you have any accommodation, activity, or dietary preferences?" },
];

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
  const [recording, setRecording] = useState(false);
  const [uploadingVoice, setUploadingVoice] = useState(false);
  const [dateRequestOpen, setDateRequestOpen] = useState(false);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [pending, setPending] = useState<Pending[]>([]);
  const [peerTyping, setPeerTyping] = useState(false);
  const [peerOnline, setPeerOnline] = useState(false);
  const typingChannel = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const recordingStream = useRef<MediaStream | null>(null);
  const recordingChunks = useRef<Blob[]>([]);
  const lastTypingSent = useRef(0);

  const { data: messages, isLoading, error: messagesError } = useQuery({
    queryKey: ["messages", chatId],
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, chat_id, sender_id, sender_role, message, attachment_url, read_status, created_at")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Message[];
    },
  });

  useEffect(() => {
    if (messagesError instanceof Error) toast.error(`Could not load messages: ${messagesError.message}`);
  }, [messagesError]);

  useEffect(() => {
    let active = true;
    const loadAudioUrls = async () => {
      const attachments = (messages ?? []).filter((m) => m.attachment_url);
      const entries = await Promise.all(
        attachments.map(async (m) => {
          const { data, error } = await supabase.storage
            .from("chat-attachments")
            .createSignedUrl(m.attachment_url!, 60 * 60);
          return error || !data?.signedUrl ? null : ([m.id, data.signedUrl] as const);
        }),
      );
      if (active) setAudioUrls(Object.fromEntries(entries.filter(Boolean) as Array<readonly [string, string]>));
    };
    void loadAudioUrls();
    return () => {
      active = false;
    };
  }, [messages]);

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`chat-${chatId}`, { config: { presence: { key: `${role}:${user.id}` } } })
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
        () => {
          void qc.invalidateQueries({ queryKey: ["messages", chatId] });
          void qc.invalidateQueries({ queryKey: ["chats"] });
        },
      )
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
    const unread = messages
      .filter((m) => m.sender_id !== user.id && !m.read_status)
      .map((m) => m.id);
    if (unread.length === 0) return;
    void supabase
      .from("messages")
      .update({ read_status: true })
      .in("id", unread)
      .then(({ error }) => {
        if (error) toast.error(`Could not mark messages as read: ${error.message}`);
      });
  }, [messages, user]);

  // clear optimistic bubbles once the real rows arrive
  useEffect(() => {
    if (!messages || pending.length === 0) return;
    setPending((p) =>
      p.filter((x) => !messages.some((m) => m.message === x.message && m.sender_id === user?.id)),
    );
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
      toast.error(`Could not send message: ${error.message}`);
    }
    void qc.invalidateQueries({ queryKey: ["messages", chatId] });
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !("MediaRecorder" in window)) {
      toast.error("Voice notes are not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"]
        .find((type) => MediaRecorder.isTypeSupported(type));
      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recordingStream.current = stream;
      recordingChunks.current = [];
      recorder.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordingChunks.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordingChunks.current, { type: mediaRecorder.mimeType || "audio/webm" });
        void uploadVoiceNote(blob);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch {
      toast.error("Microphone access is required to record a voice note.");
    }
  };

  const stopRecording = () => {
    recorder.current?.stop();
    recordingStream.current?.getTracks().forEach((track) => track.stop());
    recorder.current = null;
    setRecording(false);
  };

  const uploadVoiceNote = async (blob: Blob) => {
    if (!user) return;
    setUploadingVoice(true);
    const extension = blob.type.includes("mp4") ? "m4a" : "webm";
    const path = `${user.id}/${chatId}/${Date.now()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("chat-attachments").upload(path, blob, {
      contentType: blob.type || "audio/webm",
      upsert: false,
    });
    if (uploadError) {
      setUploadingVoice(false);
      toast.error(`Could not upload voice note: ${uploadError.message}`);
      return;
    }
    const { error: messageError } = await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: user.id,
      sender_role: role,
      message: null,
      attachment_url: path,
      delivered_status: true,
    });
    setUploadingVoice(false);
    if (messageError) {
      toast.error(`Could not send voice note: ${messageError.message}`);
      return;
    }
    void qc.invalidateQueries({ queryKey: ["messages", chatId] });
  };

  const notifyTyping = () => {
    const now = Date.now();
    if (now - lastTypingSent.current < 1200) return;
    lastTypingSent.current = now;
    void typingChannel.current?.send({ type: "broadcast", event: "typing", payload: { role } });
  };

  const shortcuts = role === "client" ? CLIENT_SHORTCUTS : ADMIN_SHORTCUTS;

  const submitDateRequest = () => {
    if (!newStartDate) {
      toast.error("Choose a new start date first.");
      return;
    }
    const range = newEndDate ? `${newStartDate} to ${newEndDate}` : newStartDate;
    void send(`I would like to change my travel dates. My new preferred date${newEndDate ? "s are" : " is"}: ${range}.`);
    setDateRequestOpen(false);
    setNewStartDate("");
    setNewEndDate("");
  };

  const isEmpty = !isLoading && (messages?.length ?? 0) === 0 && pending.length === 0;

  return (
    <div className="flex h-[min(72vh,48rem)] min-h-[34rem] flex-col overflow-hidden bg-background">
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3.5 sm:px-5">
        <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-cream shadow-sm">
          <Headphones className="h-5 w-5" />
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
              peerOnline ? "bg-gold" : "bg-muted-foreground/40",
            )}
          />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">
            {role === "client" ? "EDGELINK Travel Desk" : "Traveller conversation"}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {peerOnline
              ? "Online now"
              : role === "client"
                ? "Usually replies within a few minutes"
                : "Currently offline"}
          </div>
        </div>
        <div className="ml-auto hidden items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:flex">
          <Sparkles className="h-3 w-3 text-gold" /> Live support
        </div>
      </div>

      <Conversation className="chat-scrollbar min-h-0 flex-1 bg-muted/20">
        <ConversationContent className="mx-auto w-full max-w-3xl space-y-4 p-4 sm:p-6">
          {isLoading && (
            <div className="flex min-h-40 items-center justify-center">
              <Shimmer className="text-sm">Loading conversation…</Shimmer>
            </div>
          )}

          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-2xl bg-forest/10 p-4 text-forest">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-forest">No messages yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
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
                const prevMine = prev
                  ? prev.kind === "pending" || (prev.m as Message).sender_id === user?.id
                  : null;
                const grouped = prevMine === mine;
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex",
                      mine ? "justify-end" : "justify-start",
                      grouped ? "mt-0.5" : "mt-3",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[88%] px-4 py-3 text-sm shadow-sm transition sm:max-w-[72%]",
                        mine
                          ? "rounded-2xl rounded-br-md bg-forest text-cream"
                          : "rounded-2xl rounded-bl-md border border-border/80 bg-card text-card-foreground",
                        isPending && "opacity-70",
                      )}
                    >
                      <div className="whitespace-pre-wrap break-words leading-relaxed">
                        {m.message && <div>{m.message}</div>}
                        {m.attachment_url && audioUrls[m.id] && (
                          <VoiceNote src={audioUrls[m.id]} mine={mine} />
                        )}
                        {m.attachment_url && !audioUrls[m.id] && <div className="text-xs opacity-70">Loading voice note…</div>}
                      </div>
                      <div
                        className={cn(
                          "mt-2 flex items-center justify-end gap-1 text-[10px]",
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

      <div className="border-t border-border bg-background px-4 pt-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-2">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quick send</span>
          <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
            {shortcuts.map((shortcut) => (
              <Button
                key={shortcut.label}
                type="button"
                onClick={() => {
                  if ("action" in shortcut && shortcut.action === "dates") setDateRequestOpen(true);
                  else if ("message" in shortcut) void send(shortcut.message);
                }}
                variant="outline"
                size="sm"
                className="shrink-0 rounded-lg border-border bg-card text-xs text-muted-foreground shadow-none transition hover:border-gold hover:bg-gold/10 hover:text-forest"
              >
                {shortcut.label}
              </Button>
            ))}
          </div>
        </div>
        {dateRequestOpen && role === "client" && (
          <div className="mx-auto mt-3 flex w-full max-w-3xl flex-wrap items-end gap-3 rounded-xl border border-gold/30 bg-gold/10 p-3">
            <div className="min-w-[9rem] flex-1">
              <label htmlFor="new-travel-start" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">New start date</label>
              <input id="new-travel-start" type="date" value={newStartDate} onChange={(event) => setNewStartDate(event.target.value)} className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm" />
            </div>
            <div className="min-w-[9rem] flex-1">
              <label htmlFor="new-travel-end" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">New end date</label>
              <input id="new-travel-end" type="date" min={newStartDate || undefined} value={newEndDate} onChange={(event) => setNewEndDate(event.target.value)} className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm" />
            </div>
            <Button type="button" size="sm" onClick={submitDateRequest} className="bg-forest text-cream hover:bg-forest-deep">Send date request</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setDateRequestOpen(false)}>Cancel</Button>
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card p-3 sm:p-4">
        <div className="mx-auto mb-2 flex max-w-3xl items-center justify-between px-1 text-[11px] text-muted-foreground">
          <span>{recording ? "Recording voice note" : "Messages are private to this conversation"}</span>
          {recording && <span className="flex items-center gap-1.5 font-semibold text-destructive"><span className="h-2 w-2 animate-pulse rounded-full bg-destructive" /> Tap stop when finished</span>}
          {uploadingVoice && <span className="font-semibold text-forest">Uploading voice note...</span>}
        </div>
        <PromptInput
          className="mx-auto max-w-3xl rounded-xl border border-border bg-background shadow-sm focus-within:border-gold/70 focus-within:ring-2 focus-within:ring-gold/15"
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
            className="min-h-12 text-sm"
          />
          <PromptInputFooter className="justify-end px-2 pb-2">
            <Button
              type="button"
              variant={recording ? "destructive" : "outline"}
              size="icon"
              onClick={() => (recording ? stopRecording() : void startRecording())}
              disabled={sending || uploadingVoice}
              title={recording ? "Stop recording" : "Record voice note"}
              aria-label={recording ? "Stop recording" : "Record voice note"}
            >
              {recording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
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

function VoiceNote({ src, mine }: { src: string; mine: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const bars = [5, 9, 14, 8, 18, 12, 22, 11, 16, 7, 19, 10, 24, 13, 18, 8, 15, 6, 11, 17, 9, 14, 7, 12];
  const elapsed = duration ? Math.floor((progress / 100) * duration) : 0;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={cn("mt-1 flex min-w-[210px] items-center gap-3 rounded-xl px-2.5 py-2", mine ? "bg-cream/10" : "bg-muted/60")}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.duration ? (event.currentTarget.currentTime / event.currentTarget.duration) * 100 : 0)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
      />
      <button
        type="button"
        onClick={() => void toggle()}
        className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full transition", mine ? "bg-gold text-gold-foreground hover:brightness-110" : "bg-forest text-cream hover:bg-forest-deep")}
        aria-label={playing ? "Pause voice note" : "Play voice note"}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex h-7 items-center gap-[2px]" aria-label="Voice note waveform">
          {bars.map((height, index) => (
            <span
              key={index}
              className={cn("w-1 rounded-full transition-colors", (index / bars.length) * 100 < progress ? (mine ? "bg-gold" : "bg-forest") : mine ? "bg-cream/45" : "bg-muted-foreground/35")}
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
        <div className={cn("mt-0.5 text-[10px] font-medium tabular-nums", mine ? "text-cream/65" : "text-muted-foreground")}>
          {formatVoiceTime(elapsed)}{duration ? ` / ${formatVoiceTime(duration)}` : ""}
        </div>
      </div>
    </div>
  );
}

function formatVoiceTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}
