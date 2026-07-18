import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/bookings")({
  component: () => (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-forest">My bookings</h1>
      <Card className="mt-6 p-8 text-center">
        <Construction className="mx-auto mb-3 h-8 w-8 text-gold" />
        Coming in Phase 3.
      </Card>
    </div>
  ),
});
