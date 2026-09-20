import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: Array<{ revision: string | null; url: string }> };

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  const payload = event.data?.json() ?? {
    title: "EDGELINK",
    body: "You have a new notification.",
    url: "/admin/quotations",
  };

  const options = {
    body: payload.body,
    icon: "/pwa-icon-192.png",
    badge: "/pwa-icon-192.png",
    data: { url: payload.url ?? "/admin/quotations" },
    vibrate: [120, 60, 120],
  };

  event.waitUntil(self.registration.showNotification(payload.title ?? "EDGELINK", options));
});

self.addEventListener("notificationclick", (event) => {
  event.preventDefault();
  const url = event.notification?.data?.url ?? "/admin/quotations";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }

      return clients.openWindow(url);
    }),
  );
});
