import { useEffect, useState } from "react";
import { Download, X, WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { registerServiceWorker } from "@/lib/pwa";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "edgelink_pwa_dismissed";

export function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    void registerServiceWorker();

    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    setOffline(!navigator.onLine);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      if (localStorage.getItem(DISMISS_KEY) !== "1") setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", () => setVisible(false));

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeinstallprompt", onPrompt);
    };
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {offline && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 bg-forest px-4 py-1.5 text-xs font-medium text-cream"
          >
            <WifiOff className="h-3.5 w-3.5" /> You're offline — showing your saved pages
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="fixed bottom-4 left-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-4 shadow-luxe"
          >
            <button onClick={dismiss} aria-label="Dismiss" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3">
              <img src="/pwa-icon-192.png" alt="" width={44} height={44} className="h-11 w-11 rounded-xl" />
              <div>
                <div className="font-display text-sm font-bold text-forest">Install EDGELINK Tours</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add the app to your home screen for instant access to bookings, chat and offline itineraries.
                </p>
              </div>
            </div>
            <Button onClick={() => void install()} size="sm" className="mt-3 w-full bg-gold text-gold-foreground hover:brightness-95">
              <Download className="mr-1.5 h-4 w-4" /> Install app
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
