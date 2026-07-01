"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Full-screen branded splash shown while the app boots — a professional
 * zoom-in / breathe / fade reveal. Shows once per browser session.
 *
 * IMPORTANT: the overlay must NEVER block clicks once it starts hiding. We do
 * NOT use AnimatePresence for unmount (it can leave the node mounted at
 * opacity:0 while still capturing pointer events, freezing the whole page).
 * Instead we self-control the fade via CSS + a timer, flip pointer-events to
 * `none` the instant we begin leaving, and unmount on our own schedule.
 */
export default function SplashScreen() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Already shown this session → don't render at all.
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("bb_splash_seen");
    } catch {
      /* ignore */
    }
    if (seen) {
      setMounted(false);
      return;
    }

    let unmountTimer: number | undefined;
    let done = false;
    const start = Date.now();

    const hide = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem("bb_splash_seen", "1");
      } catch {
        /* ignore */
      }
      setLeaving(true); // fades out + disables pointer events immediately
      unmountTimer = window.setTimeout(() => setMounted(false), 600);
    };

    const onReady = () => {
      const wait = Math.max(0, 1700 - (Date.now() - start));
      window.setTimeout(hide, wait);
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    // Safety net: never keep the splash up for more than 4s no matter what.
    const safety = window.setTimeout(hide, 4000);
    return () => {
      window.removeEventListener("load", onReady);
      window.clearTimeout(safety);
      if (unmountTimer) window.clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-[#fdfaf1] transition-opacity duration-500 ease-in-out"
      style={{
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* soft warm glow behind the mark */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[min(72vw,440px)] w-[min(72vw,440px)] rounded-full bg-saffron-200/50 blur-3xl"
        animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* logo: zoom-in entrance + gentle breathing */}
      <motion.div
        className="pointer-events-none relative"
        initial={{ scale: 0.68, opacity: 0 }}
        animate={{ scale: [1, 1.06, 1], opacity: 1 }}
        transition={{
          scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5, ease: "easeOut" },
        }}
      >
        <Image
          src="/biharibhojanlogo.png"
          alt="BihariBhojan — घर जैसा स्वाद, बिहारी अंदाज़"
          width={320}
          height={320}
          priority
          className="h-auto w-[min(66vw,320px)] select-none drop-shadow-sm"
        />
      </motion.div>

      {/* loading dots */}
      <div className="pointer-events-none absolute bottom-[16%] flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-chili-500"
            animate={{ y: [0, -7, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
