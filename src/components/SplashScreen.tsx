"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen branded splash shown while the app boots — a professional
 * zoom-in / breathe / zoom-out reveal. Shows once per browser session so
 * in-app navigation never replays it, and never blocks longer than 4s.
 */
export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let done = false;
    const hide = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem("bb_splash_seen", "1");
      } catch {
        /* ignore */
      }
      setShow(false);
    };

    try {
      if (sessionStorage.getItem("bb_splash_seen")) {
        setShow(false);
        return;
      }
    } catch {
      /* ignore */
    }

    const start = Date.now();
    const onReady = () => {
      // Let the zoom animation breathe for at least ~1.7s before revealing.
      const wait = Math.max(0, 1700 - (Date.now() - start));
      window.setTimeout(hide, wait);
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    // Safety net: never keep the site hidden for more than 4s.
    const safety = window.setTimeout(hide, 4000);
    return () => {
      window.removeEventListener("load", onReady);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[120] grid place-items-center bg-[#fdfaf1]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
        >
          {/* soft warm glow behind the mark */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[min(72vw,440px)] w-[min(72vw,440px)] rounded-full bg-saffron-200/50 blur-3xl"
            animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* logo: zoom-in entrance, gentle breathing, zoom-out on exit */}
          <motion.div
            className="relative"
            initial={{ scale: 0.68, opacity: 0 }}
            animate={{ scale: [1, 1.06, 1], opacity: 1 }}
            exit={{ scale: 1.18, opacity: 0 }}
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
          <div className="absolute bottom-[16%] flex items-center gap-2">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
