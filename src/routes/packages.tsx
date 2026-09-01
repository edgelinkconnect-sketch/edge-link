import { createFileRoute, redirect } from "@tanstack/react-router";

// Itineraries are now part of the unified /tours explorer.
export const Route = createFileRoute("/packages")({
  beforeLoad: () => {
    throw redirect({ to: "/tours", replace: true });
  },
});
