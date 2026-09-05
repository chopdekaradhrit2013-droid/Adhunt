import type React from "react";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Brand } from "../lib/types";
import Magnetic from "./Magnetic";

export default function Hero({ brand }: { brand: Brand }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchRevealed, setTouchRevealed] = useState(false);

  const xPct = useMotionValue(50);
  const yPct = useMotionValue(50);
  const radius = useMotionValue(0);

  const springX = useSpring(xPct, { stiffness: 140, damping: 20 });
  const springY = useSpring(yPct, { stiffness: 140, damping: 20 });
  const springR = useSpring(radius, { stiffness: 120, damping: 22 });

  const clipPath = useMotionTemplate`circle(${springR}px at ${springX}% ${springY}%)`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const handleMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    xPct.set(((e.clientX - rect.left) / rect.width) * 100);
    yPct.set(((e.clientY - rect.top) / rect.height) * 100);
    radius.set(260);
  };

  const handleLeave = () => radius.set(0);

  const handleTap = () => {
    setTouchRevealed((v) => !v);
    xPct.set(50);
    yPct.set(50);
    radius.set(touchRevealed ? 0 : 900);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-gradient-to-br from-dusk via-[#1b1512] to-[#241209]"
    >
      <motion.div
        style={{ opacity: typeOpacity, y: typeY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <span className="font-display text-[22vw] leading-none tracking-tightest2 text-cream/[9%] md:text-[16vw]">
          {brand.name}
        </span>
      </motion.div>

      <motion.div
        style={{ scale }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleTap}
        className="absolute left-1/2 top-1/2 h-[62%] w-[46%] min-w-[260px] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-[2px] shadow-[0_40px_120px_rgba(0,0,0,0.55)] md:w-[30%]"
      >
        <img
          src={brand.heroImage}
          alt={`${brand.name} — ${brand.category}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.img
          style={{ clipPath }}
          src={brand.revealImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
      </motion.div>

      <div className="absolute inset-x-6 top-[18%] z-10 max-w-sm md:inset-x-10 md:top-[22%]">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/60">
          {brand.plan === "OBSIDIA" ? "Homepage takeover" : "Featured brand"}
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-cream md:text-5xl">
          {brand.tagline}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-cream/70">{brand.offerCopy}</p>
        <Magnetic className="mt-6 inline-block">
          <a
            href={brand.ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition hover:bg-russet-light"
          >
            {brand.ctaLabel}
          </a>
        </Magnetic>
      </div>

      <div className="absolute inset-x-6 bottom-[30%] z-10 max-w-xs text-left md:inset-x-auto md:right-10 md:top-[24%] md:bottom-auto md:text-right">
        <p className="font-display text-xl text-cream md:text-2xl">{brand.category}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-russet-light">
          {brand.country}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-cream/60 md:ml-auto md:max-w-[220px]">
          {brand.body}
        </p>
      </div>

      <div className="absolute inset-x-6 bottom-6 z-10 flex flex-wrap items-end justify-between gap-4 md:inset-x-10">
        <div className="flex gap-3">
          <StatChip value={brand.stat1.value} label={brand.stat1.label} />
          <StatChip value={brand.stat2.value} label={brand.stat2.label} />
        </div>
        <div className="rounded-2xl border border-cream/15 bg-cream/10 px-4 py-3 backdrop-blur-md">
          <p className="text-sm text-cream">
            <span className="font-display">{brand.followers.toLocaleString()}</span> people follow{" "}
            {brand.name}
          </p>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-cream/40 md:hidden">
        Tap the photo to reveal
      </div>
      <p className="pointer-events-none absolute right-10 top-[54%] hidden -translate-y-1/2 rotate-90 text-[11px] uppercase tracking-[0.2em] text-cream/30 lg:block">
        Move to reveal
      </p>
    </section>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-cream/15 bg-cream/10 px-4 py-3 backdrop-blur-md">
      <p className="font-display text-xl text-cream">{value}</p>
      <p className="text-[11px] uppercase tracking-[0.14em] text-cream/50">{label}</p>
    </div>
  );
}
