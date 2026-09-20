import { createClient } from "@supabase/supabase-js";
import { webpush } from "web-push";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const vapidPublicKey = process.env.VITE_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VITE_VAPID_PRIVATE_KEY;

if (!vapidPublicKey || !vapidPrivateKey) {
  console.warn("Missing VAPID keys for push notifications");
}

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    "mailto:admin@edgelink.com",
    vapidPublicKey,
    vapidPrivateKey,
  );
}

Deno.serve(async (req) => {
  const body = await req.json();
  const { record } = body;

  if (!record?.id) {
    return new Response(JSON.stringify({ ok: false, error: "Missing record" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: subs, error } = await supabase
    .from("admin_push_subscriptions")
    .select("endpoint, p256dh, auth")
    .eq("user_id", record.user_id ?? "");

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!subs?.length) {
    return new Response(JSON.stringify({ ok: true, sent: 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = JSON.stringify({
    title: "New quotation request",
    body: `${record.full_name} requested a quote for ${record.tour_name ?? "a tour"}`,
    url: "/admin/quotations",
  });

  let sent = 0;

  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        },
        payload,
      );
      sent += 1;
    } catch {
      // Ignore failed pushes; they can be cleaned up later.
    }
  }

  return new Response(JSON.stringify({ ok: true, sent }), {
    headers: { "Content-Type": "application/json" },
  });
});
