import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Check, Clock3, Loader2, Mail, MessageCircle, Search, SlidersHorizontal, Users } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/_authenticated/admin/quotations")({ component: AdminQuotations });

const STATUSES = ["new", "quoted", "sent", "archived"];

type RequestRow = any;

type WorkspaceProps = {
  request: RequestRow;
  amount: string;
  message: string;
  onAmountChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onMarkQuoted: () => void;
  onSend: () => void;
};

function AdminQuotations() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quoteDrafts, setQuoteDrafts] = useState<Record<string, string>>({});
  const [amountDrafts, setAmountDrafts] = useState<Record<string, string>>({});

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-quotations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tour_quote_requests").select("*, tours(name, location, duration)").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const counts = useMemo(() => {
    const all = requests ?? [];
    return { all: all.length, new: all.filter((r) => r.status === "new").length, quoted: all.filter((r) => r.status === "quoted").length, sent: all.filter((r) => r.status === "sent").length };
  }, [requests]);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (requests ?? []).filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return [r.full_name, r.email, r.phone, r.id, r.tours?.name].some((v) => (v ?? "").toLowerCase().includes(q));
    });
  }, [requests, filter, search]);

  useEffect(() => {
    if (!selectedId || !rows.some((row) => row.id === selectedId)) setSelectedId(rows[0]?.id ?? null);
  }, [rows, selectedId]);

  const selected = rows.find((row) => row.id === selectedId) ?? null;

  const update = async (id: string, patch: { status?: string; quoted_amount?: string | null; admin_notes?: string | null }) => {
    const { error } = await supabase.from("tour_quote_requests").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    void qc.invalidateQueries({ queryKey: ["admin-quotations"] });
  };

  const sendQuote = async (request: RequestRow) => {
    const amount = (amountDrafts[request.id] ?? request.quoted_amount ?? "").trim();
    const amountLabel = amount ? `${amount} USD` : "To be confirmed";
    const tourName = request.tours?.name ?? "your selected tour";
    const tourLocation = request.tours?.location ?? "Rwanda";
    const tourDuration = request.tours?.duration ?? "custom itinerary";
    const travelDates = request.travel_start ? `${format(new Date(request.travel_start), "MMM d, yyyy")}${request.travel_end ? ` to ${format(new Date(request.travel_end), "MMM d, yyyy")}` : ""}` : "your preferred travel dates";
    const baseMessage = [`Hello ${request.full_name},`, "", `Thank you for your interest in ${tourName}. We are pleased to share the quotation for your ${tourName} journey in ${tourLocation}.`, "", "Trip details:", `• Tour: ${tourName}`, `• Duration: ${tourDuration}`, `• Travel dates: ${travelDates}`, `• Quotation amount: ${amountLabel}`, "", "This proposal is tailored to your preferences and is designed to give you a clear overview of the experience we can arrange for you.", "", "Please reply to this message if you would like us to proceed, and our team will guide you through the next steps.", "", "Warm regards,", "EDGELINK Tours"].join("\n");
    const message = quoteDrafts[request.id]?.trim() || baseMessage;
    window.open(whatsappUrl(message, request.phone), "_blank", "noopener");
    await update(request.id, { status: "sent", quoted_amount: amount || null, admin_notes: quoteDrafts[request.id] ? "Custom quote prepared for WhatsApp" : "Quote sent by WhatsApp" });
  };

  return (
    <div className="mx-auto max-w-[1500px]">
      <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-foreground"><span className="h-2 w-2 rounded-full bg-gold" /> Sales desk</div><h1 className="font-display text-4xl font-bold text-forest">Quotation inbox</h1><p className="mt-1 max-w-xl text-sm text-muted-foreground">Review requests, prepare a USD offer, and send the final answer to WhatsApp.</p></div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-4 w-4" /> Updated live</div>
      </header>

      <div className="mb-5 grid gap-3 sm:grid-cols-3"><Metric label="Needs attention" value={counts.new} tone="gold" /><Metric label="Being prepared" value={counts.quoted} tone="forest" /><Metric label="Sent to clients" value={counts.sent} tone="neutral" /></div>

      <div className="mb-5 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 shadow-sm lg:flex-row lg:items-center"><div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search client, tour, phone, or request ID" className="border-0 bg-muted/60 pl-9 shadow-none focus-visible:ring-1" /></div><div className="flex items-center gap-2 overflow-x-auto"><SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />{["all", ...STATUSES].map((status) => <button key={status} onClick={() => setFilter(status)} className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition ${filter === status ? "bg-forest text-cream" : "text-muted-foreground hover:bg-muted"}`}>{status === "all" ? `All ${counts.all}` : `${status} ${status === "new" ? counts.new : status === "quoted" ? counts.quoted : status === "sent" ? counts.sent : ""}`}</button>)}</div></div>

      <div className="grid min-h-[620px] gap-4 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.65fr)]">
        <Card className="overflow-hidden p-0"><div className="border-b border-border px-4 py-3"><div className="flex items-center justify-between"><h2 className="font-semibold text-forest">Requests</h2><span className="text-xs text-muted-foreground">{rows.length} showing</span></div></div>{isLoading ? <Loader2 className="mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" /> : rows.length === 0 ? <p className="p-8 text-center text-sm text-muted-foreground">No requests match this view.</p> : <div className="divide-y divide-border">{rows.map((request) => <RequestListItem key={request.id} request={request} selected={request.id === selectedId} onSelect={() => setSelectedId(request.id)} />)}</div>}</Card>
        {selected ? <QuoteWorkspace request={selected} amount={amountDrafts[selected.id] ?? selected.quoted_amount ?? ""} message={quoteDrafts[selected.id] ?? ""} onAmountChange={(value) => setAmountDrafts((prev) => ({ ...prev, [selected.id]: value }))} onMessageChange={(value) => setQuoteDrafts((prev) => ({ ...prev, [selected.id]: value }))} onStatusChange={(status) => void update(selected.id, { status, quoted_amount: amountDrafts[selected.id] ?? selected.quoted_amount ?? null })} onMarkQuoted={() => void update(selected.id, { status: "quoted", quoted_amount: amountDrafts[selected.id] ?? selected.quoted_amount ?? null })} onSend={() => void sendQuote(selected)} /> : <Card className="grid place-items-center p-8 text-center"><div><MessageCircle className="mx-auto h-10 w-10 text-muted-foreground/40" /><p className="mt-3 font-semibold text-forest">Select a request</p><p className="mt-1 text-sm text-muted-foreground">Choose a client from the inbox to prepare their quote.</p></div></Card>}
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "gold" | "forest" | "neutral" }) { return <div className="rounded-lg border border-border bg-card p-4 shadow-sm"><div className={`mb-3 h-1 w-10 rounded-full ${tone === "gold" ? "bg-gold" : tone === "forest" ? "bg-forest" : "bg-muted-foreground/40"}`} /><div className="text-3xl font-semibold text-forest">{value}</div><div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div></div>; }

function RequestListItem({ request, selected, onSelect }: { request: RequestRow; selected: boolean; onSelect: () => void }) { return <button onClick={onSelect} className={`w-full border-l-2 p-4 text-left transition hover:bg-muted/60 ${selected ? "border-l-gold bg-gold/10" : "border-l-transparent"}`}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="truncate font-semibold text-forest">{request.full_name}</div><div className="mt-1 truncate text-xs text-muted-foreground">{request.tours?.name ?? "Tour request"}</div></div><StatusBadge status={request.status} /></div><div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-muted-foreground"><span>{request.phone}</span><span>{format(new Date(request.created_at), "PP")}</span></div></button>; }

function StatusBadge({ status }: { status: string }) { const styles: Record<string, string> = { new: "bg-gold/20 text-gold-foreground", quoted: "bg-forest/10 text-forest", sent: "bg-emerald-100 text-emerald-800", archived: "bg-muted text-muted-foreground" }; return <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${styles[status] ?? styles.archived}`}>{status}</span>; }

function QuoteWorkspace({ request, amount, message, onAmountChange, onMessageChange, onStatusChange, onMarkQuoted, onSend }: WorkspaceProps) {
  const travelDates = request.travel_start ? `${format(new Date(request.travel_start), "PP")}${request.travel_end ? ` → ${format(new Date(request.travel_end), "PP")}` : ""}` : "Flexible dates";
  return <Card className="overflow-hidden p-0"><div className="border-b border-border bg-forest px-5 py-5 text-cream sm:px-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-xs uppercase tracking-[0.18em] text-cream/60">Selected request</div><h2 className="mt-1 font-display text-3xl font-bold">{request.full_name}</h2><p className="mt-1 text-sm text-cream/70">{request.tours?.name ?? "Tour request"}</p></div><select value={request.status} onChange={(e) => onStatusChange(e.target.value)} className="rounded-md border border-cream/20 bg-cream/10 px-3 py-2 text-xs capitalize text-cream"><option className="text-foreground" value="new">new</option><option className="text-foreground" value="quoted">quoted</option><option className="text-foreground" value="sent">sent</option><option className="text-foreground" value="archived">archived</option></select></div></div><div className="grid gap-6 p-5 sm:p-7"><div className="grid gap-3 sm:grid-cols-2"><Info icon={<Mail />} label="Email" value={request.email} /><Info icon={<MessageCircle />} label="WhatsApp" value={request.phone} /><Info icon={<Users />} label="Travellers" value={`${request.adults} adults${request.children ? `, ${request.children} children` : ""}`} /><Info icon={<Clock3 />} label="Travel dates" value={travelDates} /></div><div className="rounded-lg border border-border bg-muted/35 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Client brief</div><div className="mt-1 text-sm">{request.special_requests || "No special requests provided."}</div></div><div className="text-right text-xs text-muted-foreground">{request.budget_range ? `Budget ${request.budget_range}` : "No budget"}</div></div></div><div className="grid gap-4 md:grid-cols-[220px_1fr]"><div><label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Quotation amount</label><div className="relative"><span className="absolute left-3 top-2.5 text-sm font-semibold text-muted-foreground">$</span><Input value={amount} onChange={(e) => onAmountChange(e.target.value)} placeholder="2,500" className="pl-8 text-lg font-semibold" /></div><p className="mt-2 text-xs text-muted-foreground">This will be sent in USD.</p></div><div><label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Message to client</label><Textarea rows={8} value={message} onChange={(e) => onMessageChange(e.target.value)} placeholder="Leave blank to use the standard quote message." /></div></div><div className="flex flex-col-reverse justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center"><div className="text-xs text-muted-foreground">Request received {format(new Date(request.created_at), "PPp")}</div><div className="flex flex-wrap justify-end gap-2"><Button variant="secondary" onClick={onMarkQuoted}><Check className="mr-1.5 h-4 w-4" /> Save quote</Button><Button className="bg-[#25D366] text-white hover:brightness-95" onClick={onSend}><MessageCircle className="mr-1.5 h-4 w-4" /> Send via WhatsApp</Button></div></div></div></Card>;
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex min-w-0 gap-3 rounded-lg border border-border p-3"><div className="mt-0.5 text-gold [&>svg]:h-4 [&>svg]:w-4">{icon}</div><div className="min-w-0"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 truncate text-sm font-medium">{value}</div></div></div>; }
