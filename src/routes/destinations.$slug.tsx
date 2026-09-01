import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy destination pages now live inside the unified /tours explorer.
export const Route = createFileRoute("/destinations/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/tours", replace: true });
  },
});
