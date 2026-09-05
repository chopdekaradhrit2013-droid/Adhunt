import type React from "react";
import { useEffect, useMemo, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { runVerification } from "../lib/verification";
import type { CheckResult, VerificationResult } from "../lib/verification";
import type { Plan } from "../lib/types";

const PLANS: { id: Plan; includes: string; who: string }[] = [
  { id: "EMBER", includes: "1 live offer, brand page, basic hover module", who: "starter brands / local" },
  { id: "CINDER", includes: "5 live offers, hero-capable module, follow-list boost", who: "growing D2C" },
  { id: "OBSIDIA", includes: "Unlimited offers this cycle, homepage takeover window", who: "flagship / seasonal" },
];

interface FormState {
  legalName: string;
  tradingName: string;
  domain: string;
  country: string;
  email: string;
  offerCopy: string;
  ctaUrl: string;
}

const emptyForm: FormState = {
  legalName: "",
  tradingName: "",
  domain: "",
  country: "",
  email: "",
  offerCopy: "",
  ctaUrl: "",
};

export default function Apply() {
  const [plan, setPlan] = useState<Plan>("CINDER");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [logo, setLogo] = useState<string | null>(null);
  const [heroImg, setHeroImg] = useState<string | null>(null);
  const [revealImg, setRevealImg] = useState<string | null>(null);
  const [catalogImgs, setCatalogImgs] = useState<string[]>([]);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const readyToCheck = useMemo(
    () => form.legalName.trim().length > 1 && form.domain.trim().length > 3 && form.email.includes("@"),
    [form.legalName, form.domain, form.email]
  );

  useEffect(() => {
    if (!readyToCheck) {
      setResult(null);
      return;
    }
    let cancelled = false;
    setChecking(true);
    const t = setTimeout(async () => {
      const r = await runVerification({
        legalName: form.legalName,
        brandName: form.tradingName || form.legalName,
        domain: form.domain,
        email: form.email,
        country: form.country,
        heroImageUrl: heroImg ?? undefined,
      });
      if (!cancelled) {
        setResult(r);
        setChecking(false);
      }
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [form.legalName, form.tradingName, form.domain, form.email, form.country, heroImg, readyToCheck]);

  const onFile = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setter(URL.createObjectURL(file));
  };

  const onCatalogFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 8);
    setCatalogImgs(files.map((f) => URL.createObjectURL(f)));
  };

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const statusCopy = () => {
    if (!result) return null;
    if (result.recommendation === "approve")
      return { label: "pending_review — auto-recommend-approve", tone: "text-cream" };
    if (result.recommendation === "pending")
      return { label: "pending — needs a manual look", tone: "text-russet-light" };
    return { label: "rejected — see reasons below", tone: "text-wine" };
  };

  return (
    <div className="bg-ink">
      <Nav />

      <section className="px-6 pb-16 pt-32 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.22em] text-cream/40">For brands</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-cream md:text-5xl">
            Pass verification, upload a pack, be live in five minutes.
          </h1>
          <p className="mt-4 max-w-lg text-sm text-cream/60">
            No paid ad-network integrations here. This is the network. Free verification runs
            against public records — a human always has the final say.
          </p>
        </div>
      </section>

      <section className="border-t border-cream/10 px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.22em] text-cream/40">1 — Choose a plan</p>
          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-cream/10 md:grid-cols-3">
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`p-8 text-left transition ${
                  plan === p.id ? "bg-cream/10" : "bg-ink hover:bg-cream/5"
                }`}
              >
                <p className="font-display text-2xl text-cream">{p.id}</p>
                <p className="mt-3 text-sm text-cream/60">{p.includes}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-cream/40">{p.who}</p>
                {plan === p.id && (
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-russet-light">
                    Selected
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-cream/10 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cream/40">2 — Brand details</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Legal name" value={form.legalName} onChange={update("legalName")} required />
                <Field label="Trading name" value={form.tradingName} onChange={update("tradingName")} />
                <Field
                  label="Domain"
                  value={form.domain}
                  onChange={update("domain")}
                  placeholder="yourbrand.com"
                  required
                />
                <Field label="Country" value={form.country} onChange={update("country")} />
                <Field
                  label="Public email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="hello@yourbrand.com"
                  required
                  className="sm:col-span-2"
                  hint="Must match the domain above — this is the strongest free trust signal we have."
                />
                <Field
                  label="CTA URL"
                  value={form.ctaUrl}
                  onChange={update("ctaUrl")}
                  placeholder="https://yourbrand.com/drop"
                  className="sm:col-span-2"
                />
                <TextArea
                  label="Offer copy"
                  value={form.offerCopy}
                  onChange={update("offerCopy")}
                  placeholder="What's live right now, in one or two sentences."
                  className="sm:col-span-2"
                />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cream/40">3 — Upload pack</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FileField label="Logo" onChange={onFile(setLogo)} preview={logo} />
                <FileField label="Hero still (4:5 or 16:9)" onChange={onFile(setHeroImg)} preview={heroImg} />
                <FileField label="Reveal still (cutaway / lit variant)" onChange={onFile(setRevealImg)} preview={revealImg} />
                <div>
                  <label className="text-xs text-cream/50">Catalog stills (3–8)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onCatalogFiles}
                    className="mt-2 block w-full text-sm text-cream/60 file:mr-3 file:rounded-full file:border file:border-cream/20 file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-cream"
                  />
                  {catalogImgs.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                      {catalogImgs.map((src, i) => (
                        <img key={i} src={src} alt="" className="h-16 w-16 shrink-0 rounded object-cover" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!readyToCheck}
              className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition hover:bg-russet-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit for verification
            </button>

            {submitted && result && (
              <p className={`text-sm ${statusCopy()?.tone}`}>
                Status: {statusCopy()?.label}. Score {result.score}/100.
              </p>
            )}
          </form>

          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cream/40">
                4 — Verification checklist {checking && <span className="text-cream/30">(checking…)</span>}
              </p>
              <div className="mt-6 space-y-3">
                {!readyToCheck && (
                  <p className="text-sm text-cream/40">
                    Fill in legal name, domain, and email to run the free checks.
                  </p>
                )}
                {result?.checks.map((c) => (
                  <ChecklistRow key={c.id} check={c} />
                ))}
                {result && (
                  <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-4">
                    <p className="text-sm text-cream/60">Score</p>
                    <p className="font-display text-2xl text-cream">{result.score}/100</p>
                  </div>
                )}
                {result && result.reasons.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-wine">
                    {result.reasons.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cream/40">5 — Live preview</p>
              <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-sm border border-cream/10 bg-gradient-to-br from-dusk via-[#1b1512] to-[#241209] p-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-cream/40">
                  {plan === "OBSIDIA" ? "Homepage takeover" : "Brand module"}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-cream/10">
                    {heroImg ? (
                      <img src={heroImg} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-cream/30">
                        hero still
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-display text-xl text-cream">
                      {form.tradingName || form.legalName || "Your brand"}
                    </p>
                    <p className="mt-1 max-w-[220px] text-xs text-cream/50">
                      {form.offerCopy || "Your offer copy will render here once you write it."}
                    </p>
                  </div>
                </div>
                {logo && (
                  <img src={logo} alt="" className="absolute right-6 top-6 h-8 w-8 rounded-full object-cover" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  hint,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <div className={className}>
      <label className="text-xs text-cream/50">{label}</label>
      <input
        {...props}
        className="mt-2 block w-full border-b border-cream/20 bg-transparent py-2 text-sm text-cream placeholder:text-cream/25 focus:border-cream/60"
      />
      {hint && <p className="mt-1 text-[11px] text-cream/30">{hint}</p>}
    </div>
  );
}

function TextArea({
  label,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="text-xs text-cream/50">{label}</label>
      <textarea
        {...props}
        rows={2}
        className="mt-2 block w-full resize-none border-b border-cream/20 bg-transparent py-2 text-sm text-cream placeholder:text-cream/25 focus:border-cream/60"
      />
    </div>
  );
}

function FileField({
  label,
  onChange,
  preview,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
}) {
  return (
    <div>
      <label className="text-xs text-cream/50">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="mt-2 block w-full text-sm text-cream/60 file:mr-3 file:rounded-full file:border file:border-cream/20 file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-cream"
      />
      {preview && <img src={preview} alt="" className="mt-3 h-20 w-20 rounded object-cover" />}
    </div>
  );
}

function ChecklistRow({ check }: { check: CheckResult }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-cream/5 pb-3">
      <div>
        <p className="flex items-center gap-2 text-sm text-cream">
          <span className={check.passed ? "text-russet-light" : "text-cream/30"}>
            {check.passed ? "✓" : "·"}
          </span>
          {check.label}
          {check.mocked && (
            <span className="text-[10px] uppercase tracking-[0.1em] text-cream/30">(estimated)</span>
          )}
        </p>
        <p className="mt-1 pl-5 text-xs text-cream/40">{check.detail}</p>
      </div>
      <p className="shrink-0 text-xs text-cream/40">
        {check.points}/{check.maxPoints}
      </p>
    </div>
  );
}
