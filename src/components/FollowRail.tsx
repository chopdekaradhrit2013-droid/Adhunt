import { useState } from "react";
import type { Brand } from "../lib/types";

export default function FollowRail({
  brands,
  onFilter,
}: {
  brands: Brand[];
  onFilter: (slug: string | null) => void;
}) {
  const [followed, setFollowed] = useState<string[]>(brands.slice(0, 4).map((b) => b.slug));
  const [active, setActive] = useState<string | null>(null);

  const toggleFollow = (slug: string) => {
    setFollowed((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug]));
  };

  const select = (slug: string | null) => {
    setActive(slug);
    onFilter(slug);
  };

  if (followed.length === 0) {
    return (
      <div className="border-y border-cream/10 bg-ink px-6 py-10 text-center md:px-10">
        <p className="font-display text-lg text-cream/70">
          Pick five brands you already wear.
        </p>
      </div>
    );
  }

  return (
    <div id="brands" className="border-y border-cream/10 bg-ink px-6 py-6 md:px-10">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 overflow-x-auto pb-1">
        <button
          onClick={() => select(null)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
            active === null
              ? "border-cream bg-cream text-ink"
              : "border-cream/20 text-cream/70 hover:border-cream/50"
          }`}
        >
          All followed
        </button>
        {brands
          .filter((b) => followed.includes(b.slug))
          .map((b) => (
            <button
              key={b.slug}
              onClick={() => select(b.slug)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                active === b.slug
                  ? "border-cream bg-cream text-ink"
                  : "border-cream/20 text-cream/80 hover:border-cream/50"
              }`}
            >
              <img
                src={b.heroImage}
                alt=""
                className="h-6 w-6 rounded-full object-cover"
                aria-hidden="true"
              />
              {b.name}
            </button>
          ))}
        <div className="mx-2 h-6 w-px shrink-0 bg-cream/10" />
        {brands
          .filter((b) => !followed.includes(b.slug))
          .map((b) => (
            <button
              key={b.slug}
              onClick={() => toggleFollow(b.slug)}
              className="shrink-0 rounded-full border border-dashed border-cream/20 px-3 py-1.5 text-sm text-cream/40 transition hover:border-cream/50 hover:text-cream/70"
            >
              + Follow {b.name}
            </button>
          ))}
      </div>
    </div>
  );
}
