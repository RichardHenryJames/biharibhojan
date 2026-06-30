import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Leaf,
  Clock,
  ShieldCheck,
  Search,
  ChefHat,
  Bike,
  Quote,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { getBestsellers, getCategories } from "@/lib/products";
import { gradientFor } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FEATURES = [
  {
    icon: Flame,
    title: "Coal-roasted, the real way",
    body: "Littis roasted over real coal, mutton sealed in clay handis. No shortcuts, no microwaves.",
  },
  {
    icon: Leaf,
    title: "Fresh, never frozen",
    body: "Cooked to order with stone-ground sattu, mustard oil and desi ghee — exactly like home.",
  },
  {
    icon: Clock,
    title: "Hot in 35–50 min",
    body: "Insulated packaging keeps your chokha smoky and your handi bubbling till it reaches you.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic recipes",
    body: "Heirloom recipes from Champaran, Gaya, Silao & Mithila — tasted and approved by Biharis.",
  },
];

const STEPS = [
  {
    icon: Search,
    title: "Pick your thali",
    body: "Browse 34+ Bihari classics across six categories and build your plate.",
  },
  {
    icon: ChefHat,
    title: "We cook fresh",
    body: "Our kitchen fires up the coal and clay handis the moment you order.",
  },
  {
    icon: Bike,
    title: "Delivered hot",
    body: "Smoky, ghee-soaked and piping hot — at your door in under an hour.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Tastes exactly like my nani's litti chokha in Patna. The smoky chokha and the ghee — pure nostalgia in every bite.",
    name: "Aditya Kumar",
    place: "Bengaluru",
    emoji: "😋",
  },
  {
    quote:
      "The Champaran handi mutton is unreal. Fall-off-the-bone tender with that mustard-oil punch. Ordered thrice this week!",
    name: "Priya Sinha",
    place: "Delhi NCR",
    emoji: "🤤",
  },
  {
    quote:
      "Finally authentic Thekua and Silao Khaja delivered fresh. Sent a box to my parents and they loved it.",
    name: "Rahul Verma",
    place: "Mumbai",
    emoji: "🥰",
  },
];

export default async function HomePage() {
  const [bestsellers, categories] = await Promise.all([
    getBestsellers(8),
    getCategories(),
  ]);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow="Explore the menu"
          title={
            <>
              Six flavours of <span className="text-gradient">Bihar</span>
            </>
          }
          subtitle="From the coal-roasted classics to syrup-soaked mithai — every corner of the state on one menu."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                href={`/menu?c=${c.slug}`}
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-card transition-transform hover:-translate-y-1 ${gradientFor(
                  c.slug,
                )}`}
              >
                <div className="absolute inset-0 opacity-20 grain mix-blend-overlay" />
                <div className="absolute -right-4 -top-4 text-7xl opacity-30 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {c.emoji}
                </div>
                <div className="relative">
                  <span className="text-4xl">{c.emoji}</span>
                  <h3 className="mt-3 font-display text-xl font-bold leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">{c.tagline}</p>
                </div>
                <div className="relative mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {c.count} dishes
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition-colors group-hover:bg-white group-hover:text-masala-900">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="relative bg-cream-200/50 py-20">
        <div className="container-bb">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Most loved"
              title={
                <>
                  This week&apos;s <span className="text-gradient">bestsellers</span>
                </>
              }
            />
            <Link
              href="/menu"
              className="group flex items-center gap-2 text-sm font-bold text-chili-700"
            >
              View full menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((item, i) => (
              <ProductCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow="Why BihariBhojan"
          title={
            <>
              Cooked with <span className="text-gradient">conviction</span>
            </>
          }
          subtitle="We obsess over the details that make Bihari food taste like Bihar."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="card-surface h-full p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-masala-500">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-masala-950 py-20 text-cream-100">
        <div className="absolute inset-0 opacity-[0.06] grain" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-saffron-500/20 blur-3xl" />
        <div className="container-bb relative">
          <SectionHeading
            eyebrow="How it works"
            title={
              <span className="text-cream-50">
                Hot food in <span className="text-saffron-400">three steps</span>
              </span>
            }
            subtitle={
              <span className="text-cream-100/70">
                No fuss. Just tap, and let the coal fires do their thing.
              </span>
            }
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative text-center">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-7xl font-black text-cream-100/5">
                    {i + 1}
                  </span>
                  <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-5 font-display text-xl font-bold text-cream-50">
                    {s.title}
                  </h3>
                  <p className="relative mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cream-100/65">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow="Loved across India"
          title={
            <>
              Homesick Biharis, <span className="text-gradient">happy plates</span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card-surface flex h-full flex-col p-7">
                <Quote className="h-8 w-8 text-saffron-400" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-masala-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-masala-100 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-saffron-200 text-xl">
                    {t.emoji}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-masala-900">
                      {t.name}
                    </span>
                    <span className="block text-xs text-masala-500">{t.place}</span>
                  </span>
                  <span className="ml-auto text-saffron-500">★★★★★</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-bb pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-chili-600 via-chili-700 to-masala-900 px-8 py-14 text-center text-cream-50 shadow-warm sm:px-16 sm:py-20">
            <div className="absolute inset-0 opacity-10 grain" />
            <div className="pointer-events-none absolute -left-10 -top-10 text-9xl opacity-15">
              🔥
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-6 text-9xl opacity-15">
              🍲
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
                Hungry for home?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-cream-100/80">
                Your Litti Chokha is one tap away. Order now and taste Bihar in under
                an hour.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/menu" className="btn-saffron h-12 px-8 text-base">
                  Order Now <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="btn h-12 border border-cream-100/30 px-7 text-base text-cream-50 hover:bg-cream-100/10"
                >
                  Read our story
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
