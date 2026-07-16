import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/destinations")({
  component: () => <Outlet />,
});
