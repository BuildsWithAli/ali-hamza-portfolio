# Ali Hamza — Portfolio (Next.js, full-stack)

A real, deployable version of the portfolio: same design and interactive 3D
hero as before, now backed by an actual server — a working contact form
that emails you and saves an inbox, a real visitor counter, and a password-
protected `/admin` dashboard where you can read messages and edit your
site's content without touching code.

Anyone on the internet can use this site fully — nothing here is limited
to people signed into any particular account.

## What's inside

- **Next.js 15** (App Router) — one project, frontend + backend together.
- **Supabase** (free tier) — stores contact messages, the visitor counter,
  and your editable content.
- **Nodemailer + Gmail** — emails you the moment someone submits the
  contact form (works alongside the Supabase inbox, or on its own).
- **`/admin`** — password-protected dashboard: read/delete messages, see
  total views, edit almost everything on the page (About text, projects,
  skills, education, contact info) and have it go live immediately.

The site works and looks right with **zero setup** — it falls back to the
content baked into `src/lib/content.default.js` — but the contact form,
visitor counter, and admin dashboard need the setup below to actually do
anything.

## 1. Install & run locally

```bash
npm install
cp .env.example .env.local   # then fill it in, see steps below
npm run dev
```

Open http://localhost:3000. http://localhost:3000/admin is the dashboard.

## 2. Create a free Supabase project (messages, stats, editable content)

1. Go to https://supabase.com, sign up, and create a new project (pick any
   name/region; note the database password it asks you to set — you won't
   need it for this project, just don't lose it).
2. Once the project is ready: **SQL Editor** (left sidebar) → **New query**
   → paste the entire contents of `supabase/schema.sql` from this project
   → **Run**. This creates the `messages`, `stats`, and `content` tables.
3. **Project Settings → API**. Copy three values into `.env.local` (and
   later into Vercel, see step 5):
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (click "reveal") → `SUPABASE_SERVICE_ROLE_KEY`

   The service-role key is powerful — it bypasses Row Level Security. It's
   only ever used server-side in this project (never sent to the browser),
   but keep it out of git and out of anywhere public.

## 3. Set up email notifications (Gmail example)

1. Turn on 2-Step Verification on the Gmail account you want to send from:
   https://myaccount.google.com/security
2. Create an App Password: https://myaccount.google.com/apppasswords
   → app "Mail", any device name → copy the 16-character password.
3. In `.env.local`:
   - `EMAIL_USER` = that Gmail address
   - `EMAIL_APP_PASSWORD` = the 16-character app password (no spaces)
   - `ADMIN_EMAIL` = where you want messages delivered (defaults to
     `EMAIL_USER` if you skip it)

Prefer a different provider (SendGrid, Resend, your own SMTP)? Swap the
transport config in `src/lib/mailer.js` — it's about 10 lines.

If you skip this section entirely, the contact form still works and still
saves messages to Supabase — you just won't get an email, and you'd check
the `/admin` inbox instead.

## 4. Set your admin password

In `.env.local`:

```
ADMIN_PASSWORD=pick-something-only-you-know
SESSION_SECRET=<run: openssl rand -hex 32>
```

`/admin` is protected by this single password — there's no separate user
system. That's intentional for a one-person portfolio; don't reuse a
password you use anywhere else.

## 5. Deploy to Vercel (free)

1. Push this project to a GitHub repo.
2. Go to https://vercel.com → **Add New → Project** → import that repo.
3. Before the first deploy (or right after, then redeploy), open
   **Settings → Environment Variables** and add every variable from
   `.env.example` with your real values — same names, same values you put
   in `.env.local`.
4. Deploy. Your site is live at the `.vercel.app` URL Vercel gives you (add
   a custom domain later under **Settings → Domains** if you want one).

Netlify works too, with its Next.js runtime — the env var list is the
same; only the "where to paste them" screen differs.

## How the pieces fit together

- **Contact form** (`/api/contact`) — validates the input, saves it to the
  `messages` table, and emails you. If only one of Supabase/email is
  configured, it still works using whichever channel is available.
- **Visitor counter** (`/api/stats`) — the footer badge calls this once per
  browser session; it atomically increments a counter row in Supabase
  (via the `increment_views()` SQL function, so concurrent visitors can't
  race each other) and shows the real total back.
- **Admin dashboard** (`/admin`) — reads messages and the view count
  straight from Supabase, and edits are written back to the `content`
  table. The public homepage always reads content fresh on every request
  (`export const dynamic = "force-dynamic"` in `src/app/page.js`), so a
  saved edit is live immediately, no redeploy needed.

## Honest limitations

This is sized for a personal portfolio, not a SaaS product:

- `/admin` auth is a single shared password, not a full user/session
  system — appropriate for "just you," not a team.
- No rate limiting on `/api/contact` yet — fine for a personal site's
  traffic; add one (e.g. Upstash's free rate-limit package) if you ever
  see abuse.
- `npm audit` will flag a `postcss` advisory bundled inside Next.js's own
  build tooling. It's a build-time-only issue (source-map file access),
  not something exposed to your site's visitors — safe to ignore for now;
  it'll clear once Next 16 fully stabilizes and you upgrade.

## Project structure

```
src/
  app/
    page.js              Home page (server component, reads content)
    layout.js             Root layout, fonts, theme flash-guard
    globals.css            All design tokens + component styles
    api/
      contact/route.js     Contact form endpoint
      stats/route.js       Visitor counter endpoint
      admin/
        login/route.js     Password check -> session cookie
        logout/route.js
        content/route.js   Save edited content (admin only)
        messages/route.js  Mark read / delete (admin only)
    admin/
      page.js               Dashboard (server component, auth-gated)
      login/page.js          Login form
  components/            One file per section (Hero, Projects, ...)
    Scene3D.jsx            The 3D circuit/AI-network hero scene
    admin/AdminDashboard.jsx
  lib/
    content.default.js    Fallback content (also the starting point
                            the very first /admin save is based on)
    content.js             getContent()/saveContent() with Supabase
    supabaseServer.js       Server-side Supabase client
    mailer.js               Contact-form email sending
    auth.js / requireAdmin.js   Admin session cookie handling
supabase/schema.sql        Run this once in the Supabase SQL editor
```

---
*Deployed with Next.js 15 on [Vercel](https://ali-portfolio-mocha-tau.vercel.app)*