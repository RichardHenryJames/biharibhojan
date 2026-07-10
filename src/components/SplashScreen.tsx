"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** A brief, non-interactive brand curtain shown once per browser session. */
export default function SplashScreen() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("bb_splash_seen");
    } catch {
      /* storage may be unavailable */
    }

    if (seen) {
      setMounted(false);
      return;
    }

    const leaveTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("bb_splash_seen", "1");
      } catch {
        /* storage may be unavailable */
      }
      setLeaving(true);
    }, 650);
    const unmountTimer = window.setTimeout(() => setMounted(false), 1050);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="brand-splash" style={{ opacity: leaving ? 0 : 1 }} aria-hidden>
      <motion.div
        className="brand-splash__wordmark"
        initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 24% 0)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Bihari</span>
        <em>Bhojan.</em>
        <small>घर जैसा स्वाद, बिहारी अंदाज़</small>
      </motion.div>
      <span className="brand-splash__rule" />
    </div>
  );
}
