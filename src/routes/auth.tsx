import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User as UserIcon, Phone } from "lucide-react";
import logo from "@/assets/edgelink-logo.png.asset.json";

const searchSchema = z.object({
  redirect: z.string().optional(),
  mode: z.enum(["signin", "signup"]).optional(),
});

type Prefill = { email: string; password: string; n: number } | null;

const DEMO_ACCOUNTS = [
  { label: "Demo Admin", email: "admin.demo@edgelinktours.com", password: "EdgelinkDemo2026!" },
  { label: "Super Demo (admin)", email: "super.demo@edgelinktours.com", password: "EdgelinkSuper2026!" },
  { label: "Demo Traveller", email: "traveller.demo@edgelinktours.com", password: "EdgelinkTravel2026!" },
];

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in — EDGELINK Tours" },
      { name: "description", content: "Sign in or create your EDGELINK account to manage bookings and share experiences." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signin");

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: (search.redirect as any) || "/dashboard", replace: true });
    }
  }, [user, loading, navigate, search.redirect]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-forest via-forest-deep to-forest px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-3 sm:mb-8">
          <img src={logo.url} alt="EDGELINK" className="h-12 w-12 rounded-full ring-2 ring-gold sm:h-14 sm:w-14" />
          <div className="text-cream">
            <div className="font-display text-xl font-bold sm:text-2xl">EDGELINK</div>
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-80">Tours</div>
          </div>
        </Link>

        <Card className="border-cream/20 bg-cream p-5 shadow-2xl sm:p-8">
          <div className="mb-6 flex gap-2 rounded-lg bg-muted p-1">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-forest text-cream" : "text-forest"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-forest text-cream" : "text-forest"}`}
            >
              Create Account
            </button>
          </div>

          {mode === "signin" ? <SignInForm prefill={prefill} /> : <SignUpForm onSuccess={() => setMode("signin")} />}
        </Card>

        <div className="mt-6 rounded-xl border border-cream/20 bg-cream/5 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Demo accounts</p>
          <div className="mt-3 grid gap-2">
            {DEMO_ACCOUNTS.map((d) => (
              <button
                key={d.email}
                type="button"
                onClick={() => { setMode("signin"); setPrefill({ ...d, n: Date.now() }); }}
                className="flex items-center justify-between gap-3 rounded-lg bg-cream/10 px-3 py-2.5 text-left text-xs text-cream transition active:scale-[0.99] hover:bg-cream/20"
              >
                <span>
                  <span className="block font-semibold">{d.label}</span>
                  <span className="block text-cream/60">{d.email}</span>
                </span>
                <span className="shrink-0 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold text-gold-foreground">Use</span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-cream/70">
          By continuing you agree to EDGELINK's terms & privacy.
        </p>
      </div>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
  };

  const forgot = async () => {
    if (!email) return toast.error("Enter your email first");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return toast.error(error.message);
    toast.success("Reset link sent — check your email");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field id="email" icon={Mail} label="Email" type="email" value={email} onChange={setEmail} required />
      <Field id="password" icon={Lock} label="Password" type="password" value={password} onChange={setPassword} required />
      <Button type="submit" className="w-full bg-forest text-cream hover:bg-forest-deep" disabled={busy}>
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
      </Button>
      <button type="button" onClick={forgot} className="w-full text-center text-xs text-forest underline hover:text-forest-deep">
        Forgot password?
      </button>
    </form>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
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
    toast.success("Account created — signing you in");
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field id="fullName" icon={UserIcon} label="Full name" value={fullName} onChange={setFullName} required />
      <Field id="phone" icon={Phone} label="Phone (with country code)" value={phone} onChange={setPhone} placeholder="+250 788 000 000" />
      <Field id="email" icon={Mail} label="Email" type="email" value={email} onChange={setEmail} required />
      <Field id="password" icon={Lock} label="Password (min 8 chars)" type="password" value={password} onChange={setPassword} required />
      <Button type="submit" className="w-full bg-gold text-gold-foreground hover:brightness-95" disabled={busy}>
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
      </Button>
    </form>
  );
}

function Field({
  id, icon: Icon, label, type = "text", value, onChange, required, placeholder,
}: {
  id: string;
  icon: React.ElementType;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-forest">{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>
    </div>
  );
}
