import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
        <Link to="/" className="font-display text-lg tracking-tight text-cream">
          adhunt
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-cream/80 md:flex">
          <Link to="/" className="transition hover:text-cream">
            Home
          </Link>
          <a href="/#brands" className="transition hover:text-cream">
            Brands
          </a>
          <Link to="/apply" className="transition hover:text-cream">
            For brands
          </Link>
          <a href="/#circle" className="transition hover:text-cream">
            Contact
          </a>
        </nav>
        <Link
          to="/apply"
          className="rounded-full border border-cream/30 bg-cream/10 px-5 py-2 text-sm text-cream backdrop-blur transition hover:bg-cream hover:text-ink"
        >
          List a brand
        </Link>
      </div>
    </header>
  );
}
