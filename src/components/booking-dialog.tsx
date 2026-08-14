import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tourSlug: string;
  tourName: string;
  price: number;
  duration: string;
};

export function BookingDialog({ open, onOpenChange, tourSlug, tourName, price, duration }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    adults: 2,
    children: 0,
    children_ages: "",
    travel_start: "",
    travel_end: "",
    special_requests: "",
    dietary_requirements: "",
    referral_source: "",
  });
  const [done, setDone] = useState<{ number: string; waUrl: string } | null>(null);

  const { data: profile } = useQuery({
    queryKey: ["booking-profile", user?.id],
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
      if (!tour) throw new Error("This itinerary is not available for online booking yet.");

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          tour_id: tour.id,
          client_id: user?.id ?? null,
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          adults: Number(form.adults) || 1,
          children: Number(form.children) || 0,
          children_ages: form.children_ages || null,
          travel_start: form.travel_start || null,
          travel_end: form.travel_end || null,
          special_requests: form.special_requests || null,
          dietary_requirements: form.dietary_requirements || null,
          referral_source: form.referral_source || null,
        })
        .select("booking_number")
        .single();
      if (error) throw error;
      return data.booking_number as string;
    },
    onSuccess: (bookingNumber) => {
      const msg = [
        `Hello EDGELINK Tours! I've just requested a booking.`,
        ``,
        `Reference: ${bookingNumber}`,
        `Package: ${tourName} (${duration})`,
        `Name: ${form.full_name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Travellers: ${form.adults} adults${form.children ? `, ${form.children} children` : ""}`,
        form.travel_start ? `Travel dates: ${form.travel_start}${form.travel_end ? ` → ${form.travel_end}` : ""}` : "",
        form.special_requests ? `Notes: ${form.special_requests}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      const waUrl = whatsappUrl(msg);
      setDone({ number: bookingNumber, waUrl });
      window.open(waUrl, "_blank", "noopener");
      toast.success(`Booking ${bookingNumber} received`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-4 font-display text-2xl font-bold text-forest">Request received</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Your reference is <span className="font-mono font-semibold text-foreground">{done.number}</span>. A travel
              designer will confirm availability within 24 hours.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <Button asChild className="bg-[#25D366] text-white hover:brightness-95">
                <a href={done.waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1.5 h-4 w-4" /> Continue on WhatsApp
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
              <DialogTitle className="font-display text-2xl">Book {tourName}</DialogTitle>
              <DialogDescription>
                {duration} · from ${price.toLocaleString()} per person. No payment required now — we confirm availability first.
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
                <Field label="Full name" required><Input value={form.full_name} onChange={set("full_name")} required /></Field>
                <Field label="Email" required><Input type="email" value={form.email} onChange={set("email")} required /></Field>
                <Field label="Phone (WhatsApp)" required><Input value={form.phone} onChange={set("phone")} required placeholder="+250 ..." /></Field>
                <Field label="How did you hear about us?"><Input value={form.referral_source} onChange={set("referral_source")} /></Field>
                <Field label="Adults" required><Input type="number" min={1} max={20} value={form.adults} onChange={set("adults")} required /></Field>
                <Field label="Children"><Input type="number" min={0} max={20} value={form.children} onChange={set("children")} /></Field>
                {Number(form.children) > 0 && (
                  <Field label="Children's ages"><Input value={form.children_ages} onChange={set("children_ages")} placeholder="8, 11" /></Field>
                )}
                <Field label="Travel start"><Input type="date" value={form.travel_start} onChange={set("travel_start")} /></Field>
                <Field label="Travel end"><Input type="date" value={form.travel_end} onChange={set("travel_end")} /></Field>
              </div>
              <Field label="Dietary requirements"><Input value={form.dietary_requirements} onChange={set("dietary_requirements")} /></Field>
              <Field label="Special requests">
                <Textarea rows={3} value={form.special_requests} onChange={set("special_requests")} placeholder="Anniversary, accessibility needs, preferred lodges..." />
              </Field>
              <Button type="submit" disabled={submit.isPending} className="w-full bg-gold text-gold-foreground hover:brightness-95">
                {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Request booking
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We'll open WhatsApp with your details so you can chat with a designer instantly.
              </p>
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
