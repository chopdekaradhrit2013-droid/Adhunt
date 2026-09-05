import { Link } from "react-router-dom";
import type { Brand } from "../lib/types";
import LookbookCard from "./LookbookCard";

export default function OffersLookbook({ brands }: { brands: Brand[] }) {
  return (
    <section className="bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs uppercase tracking-[0.22em] text-wine">Autumn drops — vol. 01</p>
        <h2 className="mt-3 max-w-lg font-display text-3xl leading-tight text-cream md:text-4xl">
          Live offers from brands you already <em className="text-wine font-normal">chose</em>.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border-y border-cream/10 md:grid-cols-2">
          {brands.map((brand, i) => (
            <LookbookCard key={brand.slug} brand={brand} index={i + 1} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/apply"
            className="text-sm text-cream/50 underline decoration-cream/20 underline-offset-4 transition hover:text-cream"
          >
            Brand not here yet? Apply to be verified
          </Link>
        </div>
      </div>
    </section>
  );
}
