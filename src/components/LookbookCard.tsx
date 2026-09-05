import type React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import type { Brand } from "../lib/types";

export default function LookbookCard({ brand, index }: { brand: Brand; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(280px circle at ${x}% ${y}%, rgba(242,230,208,0.14), transparent 70%)`;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <Link to={`/b/${brand.slug}`} className="group relative block bg-ink">
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="relative flex h-full flex-col justify-between overflow-hidden border-cream/10 p-6 transition-colors md:p-10"
      >
        <motion.div
          style={{ background: bg }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative z-10 flex items-start justify-between">
          <span className="font-display text-sm text-cream/40">
            {String(index).padStart(2, "0")}
          </span>
          {brand.verified && (
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-cream/40">
              <VerifiedTick />
              {brand.country}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-6 aspect-[4/5] w-full overflow-hidden">
          <img
            src={brand.heroImage}
            alt={`${brand.name} offer`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>

        <div className="relative z-10 mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xl text-cream">{brand.name}</p>
            <p className="mt-1 text-sm text-cream/50">{brand.offerHeadline}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-cream/70">{brand.catalog[0]?.price}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-wine underline decoration-wine/40 underline-offset-4">
              {brand.ctaLabel}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function VerifiedTick() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#8B1E3F" />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="#F2E6D0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
