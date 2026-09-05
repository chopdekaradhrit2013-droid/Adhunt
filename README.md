# Adhunt — prototype

A sponsored-offer lookbook. Verified brands buy a plan; their upload pack becomes a
cinematic, cursor-reactive module. People follow the brands they already wear and see
nothing else.

Built with React + TypeScript + Vite + Tailwind + React Router + Framer Motion.
Zero paid API keys anywhere in the stack.

## Install & run

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`).

To type-check and build for production:

```bash
npm run build
npm run preview
```

## File tree

```
adhunt/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx              # React root, router provider
    ├── App.tsx                # Route table
    ├── index.css              # Tailwind layers, grain texture, reduced-motion rules
    ├── lib/
    │   ├── types.ts           # Brand / Plan / CatalogItem types
    │   └── verification.ts    # $0-key verification engine (see below)
    ├── data/
    │   └── brands.ts          # 6 seed brands (mixed Indian D2C + global), Unsplash images
    ├── components/
    │   ├── Nav.tsx
    │   ├── CursorRing.tsx     # desktop-only 22px cream ring cursor
    │   ├── Magnetic.tsx       # pointer-attraction wrapper for pills/CTAs
    │   ├── Hero.tsx           # Cinder mechanics: cursor-wipe mask reveal, giant type, scroll-pin
    │   ├── FollowRail.tsx     # avatar chips, filters the lookbook, empty state
    │   ├── OffersLookbook.tsx # Obsidia numbered rail container
    │   ├── LookbookCard.tsx   # one rail card: cursor-follow light + hover zoom
    │   ├── FeaturedStill.tsx  # "Forged moment" — grain + scroll fade/rotate
    │   ├── Manifesto.tsx      # two-column craft copy + count-up craft stats
    │   ├── EmailRow.tsx       # inner-circle capture, no dark patterns
    │   └── Footer.tsx         # huge wordmark, fades in on scroll
    └── pages/
        ├── Home.tsx           # A: hero, follow-rail, lookbook, featured still, manifesto, email, footer
        ├── BrandPage.tsx      # B: /b/:slug — mini Obsidia lookbook + Follow
        ├── Apply.tsx          # C: /apply — plans, form, upload pack, live checklist, live preview
        ├── Auth.tsx           # D: consumer | brand roles, magic-link or password
        └── Admin.tsx          # E: approve / reject pending brands
```

## What's real vs. mocked

**Real, keyless, and actually called from the browser:**
- `logo.clearbit.com/{domain}` for brand logos (falls back to Google's `s2/favicons` service)
- Wikidata SPARQL endpoint (`query.wikidata.org/sparql`)
- Wikipedia REST summary endpoint (`en.wikipedia.org/api/rest_v1/page/summary/...`)
- Email-domain matching, hostname shape, and hero-image resolution — pure client-side checks, no network needed

**Mocked, by design:**
- DNS/MX record lookups (not possible from a browser without a server-side proxy — the brief flags this as optional/skippable). `checkHttps` does a best-effort `no-cors` probe and mocks a pass if the sandbox blocks it.
- Any of the above network calls that get blocked by CORS in a given environment degrade to a deterministic "inconclusive, not a fail" mock — the checklist tells you when a row is `(estimated)`.
- Payments, real email delivery (Resend/Supabase magic link), OpenCorporates, GSTIN lookups, and `@xenova/transformers` image sanity are out of scope per the brief and are not wired in. The verification score and 5-minute flow are otherwise functionally real.
- Supabase storage/auth/tables are not connected — brand uploads use `URL.createObjectURL` for in-session previews only. Nothing persists across a refresh; this is a prototype, not a backend.

## Design tokens

- Colors: `ink #0C0B0A`, `dusk #14151C`, `russet #C45C2C`, `cream #F2E6D0`, `wine #8B1E3F`
- Display type: **Fraunces** (headlines, giant hero word, footer wordmark)
- UI type: **Work Sans** (body, labels, nav)
- Both loaded from Google Fonts' CDN in `index.html` — no key required.

## Interaction checklist (maps to the brief's success test)

- [x] Mouse movement on the hero image reveals a second layer through a soft circular mask (`Hero.tsx`); tap toggles the same reveal on touch.
- [x] Scroll pins and scales the hero image, fades the giant type, and drives the Featured Still's opacity/rotation.
- [x] Lookbook cards get pointer-following radial light + a subtle zoom on hover.
- [x] `prefers-reduced-motion` is respected globally in `index.css` (animations/transitions collapse to near-instant).
- [x] `/apply` runs the free verification checklist live, without any paid key, and shows score + recommendation + a live module preview.
- [x] Mobile: hero stacks its text blocks, the custom cursor ring is hidden via `(hover: none)`, and the wipe reveal becomes tap-to-toggle.

## Known gaps / next steps for a real build

- Wire Supabase for `brands`, `offers`, `follows`, `verifications`, `plans` tables and swap the mock `brands.ts` for real reads.
- Replace `URL.createObjectURL` uploads with real Supabase Storage writes.
- Add `@xenova/transformers` NSFW/screenshot classifiers to the upload step (brief flags this as optional-if-it-doesn't-hurt-first-paint).
- Real auth (Supabase magic link or password) behind `Auth.tsx`.
- GSAP ScrollTrigger could replace the Framer Motion `useScroll` calls if you want scrubbed/snapped rail behavior instead of the current continuous scroll-linked animation — both are explicitly acceptable per the brief.
