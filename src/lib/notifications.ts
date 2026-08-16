export type NotifyPayload = {
  title: string;
  body: string;
  tag?: string;
  url?: string;
};

export function notificationsSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

export function notificationPermission(): NotificationPermission | "unsupported" {
  if (!notificationsSupported()) return "unsupported";
  return Notification.permission;
}

export async function requestNotificationPermission() {
  if (!notificationsSupported()) return "unsupported" as const;
  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}

/**
 * Shows a system notification on desktop and Android/PWA.
 * Uses the service worker registration when available (required on mobile Chrome),
 * falling back to the plain Notification constructor on desktop.
 */
export async function showNotification({ title, body, tag, url }: NotifyPayload) {
  if (!notificationsSupported() || Notification.permission !== "granted") return false;

  const options: NotificationOptions & { vibrate?: number[]; data?: unknown } = {
    body,
    tag,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: { url: url ?? "/" },
    vibrate: [120, 60, 120],
  };

  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.showNotification(title, options);
        return true;
      }
    }
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
      if (url) window.location.href = url;
    };
    return true;
  } catch {
    return false;
  }
}
