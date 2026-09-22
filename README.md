# Earworm

A music meditation app. Whatever song is stuck in your head usually means
something: find it, listen to it, and write down what it brings up. Each
month's reflections resolve into a word cloud of what you kept returning to.

```bash
npm install
npm run dev
```

No configuration and no keys. Entries live in this browser's `localStorage`.

## Stages

Ordered around the meditation first and the plumbing last.

- [x] **1: Log and list.** A form, entries in `localStorage`, and a list grouped by month.
- [x] **2: Word clouds by month.** Tokenize the reflections, drop stopwords,
      count, and size the words, all client-side with no library. Words are
      laid out in hash order so the heavy ones scatter across the block, and a
      month where nothing has repeated yet renders flat. There's no stemming,
      since naive suffix-stripping produces worse artifacts than it fixes.
- [ ] **3: Listen, then write.** Search for the song through the iTunes Search
      API, play its 30-second preview, and show the reflection prompt while it
      plays. Verified 2026-09-22: the API allows browser calls
      (`access-control-allow-origin: *`) and returns `previewUrl` and artwork.
      - [ ] Show several results to choose from, since ranking is loose
            (searching "pyramids frank ocean" returns *Novacane* first)
      - [ ] Manual entry as a fallback when there's no match or the API is down
      - [ ] Debounce search (~300ms), cache results in memory, and cancel stale
            requests with `AbortController`; the API allows roughly 20 calls a minute
      - [ ] Loading, empty, and error states, plus a ~10s timeout on search
      - [ ] Store `trackId`, artwork, and preview URL with each entry
- [ ] **Later: Spotify.** It's what gets used day to day; iTunes is the baby
      step. What we know as of 2026-09-22:
      - New Spotify apps no longer get 30-second `preview_url`s (since 2024-11-27)
      - Development-mode apps are capped at 5 users, and the developer needs
        Premium (since February 2026). Extended quota requires a registered
        business and 250k monthly users, so this stays a personal integration
      - The client secret can't live in the browser, so search would go
        through a small serverless function (Cloudflare Worker or Vercel)
      - Unverified: whether search via client credentials is still allowed in
        development mode, and whether the Spotify embed player can handle playback
- [ ] **4: One moment at a time.** Replace the form with a slow sequence
      (find the song, listen, reflect, save), with a calmer, more spacious
      design to match.
- [ ] **5: Your month in sound.** Each month becomes a place to revisit: the
      word cloud, the month's album art, and the reflections themselves.
- [ ] **6: Accounts and sync.** Swap `localStorage` for a backend (Supabase
      free tier) and bring Clerk auth back; its original wiring is in git
      history at `4e7dbda`. Hardening that lands with it:
      - [ ] Row-level security so each account only reads and writes its own entries
      - [ ] Index on `(user_id, created_at desc)`, which the list and clouds both query by
      - [ ] Fetch one month at a time
      - [ ] Loading and error states on every request, a ~10s timeout, and a retry button
      - [ ] Client-generated entry ids plus upsert, so a retry or double-submit
            can't create a duplicate
      - [ ] On first sign-in, import any existing `localStorage` entries
      - [ ] Export to JSON as the user-facing backup, and test a restore by
            importing an export into a fresh account
      - [ ] Sentry (free tier) for error logging
      - [ ] Uptime check on the deployed URL (UptimeRobot or Better Stack free tier)
      - [ ] Two accounts writing at once, confirming neither sees the other's data
      - [ ] If the project ever moves off the free tier, leave Supabase's spend cap on

Already handled in stages 1-2: empty states, input length caps (200 / 2000
characters, since `localStorage` tops out around 5MB), a visible warning when
the browser refuses to save, and double-submit protection.

Built on the shell from the AuraFocus prototype (Vite, React, TypeScript, MUI,
Clerk, React Router).
