import { createFileRoute, redirect } from "@tanstack/react-router";

// Destinations, tours and itineraries are now one unified explorer at /tours.
export const Route = createFileRoute("/destinations/")({
  beforeLoad: () => {
    throw redirect({ to: "/tours", replace: true });
  },
});
