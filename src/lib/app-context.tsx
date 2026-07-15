import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "guest" | "client" | "admin" | "guide";
export type User = { name: string; email: string; role: Role };

export type CartItem = {
  tourId: string;
  tourName: string;
  date: string;
  groupSize: number;
  pricePerPerson: number;
  vehicle: string;
  lodging: string;
};

export type ChatMessage = { id: string; from: "client" | "admin"; text: string; time: string };
export type Conversation = { id: string; client: string; avatar: string; unread: number; messages: ChatMessage[] };

type AppState = {
  user: User;
  setRole: (r: Role) => void;
  signIn: (name: string, role: Role) => void;
  signOut: () => void;
  cart: CartItem[];
  addToCart: (i: CartItem) => void;
  clearCart: () => void;
  conversations: Conversation[];
  activeConvId: string | null;
  setActiveConvId: (id: string | null) => void;
  sendMessage: (convId: string, text: string, from: "client" | "admin") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const AppCtx = createContext<AppState | null>(null);

const initialConversations: Conversation[] = [
  {
    id: "c1", client: "Aisha Uwimana", avatar: "AU", unread: 2,
    messages: [
      { id: "m1", from: "client", text: "Hello! Is the gorilla permit included in the 3-day trek?", time: "09:12" },
      { id: "m2", from: "admin", text: "Yes — permit, guide, and park entry are all included.", time: "09:14" },
      { id: "m3", from: "client", text: "Perfect. Can we add a Land Cruiser upgrade?", time: "09:16" },
    ],
  },
  {
    id: "c2", client: "Blessing Okafor", avatar: "BO", unread: 0,
    messages: [
      { id: "m1", from: "client", text: "Booking confirmed for Akagera — thank you!", time: "yesterday" },
    ],
  },
  {
    id: "c3", client: "Élise Dupont", avatar: "ED", unread: 1,
    messages: [
      { id: "m1", from: "client", text: "Bonjour, avez-vous des guides francophones ?", time: "08:03" },
    ],
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ name: "Guest", email: "", role: "guest" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>("c1");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("rwiza-theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("rwiza-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };

  const setRole = (role: Role) => setUser((u) => ({ ...u, role }));
  const signIn = (name: string, role: Role) =>
    setUser({ name, email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`, role });
  const signOut = () => setUser({ name: "Guest", email: "", role: "guest" });

  const addToCart = (i: CartItem) => setCart((c) => [...c, i]);
  const clearCart = () => setCart([]);

  const sendMessage = (convId: string, text: string, from: "client" | "admin") => {
    setConversations((cs) =>
      cs.map((c) =>
        c.id === convId
          ? {
              ...c,
              unread: from === "client" ? c.unread + 1 : 0,
              messages: [
                ...c.messages,
                { id: `m${Date.now()}`, from, text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
              ],
            }
          : c,
      ),
    );
  };

  return (
    <AppCtx.Provider
      value={{ user, setRole, signIn, signOut, cart, addToCart, clearCart, conversations, activeConvId, setActiveConvId, sendMessage, theme, toggleTheme }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
