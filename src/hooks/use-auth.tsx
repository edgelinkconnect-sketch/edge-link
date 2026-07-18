import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

type Role = "admin" | "client" | null;

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  role: Role;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  role: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    // Register listener first (per Supabase best practice)
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (!s?.user) setRole(null);

      // Defer role fetch to avoid deadlock in the listener
      if (s?.user) {
        setTimeout(() => {
          void fetchRole(s.user.id);
        }, 0);
      }

      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        router.invalidate();
        if (event !== "SIGNED_OUT") qc.invalidateQueries();
      }
    });

    // Then hydrate
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) void fetchRole(data.session.user.id);
      setLoading(false);
    });

    async function fetchRole(uid: string) {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid);
      if (!mounted) return;
      const roles = (data ?? []).map((r) => r.role);
      if (roles.includes("admin")) setRole("admin");
      else if (roles.includes("client")) setRole("client");
      else setRole("client");
    }

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [qc, router]);

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, role, loading, isAdmin: role === "admin", signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
