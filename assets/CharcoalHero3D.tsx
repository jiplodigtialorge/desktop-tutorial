import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Flame, Sparkles, ShoppingCart, PlayCircle } from "lucide-react";

/**
 * 3D Charcoal Hero – Spinning Bag Carousel
 * -------------------------------------------------
 * - Production‑ready React component using TailwindCSS + Framer Motion
 * - Strong, colorful brand gradient background
 * - Auto‑spinning hero that cycles through three charcoal bags
 * - Subtle parallax/tilt + 3D card shadow glow
 * - CTA buttons (Buy Now, Watch Roast Demo)
 * - Responsive and accessible
 *
 * HOW TO USE
 * - Drop into any React/Tailwind project.
 * - Replace BAG_IMAGE_URL_* with your real PNG/WebP with transparent background.
 * - Adjust brand palette in BRAND object.
 */

const BAG_IMAGE_URL_1 =
  "https://images.unsplash.com/photo-1606815963758-f9a1f7b7f9c8?q=80&w=1200&auto=format&fit=crop"; // placeholder
const BAG_IMAGE_URL_2 =
  "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop"; // placeholder
const BAG_IMAGE_URL_3 =
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop"; // placeholder

const BRAND = {
  name: "J&J Culinary Charcoal",
  tagline: "Fire that tastes like heritage.",
  gradient:
    "bg-[radial-gradient(1200px_600px_at_10%_10%,#ff7a18_0%,transparent_60%),radial-gradient(1000px_600px_at_90%_20%,#af00ff_0%,transparent_50%),radial-gradient(800px_500px_at_50%_110%,#00e0ff_0%,transparent_60%),linear-gradient(135deg,#0b0f19,#0b0f19)]",
  accent: "#ff7a18",
  accent2: "#00e0ff",
};

const BAGS = [
  {
    id: "ember-pro",
    name: "EMBER PRO",
    flavor: "Oak + Mesquite Blend",
    heat: "High BTU | Low Ash",
    img: BAG_IMAGE_URL_1,
    hue: "from-orange-400 to-pink-500",
  },
  {
    id: "smoke-blue",
    name: "SMOKE BLUE",
    flavor: "Hickory Reserve",
    heat: "Medium BTU | Long Burn",
    img: BAG_IMAGE_URL_2,
    hue: "from-sky-400 to-indigo-500",
  },
  {
    id: "lava-gold",
    name: "LAVA GOLD",
    flavor: "Quebracho Supremo",
    heat: "Ultra BTU | Restaurant Grade",
    img: BAG_IMAGE_URL_3,
    hue: "from-amber-400 to-rose-500",
  },
];

const useInterval = (cb: () => void, delay: number) => {
  useEffect(() => {
    const id = setInterval(cb, delay);
    return () => clearInterval(id);
  }, [cb, delay]);
};

export default function CharcoalHero3D() {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  // Auto‑spin through bags every 4.5s
  useInterval(() => setIndex((i) => (i + 1) % BAGS.length), 4500);

  const active = useMemo(() => BAGS[index], [index]);

  // Spin ring animation (continuous)
  useEffect(() => {
    controls.start({ rotate: 360 }, { type: "tween", duration: 20, repeat: Infinity, ease: "linear" });
  }, [controls]);

  return (
    <section
      className={`relative overflow-hidden ${BRAND.gradient} text-white min-h-[92vh] w-full flex items-center`}
    >
      {/* Glow + particles */}
      <DecorativeBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 px-6 py-16 md:flex-row md:gap-12">
        {/* Copy block */}
        <div className="max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider backdrop-blur">
            <Flame className="h-3.5 w-3.5" />
            Premium Lump Charcoal
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
            Bold heat. <span className="opacity-80">Clean burn.</span>
            <br />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {BRAND.name}
            </span>
          </h1>
          <p className="mt-4 text-base/7 text-white/80 sm:text-lg/8">
            {BRAND.tagline} Engineered for chefs, pitmasters, and ambitious backyard grills. Three signature bags, one iconic flame.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#buy"
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <ShoppingCart className="h-4 w-4" /> Buy Now
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-black/20 transition hover:bg-white"
            >
              <PlayCircle className="h-4 w-4" /> Watch Roast Demo
            </a>
          </div>

          {/* Pills for quick spec cues */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {["Low Ash", "Fast Ignite", "Food‑Safe", "Sustainably Sourced"].map((t) => (
              <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* 3D Rotating Card */}
        <div className="relative grid place-items-center">
          <motion.div
            animate={controls}
            className="pointer-events-none absolute inset-0 -z-10 m-auto hidden h-[520px] w-[520px] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl md:block"
          />

          <div className="[perspective:1400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ rotateY: 30, opacity: 0, y: 40 }}
                animate={{ rotateY: 0, opacity: 1, y: 0 }}
                exit={{ rotateY: -30, opacity: 0, y: -40 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="relative mx-auto w-[330px] sm:w-[380px] md:w-[430px]"
              >
                <div className={`relative rounded-[28px] border border-white/10 bg-gradient-to-br ${active.hue} p-1 shadow-2xl shadow-black/40`}
                  style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}
                >
                  <div className="rounded-[26px] bg-gradient-to-b from-black/50 to-black/30 p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-white/70">Signature Blend</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
                        {active.heat}
                      </span>
                    </div>

                    <div className="relative mx-auto grid place-items-center">
                      <motion.img
                        src={active.img}
                        alt={`${active.name} bag`}
                        className="h-[320px] w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                        initial={{ rotateX: 15, rotateZ: -5, y: 20, scale: 0.96 }}
                        animate={{ rotateX: 0, rotateZ: 0, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 14 }}
                      />
                      {/* glow */}
                      <div className="pointer-events-none absolute -bottom-2 h-24 w-4/5 rounded-full bg-black/60 blur-2xl" />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-center text-2xl font-extrabold tracking-tight">
                        {active.name}
                      </h3>
                      <p className="mt-1 text-center text-sm text-white/85">{active.flavor}</p>
                    </div>
                  </div>
                </div>

                {/* Tab dots */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  {BAGS.map((b, i) => (
                    <button
                      key={b.id}
                      aria-label={`Show ${b.name}`}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === index ? "bg-white" : "bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom ribbon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}

function DecorativeBackground() {
  return (
    <>
      {/* Soft edge vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_1200px_at_50%_20%,transparent_40%,rgba(0,0,0,0.65)_80%)]" />

      {/* Sparkles */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-0 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2">
        {[...Array(36)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
            }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Corner badges */}
      <div className="pointer-events-none absolute right-4 top-4 z-10 hidden select-none items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs backdrop-blur md:inline-flex">
        <Sparkles className="h-3.5 w-3.5" />
        Chef‑Trusted • Restaurant Grade
      </div>
    </>
  );
}
