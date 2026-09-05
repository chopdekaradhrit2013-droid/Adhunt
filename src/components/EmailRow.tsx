import type React from "react";
import { useState } from "react";

export default function EmailRow() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <section id="circle" className="border-t border-cream/10 bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-cream/40">Inner circle</p>
        <h3 className="mt-4 font-display text-3xl text-cream">First look at verified drops.</h3>
        <p className="mt-3 text-sm text-cream/50">
          One email, sent only when a brand you follow goes live. Unsubscribe any time.
        </p>

        {sent ? (
          <p className="mt-8 text-sm text-cream/70">
            You're on the list — first drops land in your inbox from here.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full max-w-xs rounded-full border border-cream/20 bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-cream/50"
            />
            <button
              type="submit"
              className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition hover:bg-russet-light"
            >
              Join the circle
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
