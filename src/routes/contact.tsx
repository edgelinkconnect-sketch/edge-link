import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WHATSAPP_NUMBER = "250788341431";

const schema = z.object({
  full_name: z.string().trim().min(2, "Full name required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(4, "Phone required").max(40),
  nationality: z.string().optional(),
  country_residence: z.string().optional(),
  adults: z.string().min(1, "Required"),
  children: z.string().optional(),
  children_ages: z.string().optional(),
  travel_dates: z.string().min(1, "Required"),
  destinations: z.string().min(1, "Choose a destination"),
  duration: z.string().optional(),
  budget: z.string().optional(),
  accommodation: z.string().optional(),
  travel_style: z.string().optional(),
  dietary: z.string().optional(),
  mobility: z.string().optional(),
  occasion: z.string().optional(),
  notes: z.string().max(2000).optional(),
  referral: z.string().optional(),
  contact_method: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Plan Your Adventure — RWIZA Travel & Tour" },
      { name: "description", content: "Design your Rwandan safari. WhatsApp us direct at +250 788 341 431 or send us a full inquiry — we reply within 24 hours." },
      { property: "og:url", content: "https://rwiza.lovable.app/contact" },
      { property: "og:title", content: "Plan Your Adventure — RWIZA Travel & Tour" },
      { property: "og:description", content: "Design your Rwandan safari. WhatsApp us direct or send a full inquiry — we reply within 24 hours." },
    ],
    links: [{ rel: "canonical", href: "https://rwiza.lovable.app/contact" }],
  }),
  component: Contact,
});

function buildWhatsAppMessage(d: FormData) {
  const line = (label: string, val?: string) => (val && val.trim() ? `• ${label}: ${val}` : "");
  const sections = [
    `🦍 *NEW SAFARI INQUIRY - RWIZA TRAVEL*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `👤 *GUEST DETAILS*`,
    line("Name", d.full_name),
    line("Email", d.email),
    line("Phone", d.phone),
    line("Nationality", d.nationality),
    line("Residence", d.country_residence),
    ``,
    `👥 *TRAVEL DETAILS*`,
    line("Adults", d.adults),
    line("Children", `${d.children || "0"}${d.children_ages ? ` (Ages: ${d.children_ages})` : ""}`),
    line("Travel Dates", d.travel_dates),
    line("Duration", d.duration ? `${d.duration} days` : ""),
    line("Destinations", d.destinations),
    ``,
    `💰 *BUDGET & PREFERENCE*`,
    line("Budget Range", d.budget),
    line("Accommodation", d.accommodation),
    line("Travel Style", d.travel_style),
    ``,
    `🏨 *SPECIAL REQUIREMENTS*`,
    line("Dietary", d.dietary),
    line("Mobility", d.mobility),
    line("Occasion", d.occasion),
    line("Notes", d.notes),
    ``,
    `📊 *LEAD SOURCE*`,
    line("Referral", d.referral),
    line("Contact Method", d.contact_method),
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `✅ *ACTION ITEMS*`,
    `□ Review availability`,
    `□ Prepare custom itinerary`,
    `□ Send quote within 24 hours`,
    ``,
    `📱 Reply: +250788341431`,
    `✉️ Email: info@rwiza.com`,
  ];
  return sections.filter((s) => s !== "").join("\n").replace(/\n(?=•)/g, "\n");
}

function Contact() {
  const {
    register, handleSubmit, setValue, formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { adults: "2", children: "0" },
  });

  async function onSubmit(data: FormData) {
    const msg = buildWhatsAppMessage(data);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp — tap Send to submit your inquiry.");
  }

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact & booking</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Plan Your Adventure</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Complete the form below — we'll open WhatsApp with a formatted inquiry. Just tap send and a specialist will respond within 24 hours.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-forest">Personal Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name *" error={errors.full_name?.message}><Input {...register("full_name")} /></Field>
              <Field label="Email Address *" error={errors.email?.message}><Input type="email" {...register("email")} /></Field>
              <Field label="Phone Number *" error={errors.phone?.message}><Input type="tel" {...register("phone")} /></Field>
              <Field label="Nationality"><Input {...register("nationality")} /></Field>
              <Field label="Country of Residence"><Input {...register("country_residence")} /></Field>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-forest">Travel Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Number of Adults *" error={errors.adults?.message}><Input type="number" min={1} {...register("adults")} /></Field>
              <Field label="Number of Children (under 12)"><Input type="number" min={0} {...register("children")} /></Field>
              <Field label="Children's Ages"><Input placeholder="e.g. 6, 9" {...register("children_ages")} /></Field>
              <Field label="Preferred Travel Dates *" error={errors.travel_dates?.message}><Input placeholder="e.g. July 12–20, 2026" {...register("travel_dates")} /></Field>
              <Field label="Destination(s) *" error={errors.destinations?.message}>
                <Select onValueChange={(v) => setValue("destinations", v, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Volcanoes NP">Volcanoes NP</SelectItem>
                    <SelectItem value="Nyungwe NP">Nyungwe NP</SelectItem>
                    <SelectItem value="Akagera NP">Akagera NP</SelectItem>
                    <SelectItem value="All Three Parks">All Three Parks</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Trip Duration (Days)"><Input type="number" min={1} {...register("duration")} /></Field>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-forest">Budget & Preferences</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Budget Range per person">
                <Select onValueChange={(v) => setValue("budget", v)}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$5,000-$10,000">$5,000 – $10,000</SelectItem>
                    <SelectItem value="$10,000-$20,000">$10,000 – $20,000</SelectItem>
                    <SelectItem value="$20,000-$50,000">$20,000 – $50,000</SelectItem>
                    <SelectItem value="$50,000+">$50,000+</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Accommodation Type">
                <Select onValueChange={(v) => setValue("accommodation", v)}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ultra-Luxury">Ultra-Luxury</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Mid-Range">Mid-Range</SelectItem>
                    <SelectItem value="Budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Travel Style">
                <Select onValueChange={(v) => setValue("travel_style", v)}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Guided">Private Guided</SelectItem>
                    <SelectItem value="Small Group">Small Group</SelectItem>
                    <SelectItem value="Family-Friendly">Family-Friendly</SelectItem>
                    <SelectItem value="Honeymoon/Romantic">Honeymoon / Romantic</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-forest">Special Requirements</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Dietary Restrictions"><Input {...register("dietary")} /></Field>
              <Field label="Mobility Concerns"><Input {...register("mobility")} /></Field>
              <Field label="Special Occasion">
                <Select onValueChange={(v) => setValue("occasion", v)}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                    <SelectItem value="Anniversary">Anniversary</SelectItem>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="Family Reunion">Family Reunion</SelectItem>
                    <SelectItem value="Corporate Retreat">Corporate Retreat</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="mt-4">
              <Label>Additional Notes</Label>
              <Textarea rows={4} className="mt-1.5" {...register("notes")} placeholder="Dream itinerary, must-see wildlife, accessibility, celebrations…" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-forest">Referral & Contact</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="How did you hear about us?">
                <Select onValueChange={(v) => setValue("referral", v)}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Travel Agent">Travel Agent</SelectItem>
                    <SelectItem value="Friend/Family">Friend / Family</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Preferred Contact Method">
                <Select onValueChange={(v) => setValue("contact_method", v)}>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Phone Call">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-[#25D366] text-white hover:brightness-95 md:w-auto">
            <MessageCircle className="mr-2 h-4 w-4" />
            {isSubmitting ? "Preparing…" : "Send via WhatsApp"} <Send className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-xs text-muted-foreground">Tapping the button opens WhatsApp with your details pre-filled. Simply press send to complete your inquiry.</p>
        </form>

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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
