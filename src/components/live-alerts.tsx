import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { showNotification } from "@/lib/notifications";

/**
 * Listens for new chat messages (and new bookings for admins) in realtime and
 * raises a desktop / phone system notification plus an in-app toast.
 */
export function LiveAlerts() {
  const { user, isAdmin, loading } = useAuth();
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (loading || !user) return;
    const uid = user.id;

    const channel = supabase.channel(`alerts-${uid}`);

    channel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        const row = payload.new as {
          id: string;
          sender_id: string;
          sender_role: string;
          message: string | null;
          chat_id: string;
        };
        if (!row?.id || row.sender_id === uid || seen.current.has(row.id)) return;
        seen.current.add(row.id);

        const from = row.sender_role === "admin" ? "EDGELINK support" : "A traveller";
        const body = row.message?.slice(0, 140) || "Sent an attachment";
        const url = isAdmin ? "/admin/chat" : "/dashboard/chat";

        toast.message(`New message from ${from}`, { description: body });
        void showNotification({
          title: `New message · ${from}`,
          body,
          tag: `chat-${row.chat_id}`,
          url,
        });
      },
    );

    if (isAdmin) {
      channel.on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          const row = payload.new as {
            id: string;
            booking_number: string;
            full_name: string;
            adults: number;
            children: number;
          };
          if (!row?.id || seen.current.has(row.id)) return;
          seen.current.add(row.id);

          const body = `${row.full_name} · ${row.adults} adult${row.adults === 1 ? "" : "s"}${
            row.children ? ` + ${row.children} children` : ""
          } · ${row.booking_number}`;

          toast.success("New booking received", { description: body });
          void showNotification({
            title: "New booking received",
            body,
            tag: `booking-${row.id}`,
            url: "/admin/bookings",
          });
        },
      );
    }

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user, isAdmin, loading]);

  return null;
}
