import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitInquiry } from "@/lib/inquiries.functions";

const schema = z.object({
  full_name: z.string().trim().min(2, "Name too short").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(4, "Phone required").max(40),
  destinations: z.array(z.enum(["volcanoes", "akagera", "nyungwe"])).min(1, "Choose at least one"),
  trip_duration: z.string().optional(),
  group_size: z.string().optional(),
  budget_range: z.string().optional(),
  travel_date: z.string().optional(),
  special_requirements: z.string().max(2000).optional(),
  heard_from: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking — RWIZA Travel & Tour" },
      { name: "description", content: "Speak with a Rwandan safari specialist. Reply within 24 hours." },
      { property: "og:url", content: "https://rwiza.lovable.app/contact" },
      { property: "og:title", content: "Contact & Booking — RWIZA Travel & Tour" },
      { property: "og:description", content: "Speak with a Rwandan safari specialist. Reply within 24 hours." },
    ],
    links: [{ rel: "canonical", href: "https://rwiza.lovable.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const submit = useServerFn(submitInquiry);
  const [sent, setSent] = useState(false);
  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { destinations: [] } });

  const destinations = watch("destinations");

  function toggleDest(v: "volcanoes" | "akagera" | "nyungwe") {
    const cur = new Set(destinations ?? []);
    cur.has(v) ? cur.delete(v) : cur.add(v);
    setValue("destinations", Array.from(cur), { shouldValidate: true });
  }

  async function onSubmit(data: FormData) {
    try {
      await submit({ data });
      setSent(true);
      reset({ destinations: [] });
      toast.success("Inquiry received. We'll respond within 24 hours.");
    } catch (e) {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
      console.error(e);
    }
  }

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact & booking</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Let's design your journey</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">A safari specialist will respond within 24 hours with a bespoke proposal.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1fr_360px]">
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          {sent ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Send className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold">Inquiry received</h2>
              <p className="mt-3 text-muted-foreground">Thank you. A specialist will reply within 24 hours with a customised proposal.</p>
              <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>Submit another</Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="full_name">Full name *</Label>
                  <Input id="full_name" {...register("full_name")} className="mt-1.5" />
                  {errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-1.5" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" {...register("phone")} className="mt-1.5" />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="travel_date">Preferred travel date</Label>
                  <Input id="travel_date" type="date" {...register("travel_date")} className="mt-1.5" />
                </div>
              </div>

              <div className="mt-5">
                <Label>Destinations of interest *</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  {([
                    ["volcanoes", "Volcanoes NP"],
                    ["akagera", "Akagera NP"],
                    ["nyungwe", "Nyungwe NP"],
                  ] as const).map(([v, l]) => (
                    <label key={v} className="flex cursor-pointer items-center gap-2">
                      <Checkbox
                        checked={destinations?.includes(v) ?? false}
                        onCheckedChange={() => toggleDest(v)}
                      />
                      <span className="text-sm">{l}</span>
                    </label>
                  ))}
                </div>
                {errors.destinations && <p className="mt-1 text-xs text-destructive">{errors.destinations.message}</p>}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Trip duration</Label>
                  <Select onValueChange={(v) => setValue("trip_duration", v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-4 days">3–4 days</SelectItem>
                      <SelectItem value="5-7 days">5–7 days</SelectItem>
                      <SelectItem value="8-10 days">8–10 days</SelectItem>
                      <SelectItem value="10+ days">10+ days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Group size</Label>
                  <Select onValueChange={(v) => setValue("group_size", v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Solo">Solo</SelectItem>
                      <SelectItem value="Couple">Couple</SelectItem>
                      <SelectItem value="Family (3-5)">Family (3–5)</SelectItem>
                      <SelectItem value="Group (6+)">Group (6+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Budget range (per person)</Label>
                  <Select onValueChange={(v) => setValue("budget_range", v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under $3,000">Under $3,000</SelectItem>
                      <SelectItem value="$3,000–$5,000">$3,000–$5,000</SelectItem>
                      <SelectItem value="$5,000–$10,000">$5,000–$10,000</SelectItem>
                      <SelectItem value="$10,000+">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>How did you hear about us?</Label>
                  <Select onValueChange={(v) => setValue("heard_from", v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Search">Search engine</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Social">Social media</SelectItem>
                      <SelectItem value="Press">Press / magazine</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="special_requirements">Special requirements</Label>
                <Textarea id="special_requirements" rows={4} {...register("special_requirements")} className="mt-1.5" placeholder="Dietary needs, accessibility, celebrations, dream itinerary…" />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full bg-gold text-gold-foreground hover:brightness-95 md:w-auto">
                {isSubmitting ? "Sending…" : "Submit inquiry"} <Send className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </form>

        {/* SIDEBAR */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-display text-lg font-bold text-forest">Get in touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href="tel:+250788341431" className="hover:text-forest">+250 788 341 431</a></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href="mailto:info@rwiza.com" className="hover:text-forest">info@rwiza.com</a></li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />KG 7 Ave, Kigali, Rwanda</li>
              <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />Mon–Sat · 08:00–19:00 CAT</li>
            </ul>
            <a
              href="https://wa.me/250788341431"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <iframe
              title="RWIZA office location, Kigali"
              src="https://www.google.com/maps?q=Kigali+Rwanda&output=embed"
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
