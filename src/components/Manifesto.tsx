import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular">
      {value}
      {suffix}
    </span>
  );
}

export default function Manifesto() {
  return (
    <section className="border-t border-cream/10 bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cream/40">Why people stay</p>
          <h3 className="mt-4 font-display text-2xl leading-snug text-cream">
            You followed these brands before Adhunt existed. This is just where they show up now —
            in one feed, without the rest of the internet's noise attached to them.
          </h3>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
            No brand appears here because it paid for your attention specifically. It appears
            because you picked it. The feed only ever grows the way your own taste does.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cream/40">Why brands pay</p>
          <h3 className="mt-4 font-display text-2xl leading-snug text-cream">
            A slot here costs money because the room is small on purpose. Every person in it
            already follows you, or something close enough to you.
          </h3>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
            Upload a pack, pass the free verification pass, and Adhunt composes the module. No
            designer, no ad account, no bidding war.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden border border-cream/10 md:grid-cols-4">
        {[
          { value: 100, suffix: "%", label: "verified before listing" },
          { value: 30, suffix: "", label: "brand cap per person" },
          { value: 5, suffix: "min", label: "target verification time" },
          { value: 0, suffix: "", label: "paid API keys used" },
        ].map((s) => (
          <div key={s.label} className="bg-ink p-8">
            <p className="font-display text-4xl text-cream">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-cream/40">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
