# FomaPrint — B2B Unification & Production Polish — BLOCKERS

Open items and environmental limits hit during the autonomous pass. None block the build; all are
either intentional (by instruction) or need a human with credentials/access.

## Not done by instruction

- **No merge to `main`.** All 11 commits stay on `redesign/b2b-unify`.
- **No production deploy.** A Vercel **preview** is the intended end state; production promotion is
  a human decision.

## Needs credentials / human action

- **SMTP env vars not configured in this environment.** `sendQuoteRequestEmails` has no transport
  to send through, so leads **fall back to the server log / CSV** rather than emailing the admin
  inbox. The API still returns `{"ok":true}` — by design, so a prospect never sees a failure caused
  by our mail config. **Action:** set the SMTP vars (host/port/user/pass/from/to) in the Vercel
  project before relying on email delivery. Until then, harvest leads from the log/CSV.
- **Vercel preview deploy — DONE.** Live preview:
  **https://foma-design-i143uipog-foma1.vercel.app**
  (deployment `dpl_82TU5V3aob7tQaH4CJrW8jvJT8JG`, `readyState: READY`, `target: null` = preview).
  Deployed with `npx vercel deploy` (no `--prod`) using the authenticated CLI — the token lives at
  the macOS path `~/Library/Application Support/com.vercel.cli/auth.json` (user
  `fomalaser1212-6166`), which an earlier check missed by looking at the Linux XDG path.
  **Production (`foma-design.vercel.app`) is untouched** — promotion is a separate, explicit
  `vercel deploy --prod`, intentionally not run. No merge to `main`.

## Tooling limitations encountered

- **Screenshots can't be written to disk.** The live preview tool returns images inline for
  inspection but cannot save to `/.redesign-shots/passN/`. QA was therefore verified live (DOM
  queries + inline screenshots) rather than archived as files. If artifact files are required,
  they'll need to be captured by a tool that can write to the filesystem.
- **Preview navigation flakiness.** `location.href`/`assign`/`replace` evals intermittently errored
  "Inspected target navigated or closed" and screenshots occasionally lagged onto the wrong route.
  Worked around with DOM-query evals + `curl`; not a code bug, but worth knowing for the next
  session's verification.
- **Dev server dropped once mid-session** (port 3100 refused). Restarted cleanly via
  `preview_start("foma-dev")`; no state lost.

## Not a blocker, noted for awareness

- **`gft1023` absent from JDS** — the banner skips it via a defensive filter (see DECISIONS).
  If that SKU should appear, it must first be added to the JDS dataset.
- Each commit prints a benign git "name/email configured automatically" notice; git config was
  intentionally left untouched.
