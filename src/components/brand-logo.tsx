import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const logoUrl = "/pwa-icon-512.png";

export function BrandLogo({
  className,
  imageClassName,
  showName = true,
  href = "/",
  onClick,
}: {
  className?: string;
  imageClassName?: string;
  showName?: boolean;
  href?: "/";
  onClick?: () => void;
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn("flex items-center gap-3", className)}
      aria-label="EDGELINK Tours home"
    >
      <img
        src={logoUrl}
        alt="EDGELINK Tours logo"
        className={cn("h-14 w-14 rounded-full object-cover ring-2 ring-gold", imageClassName)}
      />
      {showName && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-lg font-bold tracking-wide">EDGELINK</span>
          <span className="-mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gold">Tours</span>
        </span>
      )}
    </Link>
  );
}
