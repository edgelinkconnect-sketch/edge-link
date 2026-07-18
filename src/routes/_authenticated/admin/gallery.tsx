import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: () => (
    <div>
      <h1 className="font-display text-3xl font-bold text-forest">Gallery management</h1>
      <Card className="mt-6 flex items-center gap-4 p-8">
        <Construction className="h-8 w-8 text-gold" />
        <div>
          <div className="font-semibold text-forest">Coming in Phase 2</div>
          <p className="text-sm text-muted-foreground">Upload, tag by location, AI-image removal, bulk operations.</p>
        </div>
      </Card>
    </div>
  ),
});
