import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Brand } from "../lib/types";

export default function FeaturedStill({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <section ref={ref} className="grain relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-ink">
      <motion.img
        style={{ opacity, rotate }}
        src={brand.catalog[1]?.image ?? brand.revealImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />
      <div className="absolute inset-x-6 bottom-10 md:inset-x-10">
        <p className="max-w-md font-display text-lg italic text-cream/80">
          "{brand.offerCopy}"
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cream/40">
          {brand.name} — {brand.category}
        </p>
      </div>
    </section>
  );
}
