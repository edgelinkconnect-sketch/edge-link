import { createFileRoute, Link } from "@tanstack/react-router";
import { AskSpecialistButton } from "@/components/ask-specialist";
import { AppShell } from "@/components/layout/app-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — EDGELINK Tours" },
      { name: "description", content: "Answers to the most common questions about safaris, permits, visas, gorilla trekking, and travel in Rwanda." },
      { property: "og:title", content: "FAQ — EDGELINK Tours" },
      { property: "og:description", content: "Answers to the most common questions about safaris, permits, visas, and gorilla trekking in Rwanda." },
      { property: "og:url", content: "https://edgelink-tours.lovable.app/faq" },
    ],
    links: [{ rel: "canonical", href: "https://edgelink-tours.lovable.app/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQ,
});

const FAQS = [
  { cat: "General", q: "What's the best time to visit Rwanda for a safari?", a: "Rwanda has two dry seasons ideal for trekking and game drives: June–September and December–February. The wetter months (March–May, October–November) offer lush landscapes and fewer visitors, but rain gear is essential." },
  { cat: "General", q: "Do I need a visa to visit Rwanda?", a: "Most nationalities can get a 30-day visa on arrival for $50 or apply for the East Africa Tourist Visa ($100, covers Rwanda, Kenya, Uganda). Citizens of African Union member states and select others enter visa-free." },
  { cat: "General", q: "Is Rwanda safe for tourists?", a: "Yes. Rwanda is consistently ranked one of the safest countries in Africa. Kigali is spotless, crime is very low, and infrastructure is excellent. Standard travel precautions apply." },
  { cat: "General", q: "What vaccinations do I need?", a: "Yellow fever certificate is required for entry. We recommend routine vaccinations (Hepatitis A/B, Typhoid, Tetanus) plus anti-malarial prophylaxis. Consult a travel doctor 6–8 weeks before travel." },
  { cat: "Gorilla Trekking", q: "How fit do I need to be for gorilla trekking?", a: "Moderate fitness is sufficient. Treks last 2–6 hours through rainforest at altitudes of 2,500–3,500m. We match your group to a gorilla family based on fitness, and porters are always available." },
  { cat: "Gorilla Trekking", q: "What should I wear for gorilla trekking?", a: "Long trousers, long-sleeve shirt (tucked in), sturdy waterproof hiking boots, gaiters, gardening gloves for nettles, a rain jacket, hat, and daypack. Neutral colours preferred — no bright reds or whites." },
  { cat: "Gorilla Trekking", q: "How much does a gorilla trekking permit cost?", a: "The Rwanda Development Board permit is $1,500 per person per trek. All EDGELINK packages include permits — we secure them 6+ months in advance to guarantee your dates." },
  { cat: "Gorilla Trekking", q: "What are the rules during gorilla trekking?", a: "Maintain a 7-metre distance, wear a mask, no flash photography, one-hour maximum with the family, no visits if you're sick, and follow your guide's instructions at all times. These rules protect the gorillas from human diseases." },
  { cat: "Logistics", q: "What's included in a safari package?", a: "Every EDGELINK package includes all permits, park fees, luxury lodging, private guided transfers in a 4x4 Land Cruiser, all meals, drinking water, and airport transfers. International flights, travel insurance, and gratuities are excluded." },
  { cat: "Logistics", q: "How do I get to Rwanda?", a: "Fly into Kigali International Airport (KGL). Direct flights from Brussels, Amsterdam, Doha, Dubai, Istanbul, Johannesburg, Addis Ababa, and Nairobi. RwandAir, Qatar Airways, KLM, Turkish Airlines, and Ethiopian Airlines all serve KGL." },
  { cat: "Accommodation", q: "Are children allowed on safaris?", a: "Yes, we love family safaris. However, gorilla trekking has a minimum age of 15. Children of all ages can enjoy Akagera game drives, Nyungwe canopy walks (with parents), and cultural experiences." },
  { cat: "Sustainability", q: "How does EDGELINK support conservation?", a: "We're a Gorilla Friendly™ certified operator. 10% of every package fee is donated to the Dian Fossey Fund and community conservation cooperatives. Our carbon emissions are 100% offset through Rwandan reforestation." },
];

function FAQ() {
  const cats = Array.from(new Set(FAQS.map((f) => f.cat)));
  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Frequently Asked</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Everything you need to know</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Answers from our head guides and operations team. Still curious? We reply within 24 hours.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
        {cats.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-forest">{cat}</h2>
            <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card">
              {FAQS.filter((f) => f.cat === cat).map((f, i) => (
                <AccordionItem key={i} value={`${cat}-${i}`} className="px-4 last:border-b-0">
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="mt-12 rounded-2xl border border-border bg-forest-deep p-8 text-center text-primary-foreground">
          <h3 className="font-display text-2xl font-bold">Still have questions?</h3>
          <p className="mt-2 text-primary-foreground/80">Our team responds to every inquiry within 24 hours.</p>
          <AskSpecialistButton className="mt-5 bg-gold text-gold-foreground hover:brightness-95" />
        </div>
      </section>
    </AppShell>
  );
}
