import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { WHATSAPP_NUMBER, whatsappUrl } from "@/lib/whatsapp";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tourSlug: string;
  tourName: string;
  duration: string;
};

type QuoteForm = {
  full_name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  travel_start: string;
  travel_end: string;
  special_requests: string;
  budget_range: string;
};

export function QuoteRequestDialog({ open, onOpenChange, tourSlug, tourName, duration }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState<QuoteForm>({
    full_name: "",
    email: "",
    phone: "",
    adults: 2,
    children: 0,
    travel_start: "",
    travel_end: "",
    special_requests: "",
    budget_range: "",
  });
  const [done, setDone] = useState<{ id: string; waUrl: string } | null>(null);

  const { data: profile } = useQuery({
    queryKey: ["quote-profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("full_name, phone").eq("id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user && open,
  });

  useEffect(() => {
    if (!open) return;
    setDone(null);
    setForm((f) => ({
      ...f,
      full_name: f.full_name || profile?.full_name || "",
      email: f.email || user?.email || "",
      phone: f.phone || profile?.phone || "",
    }));
  }, [open, profile, user]);

  const submit = useMutation({
    mutationFn: async () => {
      const { data: tour, error: tourError } = await supabase
        .from("tours")
        .select("id, name")
        .eq("slug", tourSlug)
        .maybeSingle();

      if (tourError) throw tourError;
      if (!tour) throw new Error("This itinerary is not currently available for quotation.");

      const payload = {
        tour_id: tour.id,
        client_id: user?.id ?? null,
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        adults: Number(form.adults) || 1,
        children: Number(form.children) || 0,
        travel_start: form.travel_start || null,
        travel_end: form.travel_end || null,
        special_requests: form.special_requests || null,
        budget_range: form.budget_range || null,
        status: "new",
      };

      const { data, error } = await supabase
        .from("tour_quote_requests")
        .insert(payload)
        .select("id, phone")
        .single();

      if (error) throw error;
      return data as { id: string; phone: string };
    },
    onSuccess: (request) => {
      const msg = [
        `Hello EDGELINK Tours, I would like a quotation for ${tourName}.`,
        "",
        `Client: ${form.full_name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Travel dates: ${form.travel_start || "Flexible"}${form.travel_end ? ` → ${form.travel_end}` : ""}`,
        `Guests: ${form.adults} adults${form.children ? `, ${form.children} children` : ""}`,
        form.budget_range ? `Budget: ${form.budget_range}` : "",
        form.special_requests ? `Notes: ${form.special_requests}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const adminWaUrl = whatsappUrl(msg, WHATSAPP_NUMBER);
      setDone({ id: request.id, waUrl: adminWaUrl });
      window.open(adminWaUrl, "_blank", "noopener");
      toast.success("Quotation request sent to the admin on WhatsApp");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (k: keyof QuoteForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-4 font-display text-2xl font-bold text-forest">Quote request received</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              We have captured your request and your travel specialist can now send a quote by WhatsApp.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <Button asChild className="bg-[#25D366] text-white hover:brightness-95">
                <a href={done.waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1.5 h-4 w-4" /> Open WhatsApp
                </a>
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Ask for quote · {tourName}</DialogTitle>
              <DialogDescription>
                {duration} · share your travel dates and preferences. We will prepare a tailored quote and send it directly to your WhatsApp number.
              </DialogDescription>
            </DialogHeader>
            <form
              className="mt-2 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                submit.mutate();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <Input value={form.full_name} onChange={set("full_name")} required />
                </Field>
                <Field label="Email" required>
                  <Input type="email" value={form.email} onChange={set("email")} required />
                </Field>
                <Field label="Phone (WhatsApp)" required>
                  <Input value={form.phone} onChange={set("phone")} required placeholder="+250 ..." />
                </Field>
                <Field label="Budget range">
                  <Input value={form.budget_range} onChange={set("budget_range")} placeholder="e.g. $2,500 - $4,000" />
                </Field>
                <Field label="Adults" required>
                  <Input type="number" min={1} max={20} value={form.adults} onChange={set("adults")} required />
                </Field>
                <Field label="Children">
                  <Input type="number" min={0} max={20} value={form.children} onChange={set("children")} />
                </Field>
                <Field label="Travel start">
                  <Input type="date" value={form.travel_start} onChange={set("travel_start")} />
                </Field>
                <Field label="Travel end">
                  <Input type="date" value={form.travel_end} onChange={set("travel_end")} />
                </Field>
              </div>

              <Field label="Special requests">
                <Textarea
                  rows={3}
                  value={form.special_requests}
                  onChange={set("special_requests")}
                  placeholder="Preferred lodge, honeymoon plan, mobility needs, etc."
                />
              </Field>

              <Button type="submit" disabled={submit.isPending} className="w-full bg-gold text-gold-foreground hover:brightness-95">
                {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Request quote
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label} {required && <span className="text-gold">*</span>}
      </Label>
      {children}
    </div>
  );
}
