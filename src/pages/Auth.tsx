import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

type Role = "consumer" | "brand";
type Method = "magic-link" | "password";

export default function Auth() {
  const [role, setRole] = useState<Role>("consumer");
  const [method, setMethod] = useState<Method>("magic-link");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    if (method === "magic-link") {
      setSent(true);
      return;
    }
    navigate(role === "brand" ? "/apply" : "/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Nav />
      <div className="flex flex-1 items-center justify-center px-6 py-32">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex gap-6 border-b border-cream/10 pb-4 text-sm">
            <button
              onClick={() => setRole("consumer")}
              className={role === "consumer" ? "text-cream" : "text-cream/40"}
            >
              I'm a person
            </button>
            <button
              onClick={() => setRole("brand")}
              className={role === "brand" ? "text-cream" : "text-cream/40"}
            >
              I'm a brand
            </button>
          </div>

          <h1 className="font-display text-2xl text-cream">
            {role === "consumer" ? "Follow the brands you wear" : "Access your brand console"}
          </h1>

          {sent ? (
            <p className="mt-6 text-sm text-cream/60">
              Check {email} for a link — it expires in 15 minutes.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-5">
              {role === "consumer" && (
                <div>
                  <label className="text-xs text-cream/50">Display name (not your legal name)</label>
                  <input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="what should we call you"
                    className="mt-2 block w-full border-b border-cream/20 bg-transparent py-2 text-sm text-cream placeholder:text-cream/25 focus:border-cream/60"
                  />
                </div>
              )}
              <div>
                <label className="text-xs text-cream/50">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="mt-2 block w-full border-b border-cream/20 bg-transparent py-2 text-sm text-cream placeholder:text-cream/25 focus:border-cream/60"
                />
              </div>

              {method === "password" && (
                <div>
                  <label className="text-xs text-cream/50">Password</label>
                  <input
                    type="password"
                    required
                    className="mt-2 block w-full border-b border-cream/20 bg-transparent py-2 text-sm text-cream focus:border-cream/60"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-cream py-3 text-sm font-medium text-ink transition hover:bg-russet-light"
              >
                {method === "magic-link" ? "Send magic link" : "Continue"}
              </button>

              <button
                type="button"
                onClick={() => setMethod((m) => (m === "magic-link" ? "password" : "magic-link"))}
                className="w-full text-center text-xs text-cream/40 underline underline-offset-4"
              >
                {method === "magic-link" ? "Use a password instead" : "Use a magic link instead"}
              </button>
            </form>
          )}

          <p className="mt-10 text-xs text-cream/30">
            <Link to="/" className="underline underline-offset-4">
              Back to Adhunt
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
