"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, UtensilsCrossed } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const floats = [
  // `mobile` cards show on every screen; the others appear from sm+ to avoid clutter.
  { emoji: "🍖", label: "Champaran Mutton", price: "₹449", cls: "-left-2 top-8 sm:left-0 sm:top-10", delay: "0s", mobile: true },
  { emoji: "🍪", label: "Thekua", price: "₹149", cls: "-right-1 top-2 sm:right-2 sm:top-0", delay: "1.1s", mobile: true },
  { emoji: "🥤", label: "Sattu Sharbat", price: "₹69", cls: "-right-3 bottom-24", delay: "0.6s", mobile: false },
  { emoji: "🫓", label: "Sattu Paratha", price: "₹199", cls: "-left-3 bottom-12", delay: "1.6s", mobile: false },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decor */}
      <div className="pointer-events-none absolute inset-0 bg-hero-grain" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-saffron-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-chili-300/30 blur-3xl" />

      <div className="container-bb grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
        {/* Left */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-saffron-300 bg-cream-50/80 px-4 py-1.5 text-xs font-semibold text-chili-700 shadow-soft backdrop-blur"
          >
            <span className="flex h-2 w-2">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-leaf-500/70" />
              <span className="h-2 w-2 rounded-full bg-leaf-500" />
            </span>
            Now delivering across Patna · Live kitchen
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.02] text-masala-900 sm:text-6xl lg:text-[4.1rem]"
          >
            The smoky soul of{" "}
            <span className="text-gradient">Bihar</span>,
            <br />
            delivered hot.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-base leading-relaxed text-masala-600 sm:text-lg"
          >
            From coal-roasted{" "}
            <span className="font-semibold text-masala-800">Litti Chokha</span> to
            slow-cooked{" "}
            <span className="font-semibold text-masala-800">Champaran Handi Mutton</span>{" "}
            — real recipes from Magadh to Mithila, cooked fresh and brought to your
            door.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/menu" className="btn-primary h-12 px-7 text-base">
              Order Now <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/about" className="btn-ghost h-12 px-6 text-base">
              Our Story
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2.5">
                {["😋", "🤤", "😍", "🥰"].map((e, i) => (
                  <span
                    key={i}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream-100 bg-saffron-200 text-base"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 font-bold text-masala-900">
                  <Star className="h-4 w-4 fill-saffron-500 text-saffron-500" /> 4.9
                </div>
                <span className="text-masala-500">12,000+ happy plates</span>
              </div>
            </div>

            <span className="hidden h-10 w-px bg-masala-200 sm:block" />

            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf-100 text-leaf-700">
                <Clock className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <div className="font-bold text-masala-900">35–50 min</div>
                <span className="text-masala-500">avg. delivery</span>
              </div>
            </div>

            <span className="hidden h-10 w-px bg-masala-200 sm:block" />

            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-chili-100 text-chili-700">
                <UtensilsCrossed className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <div className="font-bold text-masala-900">34+ dishes</div>
                <span className="text-masala-500">across 6 thalis</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          {/* Rotating ring */}
          <div className="absolute inset-4 animate-spin-slow rounded-full border border-dashed border-saffron-400/40" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron-300/40 via-cream-200 to-chili-200/50 blur-xl" />

          {/* Plate */}
          <div className="absolute inset-8 grid place-items-center rounded-full bg-gradient-to-br from-saffron-400 via-saffron-500 to-chili-600 shadow-glow">
            <div className="absolute inset-3 rounded-full border-4 border-cream-50/30" />
            {/* steam */}
            <div className="absolute -top-2 flex gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-8 w-1.5 animate-steam rounded-full bg-cream-50/70 blur-[2px]"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
            <span className="text-[6.5rem] drop-shadow-[0_10px_24px_rgba(0,0,0,0.3)] sm:text-[8rem]">🔥</span>
            <span className="absolute bottom-8 rounded-full bg-masala-900/85 px-4 py-1.5 text-xs font-bold text-cream-50 backdrop-blur sm:text-sm">
              Litti Chokha · ₹149
            </span>
          </div>

          {/* Floating cards */}
          {floats.map((f) => (
            <div
              key={f.label}
              className={`absolute ${f.cls} ${f.mobile ? "" : "hidden sm:block"} animate-float`}
              style={{ animationDelay: f.delay }}
            >
              <div className="flex items-center gap-2 rounded-2xl border border-masala-100 bg-cream-50/95 px-3 py-2 shadow-card backdrop-blur sm:gap-2.5 sm:px-3.5 sm:py-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream-200 text-xl sm:h-10 sm:w-10 sm:text-2xl">
                  {f.emoji}
                </span>
                <div className="leading-tight">
                  <div className="text-xs font-bold text-masala-900">{f.label}</div>
                  <div className="text-xs font-semibold text-chili-600">{f.price}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Specialty marquee */}
      <div className="border-y border-masala-100 bg-masala-900 py-3.5">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
            {marqueeContent}
            {marqueeContent}
          </div>
        </div>
      </div>
    </section>
  );
}

const SPECIALS = [
  "Coal-roasted Litti",
  "Champaran Handi Mutton",
  "Sattu Paratha",
  "Silao Khaja",
  "Gaya Tilkut",
  "Dal Pitha",
  "Thekua",
  "Sattu Sharbat",
  "Makhana Kheer",
];

const marqueeContent = (
  <>
    {SPECIALS.map((s) => (
      <span key={s} className="flex items-center gap-8 text-cream-100/90">
        <span className="font-display text-lg font-semibold">{s}</span>
        <span className="text-saffron-400">✦</span>
      </span>
    ))}
  </>
);
