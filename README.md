# Nepali Connect Germany 🇳🇵🇩🇪

**The Home of Nepalis in Germany.**

The largest online platform connecting Nepalis across Germany — sports clubs, communities,
student associations, restaurants, grocery stores, jobs, housing, events, lawyers, and doctors,
all in one place.

## Tech stack

- **Next.js 15** (App Router, Server Components, `generateStaticParams`, `generateMetadata`)
- **TypeScript** throughout
- **Tailwind CSS** with a custom design-token system (see `app/globals.css` / `tailwind.config.ts`)
- **shadcn-style UI primitives** hand-built on Radix UI (`components/ui`)
- **Framer Motion** for micro-interactions
- **Lucide** icons
- Prepared for **Supabase / PostgreSQL**, **Clerk**, **Cloudinary**, and **Google Maps**

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase / Clerk / Cloudinary / Maps keys when ready
npm run dev
```

The app runs fully on typed dummy data out of the box — no backend required to develop the UI.

## Project structure

```
app/                          Next.js App Router routes
  cities/[city]/[category]/   Sports club listings, filtered by city + sport
  businesses/[slug]/
  restaurants/[slug]/
  events/[slug]/
  jobs/[slug]/
  housing/[slug]/
  doctors/  lawyers/          Directories with client-side language/practice filters
  universities/[slug]/        University pages with nearby resources
  search/                     Global unified search
  map/                        Illustrative interactive map (swap for Google Maps)
  submit/                     Multi-category community submission form
  dashboard/                  Club/business owner profile editor
  admin/                      Moderation queue + management tables
components/
  ui/                         Reusable primitives (button, card, badge, tabs, input…)
  layout/                     Navbar, footer, theme provider/toggle
  home/                       Home-page sections
  shared/                     Cross-page cards (city, club, business, event, job, housing…)
lib/
  types.ts                    Canonical domain types — mirrors supabase/schema.sql
  data/                       Typed dummy data, one file per entity
  search.ts                   In-memory search across all entity types
  supabase/                   Browser + server Supabase client factories (stubs)
supabase/schema.sql           Full Postgres schema, RLS policies, and indexes
```

## Design system

The visual identity is drawn from the actual subject rather than generic defaults:

- **Color** — Nepal's flag crimson (`--crimson`) and a deepened Himalayan-night indigo
  (`--indigo`) anchor the palette, with a marigold accent (`--marigold`, used in Dashain/Tihar
  garlands) and a pine green (`--pine`) for services/nature categories.
- **Type** — Fraunces (display serif, used with restraint for headings) paired with Inter
  (body/UI) and IBM Plex Mono (labels, stats, eyebrows).
- **Signature element** — a five-colour "prayer-flag strip" (`.prayer-flag-strip` in
  `globals.css`), based on the real Lungta/prayer-flag colour order, used as the section divider
  throughout the site instead of a plain hairline rule.
- Full dark mode via `next-themes`, class-based Tailwind dark variant.

## Connecting the real backend

1. **Supabase** — create a project, run `supabase/schema.sql` in the SQL editor, then set
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`.
   Replace the functions in `lib/data/*.ts` with Supabase queries using `lib/supabase/client.ts`
   (browser) or `lib/supabase/server.ts` (Server Components) — the exported function names and
   return shapes are already what the components expect, so most files are drop-in replacements.
2. **Clerk** — set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`, wrap `app/layout.tsx`
   in `<ClerkProvider>`, and swap the placeholder forms in `app/sign-in` / `app/sign-up` for
   `<SignIn />` / `<SignUp />`. Sync Clerk users into the `users` table via a webhook.
3. **Cloudinary** — set the three `CLOUDINARY_*` env vars and replace the mock upload buttons in
   `app/dashboard/page.tsx` with an upload widget; store the returned URL in `photos`.
4. **Google Maps** — set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and replace the illustrative SVG in
   `app/map/page.tsx` with `@vis.gl/react-google-maps` (or `@react-google-maps/api`), reusing the
   same `cities` data and `lat`/`lng` fields.

## Moderation & monetization hooks already in the data model

- Every user-submitted entity (`clubs`, `businesses`, `events`, `jobs`, `housing`) carries a
  `status: 'pending' | 'approved' | 'rejected'` column, enforced by RLS so only approved rows are
  publicly readable — the `app/admin` moderation queue is the front-end for flipping that status.
- `is_featured` / `is_premium` / `is_promoted` boolean flags on clubs, businesses, events, and
  jobs are ready for **Premium Business Listings**, **Featured Clubs**, **Sponsored Events**, and
  **Job/Housing Promotions** without a schema change — just gate them behind a paid tier.
- `favorites` and `reviews` tables are ready for logged-in engagement features.

## Scripts

```bash
npm run dev        # start the dev server
npm run build       # production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```
