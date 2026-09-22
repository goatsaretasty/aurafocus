# Earworm

Log whatever song is stuck in your head, plus whatever it dragged up with it.
Enough entries and it turns into word clouds by month.

```bash
npm install
npm run dev
```

No configuration, no keys — entries live in this browser's `localStorage`.

## Stages

- [x] **1 — Log + list.** Form, entries in `localStorage`, list grouped by month.
- [x] **2 — Word clouds by month.** Tokenize the musings, drop stopwords, count,
      size the words. Client-side, no library. Words are laid out in hash order
      so the heavy ones scatter instead of clumping by first letter; a month
      where nothing has repeated yet renders flat rather than all-max-size.
      No stemming, so `minute`/`minutes` count separately — deliberate, since
      naive suffix-stripping produces worse artifacts than it fixes.
- [ ] **3 — Real persistence.** Swap `localStorage` for a backend (Supabase free
      tier). Clerk auth comes back here; it was taken out of the runtime in
      stage 1 because per-browser data had nothing to protect. The original
      wiring is in git history at `4e7dbda`. Hardening that lands with it:
      - [ ] Row-level security so each account only reads and writes its own entries
      - [ ] Index on `(user_id, created_at desc)`; the list and clouds both query by it
      - [ ] Fetch one month at a time (the UI already groups by month)
      - [ ] Loading and error states on every request, a ~10s timeout via
            `AbortController`, and a retry button
      - [ ] Client-generated entry ids plus upsert, so a retry or double-submit
            can't create a duplicate
      - [ ] On first sign-in, import any existing `localStorage` entries
      - [ ] Export to JSON as the user-facing backup; test a restore by
            importing an export into a fresh account
      - [ ] Sentry (free tier) for error logging
      - [ ] Uptime check on the deployed URL (UptimeRobot or Better Stack free tier)
      - [ ] Two accounts writing at once, confirming neither sees the other's data
      - [ ] If the project ever moves off the free tier, leave Supabase's spend cap on
- [ ] **4 — Song autocomplete.** iTunes Search API, no key required. It's
      limited to roughly 20 calls a minute, so: debounce input (~300ms), cache
      results in memory, and cancel stale requests with `AbortController`.

Already handled in stages 1-2: empty states, input length caps (200 / 2000
chars, since `localStorage` tops out around 5MB), a visible warning when the
browser refuses to save, and double-submit protection.

Built on the shell from the AuraFocus prototype (Vite + React + TS, MUI, Clerk,
react-router) — same bones, different app.
