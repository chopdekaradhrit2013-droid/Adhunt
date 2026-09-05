import { useMemo, useState } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import FollowRail from "../components/FollowRail";
import OffersLookbook from "../components/OffersLookbook";
import FeaturedStill from "../components/FeaturedStill";
import Manifesto from "../components/Manifesto";
import EmailRow from "../components/EmailRow";
import Footer from "../components/Footer";
import { brands, takeoverBrand } from "../data/brands";

export default function Home() {
  const [filter, setFilter] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter ? brands.filter((b) => b.slug === filter) : brands),
    [filter]
  );

  const featured = brands.find((b) => b.slug === "nordwave") ?? brands[1];

  return (
    <div className="bg-ink">
      <Nav />
      <Hero brand={takeoverBrand} />
      <FollowRail brands={brands} onFilter={setFilter} />
      <OffersLookbook brands={visible} />
      <FeaturedStill brand={featured} />
      <Manifesto />
      <EmailRow />
      <Footer />
    </div>
  );
}
