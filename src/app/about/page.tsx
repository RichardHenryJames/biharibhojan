import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Flame, HandHeart, Leaf, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why we started BihariBhojan — to bring the smoky, ghee-soaked, heirloom flavours of Bihar to every homesick plate across India.",
};

const STATS = [
  { value: "34+", label: "Heirloom dishes" },
  { value: "6", label: "Regions of Bihar" },
  { value: "12k+", label: "Plates served" },
  { value: "4.9★", label: "Average rating" },
];

const REGIONS = [
  {
    region: "Champaran",
    emoji: "🍖",
    dish: "Ahuna Handi Mutton",
    note: "Sealed in clay, slow-cooked over wood fire with mustard oil & whole spices.",
  },
  {
    region: "Magadh & Gaya",
    emoji: "🍪",
    dish: "Litti Chokha · Tilkut",
    note: "Coal-roasted sattu littis and Gaya's brittle sesame-jaggery tilkut.",
  },
  {
    region: "Silao, Nalanda",
    emoji: "🥮",
    dish: "Silao Khaja",
    note: "The GI-tagged, 52-layered fried pastry glazed in sugar syrup.",
  },
  {
    region: "Mithila",
    emoji: "🥟",
    dish: "Dal Pitha · Makhana",
    note: "Steamed dal dumplings and fox-nuts from the ponds of north Bihar.",
  },
];

const VALUES = [
  {
    icon: Flame,
    title: "Real fire, real flavour",
    body: "Coal, clay handis and cast-iron tawas — the way Bihari food was always meant to be cooked.",
  },
  {
    icon: Leaf,
    title: "Honest ingredients",
    body: "Stone-ground sattu, cold-pressed mustard oil, pure desi ghee and jaggery. Nothing artificial.",
  },
  {
    icon: HandHeart,
    title: "Recipes from home",
    body: "Every dish is a family recipe, cooked by people who grew up eating it. Tested by Biharis.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
        <div className="pointer-events-none absolute -left-8 top-0 text-[9rem] opacity-10">
          🔥
        </div>
        <div className="container-bb relative py-14 lg:py-20">
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-chili-500" /> Our story
          </span>
          <h1 className="section-title max-w-3xl">
            We&apos;re on a mission to plate up{" "}
            <span className="text-gradient">the real Bihar</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-masala-600">
            Not the watered-down version. The smoky, fiery, ghee-dripping food our
            grandmothers made — delivered to every homesick Bihari, wherever they are.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-bb py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-saffron-400 via-saffron-500 to-chili-600 shadow-warm">
              <div className="absolute inset-0 opacity-20 grain mix-blend-overlay" />
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 place-items-center text-7xl">
                <span>🔥</span>
                <span>🍖</span>
                <span>🥮</span>
                <span>🥘</span>
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl bg-masala-900/85 px-4 py-3 text-cream-50 backdrop-blur">
                <p className="font-display text-lg font-bold">From a Patna kitchen</p>
                <p className="text-xs text-cream-100/70">to plates across India</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 text-[15px] leading-relaxed text-masala-600">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" /> How it began
              </span>
              <h2 className="section-title !text-3xl">
                Born out of a craving
              </h2>
              <p>
                BihariBhojan started with a simple, stubborn craving — for the litti
                chokha you only ever got right at home. Living away from Bihar, we
                realised thousands of us shared the same ache: nobody could make our
                food the way it&apos;s supposed to taste.
              </p>
              <p>
                So we did the obvious thing. We found the cooks who&apos;d been making
                these dishes for decades, brought in real coal and clay handis, and
                refused to compromise on a single ingredient — the mustard oil, the
                sattu, the ghee, the gud.
              </p>
              <p>
                Today, every order fires up that same coal. Whether it&apos;s Champaran
                mutton for a Sunday feast or a box of Chhath thekua for your parents,
                we cook it like family — because to us, it is.
              </p>
              <Link href="/menu" className="btn-primary mt-2 inline-flex">
                Taste it yourself <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-masala-950 py-14 text-cream-50">
        <div className="container-bb grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <Reveal key={s.label} className="text-center">
              <div className="font-display text-4xl font-extrabold text-saffron-400 sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-cream-100/65">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow="Sourced with pride"
          title={
            <>
              From every corner of <span className="text-gradient">Bihar</span>
            </>
          }
          subtitle="Each region has its own legend. We bring the best of them to one menu."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((r, i) => (
            <Reveal key={r.region} delay={i * 0.07}>
              <div className="card-surface h-full p-6">
                <span className="text-4xl">{r.emoji}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{r.region}</h3>
                <p className="mt-1 text-sm font-semibold text-chili-600">{r.dish}</p>
                <p className="mt-2 text-sm leading-relaxed text-masala-500">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200/50 py-20">
        <div className="container-bb">
          <SectionHeading
            eyebrow="What we stand for"
            title={
              <>
                Three promises we <span className="text-gradient">never break</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="card-surface h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-masala-500">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
