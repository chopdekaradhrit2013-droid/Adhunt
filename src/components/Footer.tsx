import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink px-6 pb-10 pt-16 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-8 text-sm text-cream/50">
          <div className="flex flex-wrap gap-6">
            <Link to="/apply" className="transition hover:text-cream">
              For brands
            </Link>
            <Link to="/auth" className="transition hover:text-cream">
              Sign in
            </Link>
            <Link to="/admin" className="transition hover:text-cream">
              Admin
            </Link>
          </div>
          <p>Checked against public records and domain ownership.</p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="select-none font-display text-[15vw] leading-[0.85] text-cream/90 md:text-[11vw]"
        >
          adhunt
        </motion.p>
      </div>
    </footer>
  );
}
