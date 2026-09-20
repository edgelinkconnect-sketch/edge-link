import { useEffect, useState } from "react";
import { Bell, BellOff, BellRing } from "lucide-react";
import { toast } from "sonner";
import {
  notificationPermission,
  requestNotificationPermission,
  showNotification,
} from "@/lib/notifications";
import { registerPushNotifications } from "@/lib/push";
import { cn } from "@/lib/utils";

export function NotificationToggle({ className }: { className?: string }) {
  const [state, setState] = useState<NotificationPermission | "unsupported">("default");

  useEffect(() => {
    setState(notificationPermission());
  }, []);

  if (state === "unsupported") return null;

  const enable = async () => {
    const result = await requestNotificationPermission();
    setState(result);
    if (result === "granted") {
      try {
        await registerPushNotifications();
        await showNotification({
          title: "Alerts are on",
          body: "You'll be notified here about new messages, bookings, and quote requests.",
          tag: "alerts-on",
        });
        toast.success("Notifications enabled on this device");
      } catch (error) {
        console.error(error);
        toast.error("Could not enable push alerts on this device. Try again in a moment.");
      }
    } else if (result === "denied") {
      toast.error("Notifications blocked — enable them in your browser settings");
    }
  };

  const granted = state === "granted";
  const denied = state === "denied";

  return (
    <button
      type="button"
      onClick={() => { if (!granted) void enable(); }}
      disabled={granted}
      title={
        granted
          ? "Notifications are on for this device"
          : denied
            ? "Blocked — allow notifications in your browser settings"
            : "Turn on notifications for new messages and bookings"
      }
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition",
        granted
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "hover:bg-muted",
        className,
      )}
    >
      {granted ? <BellRing className="h-3.5 w-3.5" /> : denied ? <BellOff className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
      {granted ? "Alerts on" : denied ? "Alerts blocked" : "Enable alerts"}
    </button>
  );
}
