import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

interface PendingApp {
  id: string;
  brand: string;
  domain: string;
  score: number;
  status: "pending_review" | "pending" | "rejected" | "live" | "expired";
}

const seed: PendingApp[] = [
  { id: "1", brand: "Marrow Studio", domain: "marrowstudio.com", score: 78, status: "pending_review" },
  { id: "2", brand: "Tundish Goods", domain: "tundishgoods.in", score: 55, status: "pending" },
  { id: "3", brand: "Loom & Last", domain: "loomandlast.co", score: 31, status: "rejected" },
];

export default function Admin() {
  const [apps, setApps] = useState(seed);

  const decide = (id: string, status: PendingApp["status"]) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <div className="bg-ink">
      <Nav />
      <section className="px-6 pb-24 pt-32 md:px-10">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-xs uppercase tracking-[0.22em] text-cream/40">Admin</p>
          <h1 className="mt-4 font-display text-3xl text-cream">Pending brands</h1>
          <p className="mt-3 max-w-md text-sm text-cream/60">
            No paid model makes this decision. The free checklist recommends; you approve.
          </p>

          <div className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
            {apps.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-4 py-6">
                <div>
                  <p className="font-display text-lg text-cream">{a.brand}</p>
                  <p className="mt-1 text-xs text-cream/40">{a.domain}</p>
                </div>
                <p className="text-sm text-cream/60">Score {a.score}/100</p>
                <StatusBadge status={a.status} />
                <div className="flex gap-2">
                  <button
                    onClick={() => decide(a.id, "live")}
                    className="rounded-full border border-cream/20 px-4 py-2 text-xs text-cream transition hover:bg-cream hover:text-ink"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => decide(a.id, "rejected")}
                    className="rounded-full border border-wine/40 px-4 py-2 text-xs text-wine transition hover:bg-wine hover:text-cream"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function StatusBadge({ status }: { status: PendingApp["status"] }) {
  const color =
    status === "live"
      ? "text-russet-light"
      : status === "rejected"
      ? "text-wine"
      : status === "expired"
      ? "text-cream/30"
      : "text-cream/60";
  return <p className={`text-xs uppercase tracking-[0.14em] ${color}`}>{status.replace("_", " ")}</p>;
}
