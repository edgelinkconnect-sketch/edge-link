import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User as UserIcon, Phone } from "lucide-react";
import heroPoster from "@/assets/hero-mountains.jpg";

const logoUrl = "/pwa-icon-512.png";

const searchSchema = z.object({
  redirect: z.string().optional(),
  mode: z.enum(["signin", "signup"]).optional(),
});

type Prefill = { email: string; password: string; n: number } | null;

const DEMO_ACCOUNTS = [
  { label: "Demo Admin", email: "admin.demo@edgelinktours.com", password: "EdgelinkDemo2026!" },
  {
    label: "Super Demo (admin)",
    email: "super.demo@edgelinktours.com",
    password: "EdgelinkSuper2026!",
  },
  {
    label: "Demo Traveller",
    email: "traveller.demo@edgelinktours.com",
    password: "EdgelinkTravel2026!",
  },
];

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in — EDGELINK Tours" },
      {
        name: "description",
        content:
          "Sign in or create your EDGELINK account to manage bookings and share experiences.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useTranslation();
  const { user, loading, role, isAdmin } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signin");
  const [prefill, setPrefill] = useState<Prefill>(null);

  useEffect(() => {
    if (!loading && user && role) {
      navigate({ to: (search.redirect as any) || (isAdmin ? "/admin" : "/dashboard"), replace: true });
    }
  }, [user, loading, role, isAdmin, navigate, search.redirect]);

  return (
    <main className={`auth-page ${mode === "signup" ? "auth-signup" : "auth-signin"}`}>
      <section className="auth-scene" aria-hidden="true">
        <video
          className="auth-scene-video"
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          preload="metadata"
        >
          <source src="/resources/video.mp4" type="video/mp4" />
        </video>
        <div className="auth-scene-overlay" />
        <Link to="/" className="auth-side-brand" aria-label="EDGELINK Tours home">
          <img src={logoUrl} alt="EDGELINK Tours logo" />
        </Link>
        <div className="auth-scene-copy">
          <span className="auth-eyebrow">Rwanda, slowly discovered</span>
          <p className="auth-scene-title">
            Take the long
            <br />
            <em>way home.</em>
          </p>
          <p className="auth-scene-caption">
            The quiet roads, the high country, and a little more time to look around.
          </p>
        </div>
      </section>

      <section className="auth-panel-wrap">
        <div className="auth-panel-top">
          <span className="auth-secure-note">{t("brand.tagline")}</span>
        </div>
        <div className="auth-panel">
          <div className="auth-panel-intro">
            <span className="auth-eyebrow">
              {mode === "signin" ? t("auth.signInSubtitle") : t("auth.signUpSubtitle")}
            </span>
            <h1>{mode === "signin" ? t("auth.signIn") : t("auth.signUp")}</h1>
            <p>
              {mode === "signin"
                ? "Sign in to your client or admin account."
                : "Create a client account to manage your journeys and conversations."}
            </p>
          </div>
          <div className="auth-tabs" role="tablist" aria-label="Account access">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={mode === "signin" ? "active" : ""}
            >
              {t("auth.signIn")}
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={mode === "signup" ? "active" : ""}
            >
              {t("auth.signUp")}
            </button>
          </div>

          {mode === "signin" ? (
            <SignInForm prefill={prefill} />
          ) : (
            <SignUpForm onSuccess={() => setMode("signin")} />
          )}
        </div>

        <div className="auth-demo">
          <p className="auth-demo-label">{t("common.getStarted")}</p>
          <div className="mt-3 grid gap-2">
            {DEMO_ACCOUNTS.map((d) => (
              <button
                key={d.email}
                type="button"
                onClick={() => {
                  setMode("signin");
                  setPrefill({ ...d, n: Date.now() });
                }}
                className="auth-demo-account"
              >
                <span>
                  <span className="block font-semibold">{d.label}</span>
                  <span className="block">{d.email}</span>
                </span>
                <span>{t("common.getStarted")}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="auth-legal">
          {t("footer.legal")} · <Link to="/terms" className="auth-legal-link">{t("footer.terms")}</Link>{" "}
          · <Link to="/privacy" className="auth-legal-link">{t("footer.privacy")}</Link>.
        </p>
      </section>
    </main>
  );
}

function SignInForm({ prefill }: { prefill: Prefill }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!prefill) return;
    setEmail(prefill.email);
    setPassword(prefill.password);
  }, [prefill]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(t("auth.signInSuccess"));
  };

  const forgot = async () => {
    if (!email) return toast.error(t("auth.email"));
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return toast.error(error.message);
    toast.success(t("auth.sendReset"));
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field
        id="email"
        icon={Mail}
        label={t("auth.email")}
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
        inputMode="email"
      />
      <Field
        id="password"
        icon={Lock}
        label={t("auth.password")}
        type="password"
        value={password}
        onChange={setPassword}
        required
        autoComplete="current-password"
      />
      <Button
        type="submit"
        className="h-11 w-full bg-forest text-base text-cream hover:bg-forest-deep"
        disabled={busy}
      >
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t("auth.signIn")}
      </Button>
      <button
        type="button"
        onClick={forgot}
        className="w-full text-center text-xs text-forest underline hover:text-forest-deep"
      >
        {t("auth.forgotPassword")}
      </button>
    </form>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName, phone },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(t("auth.signUpSuccess"));
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field
        id="fullName"
        icon={UserIcon}
        label={t("auth.fullName")}
        value={fullName}
        onChange={setFullName}
        required
        autoComplete="name"
      />
      <Field
        id="phone"
        icon={Phone}
        label={t("auth.phone")}
        type="tel"
        value={phone}
        onChange={setPhone}
        placeholder="+250 788 000 000"
        autoComplete="tel"
        inputMode="tel"
      />
      <Field
        id="email"
        icon={Mail}
        label={t("auth.email")}
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
        inputMode="email"
      />
      <Field
        id="password"
        icon={Lock}
        label={t("auth.password")}
        type="password"
        value={password}
        onChange={setPassword}
        required
        autoComplete="new-password"
      />
      <Button
        type="submit"
        className="h-11 w-full bg-gold text-base text-gold-foreground hover:brightness-95"
        disabled={busy}
      >
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t("auth.signUp")}
      </Button>
    </form>
  );
}

function Field({
  id,
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  autoComplete,
  inputMode,
}: {
  id: string;
  icon: React.ElementType;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-forest">
        {label}
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          autoCapitalize={type === "email" ? "none" : undefined}
          autoCorrect={type === "email" ? "off" : undefined}
          className="h-11 pl-9 text-base"
        />
      </div>
    </div>
  );
}
