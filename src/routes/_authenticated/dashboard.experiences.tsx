import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/dashboard/experiences")({
  head: () => ({ meta: [{ title: "Share an experience — EDGELINK Tours" }, { name: "robots", content: "noindex" }] }),
  component: MyExperiences,
});

function MyExperiences() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [bookingId, setBookingId] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const { data: completed } = useQuery({
    queryKey: ["completed-bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("id, booking_number, tour_id, travel_end, tours(name)")
        .eq("client_id", user!.id)
        .eq("status", "completed");
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: mine } = useQuery({
    queryKey: ["my-experiences", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("id, rating, message, status, submitted_at, tours(name)")
        .eq("client_id", user!.id)
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  const submit = useMutation({
    mutationFn: async () => {
      const booking = completed?.find((b) => b.id === bookingId);
      if (!booking) throw new Error("Choose a completed booking first.");
      if (message.trim().length < 10) throw new Error("Tell us a little more about your trip.");

      const paths: string[] = [];
      for (const file of files.slice(0, 5)) {
        const path = `${user!.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error } = await supabase.storage.from("experiences").upload(path, file);
        if (error) throw error;
        paths.push(path);
      }

      const { error } = await supabase.from("experiences").insert({
        client_id: user!.id,
        booking_id: booking.id,
        tour_id: booking.tour_id,
        rating,
        message: message.trim().slice(0, 200),
        images: paths,
        experience_date: date || booking.travel_end || new Date().toISOString().slice(0, 10),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Thank you — your experience is awaiting review");
      setMessage("");
      setFiles([]);
      setBookingId("");
      void qc.invalidateQueries({ queryKey: ["my-experiences"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <h1 className="font-display text-3xl font-bold text-forest">Share an experience</h1>
        <p className="text-sm text-muted-foreground">
          Available once a journey is marked completed. Approved stories appear on our site.
        </p>

        <Card className="mt-6 p-6">
          {completed?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You don't have a completed journey yet. <Link to="/dashboard/bookings" className="underline">View bookings</Link>.
            </p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                submit.mutate();
              }}
            >
              <div className="space-y-1.5">
                <Label>Journey</Label>
                <select
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select a completed booking…</option>
                  {completed?.map((b) => (
                    <option key={b.id} value={b.id}>
                      {(b as { tours?: { name?: string } }).tours?.name} · {b.booking_number}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                      <Star className={`h-6 w-6 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Your story ({message.length}/200)</Label>
                <Textarea rows={4} maxLength={200} value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Date of experience</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Photos (up to 5)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 5))}
                  />
                </div>
              </div>

              <Button type="submit" disabled={submit.isPending} className="w-full bg-gold text-gold-foreground">
                {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit for review
              </Button>
            </form>
          )}
        </Card>

        {mine && mine.length > 0 && (
          <div className="mt-8 space-y-3">
            <h2 className="font-display text-xl font-semibold text-forest">Your submissions</h2>
            {mine.map((x) => (
              <Card key={x.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
                <div>
                  <div className="font-semibold text-forest">{(x as { tours?: { name?: string } }).tours?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {"★".repeat(x.rating)} · {format(new Date(x.submitted_at), "PP")}
                  </div>
                  <p className="mt-1 max-w-xl text-sm">{x.message}</p>
                </div>
                <StatusBadge status={x.status} />
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
