import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { brands } from "../data/brands";

export default function BrandPage() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);
  const [following, setFollowing] = useState(false);

  if (!brand) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink text-cream">
        <p className="font-display text-2xl">This brand isn't live.</p>
        <Link to="/" className="text-sm text-cream/50 underline underline-offset-4">
          Back to Adhunt
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ink">
      <Nav />

      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <img src={brand.heroImage} alt={brand.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="absolute inset-x-6 bottom-10 md:inset-x-10">
          <p className="text-xs uppercase tracking-[0.2em] text-wine">
            {brand.category} — {brand.country}
          </p>
          <h1 className="mt-3 font-display text-4xl text-cream md:text-6xl">{brand.name}</h1>
          <p className="mt-3 max-w-md text-sm text-cream/60">{brand.tagline}</p>
        </div>
      </section>

      <section className="border-b border-cream/10 px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl text-sm leading-relaxed text-cream/60">{brand.body}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-cream/40">
              {brand.followers.toLocaleString()} followers
            </span>
            <button
              onClick={() => setFollowing((f) => !f)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition ${
                following
                  ? "border border-cream/30 bg-transparent text-cream"
                  : "bg-cream text-ink hover:bg-russet-light"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.22em] text-cream/40">{brand.offerHeadline}</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl text-cream">{brand.offerCopy}</h2>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border-y border-cream/10 sm:grid-cols-2 lg:grid-cols-3">
            {brand.catalog.map((item, i) => (
              <div key={item.id} className="bg-ink p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm text-cream/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-display text-lg text-cream">{item.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cream/40">
                  {item.material}
                </p>
                <p className="mt-2 text-sm text-cream/70">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-cream/10 px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cream/40">Craft</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/60">{brand.body}</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-cream/10">
            <div className="bg-ink p-8">
              <p className="font-display text-3xl text-cream">{brand.stat1.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-cream/40">
                {brand.stat1.label}
              </p>
            </div>
            <div className="bg-ink p-8">
              <p className="font-display text-3xl text-cream">{brand.stat2.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-cream/40">
                {brand.stat2.label}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
