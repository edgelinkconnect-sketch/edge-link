import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Smartphone, Calendar, Users, Car, Bed, ArrowRight, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [{ title: "Secure Your Tour — RWIZA Booking" }, { name: "robots", content: "noindex" }] }),
  component: Booking,
});

const STEPS = ["Customise", "Travellers", "Payment", "Confirmed"];

function Booking() {
  const nav = useNavigate();
  const { clearCart } = useApp();
  const [step, setStep] = useState(0);
  const [group, setGroup] = useState(2);
  const [vehicle, setVehicle] = useState("std");
  const [lodging, setLodging] = useState("luxury");
  const [pay, setPay] = useState("card");
  const base = 3450;
  const vehiclePrice = vehicle === "premium" ? 400 : 0;
  const lodgingPrice = lodging === "signature" ? 600 : lodging === "luxury" ? 300 : 0;
  const total = (base + vehiclePrice + lodgingPrice) * group;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const confirm = () => {
    clearCart();
    setStep(3);
    toast.success("Booking confirmed. Muraho neza!");
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Secure a Tour</p>
          <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Complete your booking</h1>
        </div>

        {/* Progress */}
        <div className="mb-10 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                i <= step ? "bg-gold text-gold-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className={`ml-2 hidden text-xs font-semibold sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
              {i < STEPS.length - 1 && <div className={`mx-3 h-0.5 flex-1 ${i < step ? "bg-gold" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-luxe">
          {step === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider">Travel dates</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative"><Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" /><Input type="date" className="pl-10" /></div>
                  <div className="relative"><Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" /><Input type="number" min={1} max={12} value={group} onChange={(e) => setGroup(Math.max(1, +e.target.value))} className="pl-10" /></div>
                </div>
              </div>

              <div>
                <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider">Vehicle</Label>
                <RadioGroup value={vehicle} onValueChange={setVehicle} className="grid gap-3 sm:grid-cols-2">
                  {[{ v: "std", l: "Land Cruiser Standard", p: "Included" }, { v: "premium", l: "Land Cruiser Signature", p: "+ $400" }].map((o) => (
                    <label key={o.v} className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition ${vehicle === o.v ? "border-gold bg-gold/5" : "border-border"}`}>
                      <RadioGroupItem value={o.v} />
                      <Car className="h-5 w-5 text-gold" />
                      <div className="flex-1"><div className="font-semibold">{o.l}</div><div className="text-xs text-muted-foreground">{o.p}</div></div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider">Lodging tier</Label>
                <RadioGroup value={lodging} onValueChange={setLodging} className="grid gap-3 sm:grid-cols-3">
                  {[{ v: "boutique", l: "Boutique", p: "Included" }, { v: "luxury", l: "Luxury", p: "+ $300" }, { v: "signature", l: "Signature", p: "+ $600" }].map((o) => (
                    <label key={o.v} className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition ${lodging === o.v ? "border-gold bg-gold/5" : "border-border"}`}>
                      <RadioGroupItem value={o.v} />
                      <Bed className="h-5 w-5 text-gold" />
                      <div className="flex-1"><div className="font-semibold">{o.l}</div><div className="text-xs text-muted-foreground">{o.p}</div></div>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              {Array.from({ length: group }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-background p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-xs font-bold text-primary-foreground">{i + 1}</span>
                    <h3 className="font-display text-lg font-bold">Traveller {i + 1}</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div><Label className="mb-1 text-xs">First name</Label><Input placeholder="Aisha" /></div>
                    <div><Label className="mb-1 text-xs">Last name</Label><Input placeholder="Uwimana" /></div>
                    <div><Label className="mb-1 text-xs">Passport #</Label><Input placeholder="PC0000000" /></div>
                    <div><Label className="mb-1 text-xs">Dietary</Label><Input placeholder="e.g. Vegetarian" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider">Payment method</Label>
                <RadioGroup value={pay} onValueChange={setPay} className="grid gap-3 sm:grid-cols-2">
                  <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition ${pay === "card" ? "border-gold bg-gold/5" : "border-border"}`}>
                    <RadioGroupItem value="card" />
                    <CreditCard className="h-5 w-5 text-gold" />
                    <div className="font-semibold">Credit / Debit Card</div>
                  </label>
                  <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition ${pay === "mobile" ? "border-gold bg-gold/5" : "border-border"}`}>
                    <RadioGroupItem value="mobile" />
                    <Smartphone className="h-5 w-5 text-gold" />
                    <div className="font-semibold">MTN Mobile Money</div>
                  </label>
                </RadioGroup>
              </div>
              {pay === "card" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label className="mb-1 text-xs">Card number</Label><Input placeholder="4242 4242 4242 4242" /></div>
                  <div><Label className="mb-1 text-xs">Expiry</Label><Input placeholder="MM/YY" /></div>
                  <div><Label className="mb-1 text-xs">CVC</Label><Input placeholder="123" /></div>
                </div>
              ) : (
                <div><Label className="mb-1 text-xs">Mobile Money number</Label><Input placeholder="+250 788 000 000" /></div>
              )}
              <div className="rounded-2xl bg-muted p-5">
                <h4 className="mb-3 font-display text-lg font-bold">Order summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Gorilla Trekking × {group}</span><span>${(base * group).toLocaleString()}</span></div>
                  {vehiclePrice > 0 && <div className="flex justify-between"><span>Vehicle upgrade</span><span>${(vehiclePrice * group).toLocaleString()}</span></div>}
                  {lodgingPrice > 0 && <div className="flex justify-between"><span>Lodging upgrade</span><span>${(lodgingPrice * group).toLocaleString()}</span></div>}
                  <div className="mt-2 flex justify-between border-t border-border pt-2 font-display text-lg font-bold text-gold"><span>Total</span><span>${total.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center animate-fade-in">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold text-gold-foreground">
                <Check className="h-10 w-10" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold">Booking confirmed!</h2>
              <p className="mt-2 text-muted-foreground">Confirmation sent to your email. Muraho neza!</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button onClick={() => nav({ to: "/dashboard" })} className="bg-forest text-primary-foreground">View dashboard</Button>
                <Button onClick={() => nav({ to: "/" })} variant="outline">Back home</Button>
              </div>
            </div>
          )}

          {step < 3 && (
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft className="mr-1 h-4 w-4" />Back</Button>
              {step < 2 ? (
                <Button onClick={next} className="bg-gold text-gold-foreground">Continue<ArrowRight className="ml-1 h-4 w-4" /></Button>
              ) : (
                <Button onClick={confirm} className="bg-forest text-primary-foreground">Confirm & Pay ${total.toLocaleString()}</Button>
              )}
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
