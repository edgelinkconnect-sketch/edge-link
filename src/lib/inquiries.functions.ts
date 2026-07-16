import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const inquirySchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(40),
  destinations: z.array(z.enum(["volcanoes", "akagera", "nyungwe"])).min(1).max(3),
  trip_duration: z.string().max(60).optional(),
  group_size: z.string().max(60).optional(),
  budget_range: z.string().max(60).optional(),
  travel_date: z.string().optional(),
  special_requirements: z.string().max(2000).optional(),
  heard_from: z.string().max(120).optional(),
});

const newsletterSchema = z.object({ email: z.string().trim().email().max(255) });

function serverClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => inquirySchema.parse(raw))
  .handler(async ({ data }) => {
    const supabase = serverClient();
    const { error } = await supabase.from("inquiries").insert({
      ...data,
      travel_date: data.travel_date || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => newsletterSchema.parse(raw))
  .handler(async ({ data }) => {
    const supabase = serverClient();
    const { error } = await supabase.from("newsletter_subscribers").insert(data);
    // Ignore unique-violation errors — silently succeed for repeat signups
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true as const };
  });
