import { supabase } from "@/integrations/supabase/client";

const PUSH_SUBSCRIPTION_TABLE = "admin_push_subscriptions";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);

  for (let i = 0; i < raw.length; ++i) {
    output[i] = raw.charCodeAt(i);
  }

  return output;
}

export async function registerPushNotifications() {
  if (!("serviceWorker" in navigator)) return false;
  if (!("PushManager" in window)) return false;

  const permission = Notification.permission;
  if (permission !== "granted") return false;

  const registration = await navigator.serviceWorker.ready;
  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) {
    console.warn("Missing VITE_VAPID_PUBLIC_KEY. Browser push is disabled.");
    return false;
  }

  const existing = await registration.pushManager.getSubscription();
  if (existing) {
    await upsertPushSubscription(existing);
    return true;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  await upsertPushSubscription(subscription);
  return true;
}

async function upsertPushSubscription(subscription: PushSubscription) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return;

  const payload = {
    user_id: user.id,
    endpoint: subscription.endpoint,
    p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh") ?? new Uint8Array()))),
    auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("auth") ?? new Uint8Array()))),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from(PUSH_SUBSCRIPTION_TABLE).upsert(payload, {
    onConflict: "endpoint",
  });

  if (error) throw error;
}
