import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-forest">{title}</h1>
      <Card className="mt-6 flex items-center gap-4 p-8">
        <Construction className="h-8 w-8 text-gold" />
        <div>
          <div className="font-semibold text-forest">Coming in Phase 2</div>
          <p className="text-sm text-muted-foreground">Full management interface builds after foundation review.</p>
        </div>
      </Card>
    </div>
  );
}

export const toursRoute = { title: "Tours" };
export default Placeholder;
