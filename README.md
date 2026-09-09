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
- [ ] **2 — Word clouds by month.** Tokenize the musings, drop stopwords, count,
      size the words. Client-side, no library.
- [ ] **3 — Real persistence.** Swap `localStorage` for a backend (Supabase free
      tier). This is where Clerk auth comes back in — it was stripped from the
      runtime in stage 1 because auth over a per-browser store is theater. The
      original wiring is in git history at `4e7dbda` if it's useful to crib from.
- [ ] **4 — Song autocomplete.** iTunes Search API, no key required.

Built on the shell from the AuraFocus prototype (Vite + React + TS, MUI, Clerk,
react-router) — same bones, different app.
