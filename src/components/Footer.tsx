import Link from "next/link";
import { Flame, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Full Menu", href: "/menu" },
      { label: "Litti & Chokha", href: "/menu?c=litti-chokha" },
      { label: "Champaran Special", href: "/menu?c=champaran-special" },
      { label: "Mithai & Sweets", href: "/menu?c=mithai-sweets" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Bulk & Catering", href: "/contact" },
      { label: "Track Order", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-masala-950 text-cream-100">
      <div className="absolute inset-0 opacity-[0.06] grain" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron-500/60 to-transparent" />

      <div className="container-bb relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-chili-600">
                <Flame className="h-6 w-6 text-white" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl font-extrabold">
                  Bihari<span className="text-saffron-400">Bhojan</span>
                </span>
                <span className="font-hindi text-[13px] text-cream-100/60">
                  बिहारी भोजन
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/65">
              Bringing the smoky, ghee-soaked soul of Bihar to your doorstep —
              from coal-roasted Litti Chokha to slow-cooked Champaran handi
              mutton. Cooked fresh, delivered hot.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream-100/15 text-cream-100/70 transition-colors hover:border-saffron-400 hover:bg-saffron-400 hover:text-masala-900"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-base font-bold text-cream-50">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream-100/65 transition-colors hover:text-saffron-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-bold text-cream-50">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream-100/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-400" />
                Boring Road, Patna, Bihar 800001
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-saffron-400" />
                +91 612 345 6789
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-saffron-400" />
                hello@biharibhojan.com
              </li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-leaf-500/15 px-3 py-1.5 text-xs font-semibold text-leaf-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-400" />
              Open daily · 9 AM – 11 PM
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-6 text-sm text-cream-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} BihariBhojan. Made with ❤️ in Bihar.</p>
          <p className="flex items-center gap-4">
            <Link href="#" className="hover:text-saffron-400">
              Privacy
            </Link>
            <Link href="#" className="hover:text-saffron-400">
              Terms
            </Link>
            <span>biharibhojan.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
