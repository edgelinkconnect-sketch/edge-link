import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { FloatingCTA } from "./floating-cta";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
