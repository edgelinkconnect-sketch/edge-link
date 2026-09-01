import { useNavigate } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  label?: string;
};

/**
 * Sends the traveller straight into the live chat system.
 * Signed out → bounced to /auth with a clear explanation and a redirect back.
 */
export function AskSpecialistButton({ className, variant, size = "default", label }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const go = () => {
    if (user) {
      void navigate({ to: "/dashboard/chat" });
      return;
    }
    toast.info(t("specialist.signInTitle"), { description: t("specialist.signInBody") });
    void navigate({ to: "/auth", search: { redirect: "/dashboard/chat" } as never });
  };

  return (
    <Button onClick={go} variant={variant} size={size} className={cn(className)}>
      <MessageSquare className="mr-2 h-4 w-4" />
      {label ?? t("specialist.cta")}
    </Button>
  );
}
