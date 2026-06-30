<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:loop-engineering -->
# Loop Engineering — autonomous + /loop runs

When you are running unattended (`/loop`, an overnight pass, a multi-tick
auto-mode session) the operator is not in the room. The work has to design
itself. The five moves below are the contract every tick on this repo
follows; deviations need explicit human confirmation.

## Five moves

1. **Schedule** — `/loop <interval> …` or autonomous pacing via
   `ScheduleWakeup`. Pick the interval against the cost of a wasted tick,
   not a round number of minutes.
2. **Discover** — read the current state before deciding the work. `git
   status`, `git log origin/main..HEAD`, `gh pr list`, this file's
   `## Gece durumu …` sections, `BLOCKERS.md`, `TODO-david.md`. Never
   re-derive intent from training data when a file in the repo states it.
3. **Build** — smallest reversible change that makes the next tick easier.
   Commit on completion of each item, not at the end of the run.
4. **Verify** — never declare done from vibes. Required gates:
   - `npm run build` must pass.
   - For data changes, diff against the canonical source (manifest, xlsx,
     supplier JSON) and print the delta.
   - For image / URL work, `curl -sI` the live URL and read the status +
     `content-type`.
   - The user's standing rule (`feedback_verify_with_evidence.md`): if you
     would say "this should work" or "I think this is fine," instead show
     output that proves it.
5. **Report** — append a dated block to `## Gece durumu — YYYY-MM-DD …`
   in this file (or `overnight-report.md` for long-form). One paragraph,
   what changed, what's pending, what's risky. The historical sections
   below are the audit trail; don't rewrite them.

## Anchors (do not re-derive)

This file, `BLOCKERS.md`, `DEPLOY-CHECKLIST.md`, `ENV.md`, and the
project memory at `~/.claude/projects/-Users-eymen-foma-design/memory/`
are the intent anchors. A tick that disagrees with one of them needs an
explicit update commit, not a silent override.

## Guardrails — operator policy, not deny rules

`.claude/settings.json` currently allows everything (`"deny": []`,
`"allow": ["*"]`). The hard blocks that used to gate dangerous commands
are off. That means **the agent is the guardrail now**: nothing will
stop you mid-command, so the discipline has to live in the loop design.

Treat these as still-binding, even with no file-level deny:

- **`git push` to `main` / `git reset --hard` / `git push --force`** —
  never on `main`, never on a branch with an open PR, without explicit
  operator authorization for that specific push.
- **`vercel --prod*` / `vercel deploy --prod*`** — production deploys
  remain operator-only. PR merge to `main` is the only path to prod;
  do not bypass.
- **`.env*` files** — readable now, but they hold rotation-pending
  secrets. Don't print them, don't echo them to logs, don't include
  them in commits (`.gitignore` already excludes them but `git add -f`
  would override). If you ingest a credential into your context, flag
  it for rotation before exiting the tick.
- **`rm -rf` and piped `curl | sh`** — only against well-scoped paths
  you fully understand. A wildcard or untrusted URL is a hard stop.

The Claude Code auto-mode classifier may still ask before a few
production-impacting actions even though settings.json no longer blocks
them. When it does, treat the prompt as a real checkpoint, not noise —
re-read the next move before answering.

## Halt conditions

End the loop early when any of these trip:

- **No-progress**: two consecutive ticks with the same failing build /
  test / curl output. Write a one-line summary to `BLOCKERS.md` and stop.
- **Ambiguous intent**: the next move requires a decision the anchors
  don't cover. Ask the operator via `AskUserQuestion`; do not guess.
- **Secret exposure**: a credential leaked into chat or a log. Flag it,
  do not persist it further, and surface the rotation steps. The R2 and
  Cloudinary keys have already been pasted to chat once each — treat any
  new leak the same way.
- **Production-touching action without explicit authorization**: a merge
  to `main`, a `vercel --prod`, a domain change, a token rotation. These
  need the operator in the loop even when auto mode is active.

## Skills, not re-derived prompts

When you find yourself re-explaining a recipe to the next tick, lift it
into a named script in `.scrape/` (already gitignored) or a documented
sub-command. The repo already has:

- `.scrape/r2-migration/audit_cloudinary.py` — full bucket audit + manifest
- `.scrape/r2-migration/migrate_to_r2.py` — idempotent Cloudinary → R2 copy
- `.scrape/r2-migration/verify_migration.py` — manifest ↔ R2 parity report
- `.scrape/build_product_shipping.py` — per-SKU shipping JSON generator
- `.scrape/append_shipping_to_xlsx.py` — writes `fomaprint liste (N).xlsx`

Invoke these by name in /loop prompts (`run verify_migration.py and
report parity`) instead of re-spelling the steps every tick. Loops that
call sharp named skills get cheaper over time; loops that re-derive
everything do not.

## Worktrees for parallel work

For independent PRs running in parallel (e.g. one tick on a content fix,
another on a build-config tweak) use `git worktree add ../foma-design-<purpose>
<branch>` so the checkouts do not collide. The main repo at
`~/foma-design` stays on whatever branch the operator left it on.

## Project context the loop must keep in mind

- Customer-facing copy is English; agent-to-operator chat is Turkish.
- Next.js 16: read `node_modules/next/dist/docs/` before writing new
  Next-specific code (see `nextjs-agent-rules` above).
- Image origin is **Cloudflare R2** (`pub-7dbfe9f161d34085b011aea74e8f75ac.r2.dev`).
  `src/lib/cloudinary-loader.ts` is R2-first with a Cloudinary fallback
  while `NEXT_PUBLIC_R2_BASE_URL` is unset. The Vercel optimizer
  (`/_next/image`) does the AVIF/WebP encoding, which is a paid feature
  — Hobby tier returns 402 on optimizer requests, so any redesign of
  the loader needs to stay aware of the plan tier.
- Catalog truth: `src/data/products.json` (supplier feed) + curation
  layer in `src/data/catalog.ts` (`REMOVED_SKUS`, `ADDED_PRODUCTS`,
  `SUB_OVERRIDES`) + enrich data files (`product-images.json`,
  `product-weights.json`, `product-shipping.json`).
<!-- END:loop-engineering -->

<!-- BEGIN:foma-overnight (manuel — sync tooling buraya dokunmaz) -->
# FomaPrint — Gece Geliştirme Yönü

## Bağlam
Next.js (proje-içi sürüm — yukarıdaki nextjs-agent-rules'a UY: kod
yazmadan önce node_modules/next/dist/docs/ oku) + Tailwind.
Üç giriş noktası: self-service retail, B2B POD/blind-ship, lokal toplu baskı.
Şu an redesign/b2b-unify dalındayız.

## Kurallar
- Tüm müşteriye dönük metin İNGİLİZCE.
- Mevcut tasarım dilini/komponent yapısını bozma.
- Küçük commit'lerle ilerle; her tamamlanan maddeden sonra commit at.
- Emin olmadığın mimari kararı YAPMA — AGENTS.md'ye not düş, sabaha bırak.
- node_modules, .env, secret'lara dokunma.

## Bu haftanın gece görevi
- [ ] (madde 1)
- [ ] (madde 2)

## Gece durumu — 2026-06-26 (image gallery binding)
- Şube: `gece/20260626` (commits `5d2842f` → `84971b5`); GitHub'a push edildi
  (`github.com/eymen160/foma-design`).
- Eşleşme: 1279/1279 katalog SKU'su (REMOVED_SKUS sonrası), 4609 görsel URL'si
  (tire-separator extension dahil). Eşleme stratejisi: filename'in **leading
  alnum run**'ını adaya çevirir, SKU set'ine case-insensitive **exact** match —
  fuzzy / prefix-strip yok. Letter-ending SKU testleri (GFT254A) regresyon
  vermiyor. Detay: `overnight-image-report.md` (kök).
- Hosting: **Vercel Blob denedik, Hobby tier 1 GB cap'i aştı → Cloudinary'e
  pivot ettik.** Cloudinary cloud `mxepungb`, 4609 dosya yüklendi
  (8.24 GB, ~25 dk). Vercel project env'da `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=mxepungb`
  Production + Preview için set. `src/lib/cloudinary-loader.ts` (custom next/image
  loader) build-time'da `/products/...` paths → `res.cloudinary.com/mxepungb/.../q_auto,f_auto/...`
  URL'lerine çevirir. `next.config.ts` rewrite YOK — loader doğrudan halleder
  (next/image optimizer rewrite'ları follow etmiyordu, ilk preview'da broken'dı).
- UI: detail page'de `ProductGallery` (hero + thumbnail strip, arrow nav),
  listing card'da hover-cycle (PNG/JPG dupe atlanır, ilk DIFFERENT-stem URL'i
  swap için seçilir), her kartta "Quick view" pill → modal'da aynı galeri +
  add-to-quote.
- Deploy: GitHub'a bağlı, `main` → production (`foma-design.vercel.app`),
  her branch push → preview URL. CI yaml yok — Vercel pipeline yeter.
- Cross-machine handoff: `DEPLOY.md` (kök) — clone-to-deploy walkthrough, env
  var tablosu, image library lifecycle, prod cutover checklist.
- Yardımcı script'ler `.scrape/overnight/`'ta (gitignore'lu):
  `build_image_report.py` (matching + sidecar), `place_images.py` (APFS clone),
  `upload_to_cloudinary.mjs` (idempotent, deterministic public_id).
- Bekleyen karar: 290 SKU hâlâ <3 görselli — supplier dump'ta yok. Çözüm
  yolları için raporun "Next steps" kısmı.
<!-- END:foma-overnight -->

## Gece durumu — 2026-06-26 23:00 (UI/UX polish + size taxonomy)
- Şube: `gece/20260626` üzerine 6 yeni commit (`e11a4c8` → `0624753`).
  Push edilmedi (`git push *` deny aktif). Detay: `overnight-report.md`
  (kök, living log) + `DEPLOY-CHECKLIST.md` (kök, prod cutover guide).
- **Phase 1:** Hero subline glyph fix — `font-serif text-metallic`
  swash ampersand'i `@`'ye benziyordu, "and"a çevrildi (homepage +
  sell page).
- **Phase 2:** Size derivation + filtering.
  - `src/lib/product-taxonomy.ts` — `normalizeSize()` raw `size`
    field'ı 5 bucket'a böler (oz/rect/inch/diam/other). Strict-by-default,
    bilinmeyen format `other` bucket'a düşer, asla guess yok.
  - `src/components/catalog-filters.tsx` — server-rendered chip
    filter rail, repeating `?size=&sub=` query params, no JS.
  - `/category/[slug]` ve `/category/[slug]/[subSlug]` filter'a kavuştu;
    no-filter case'inde mevcut layout korunur — hiçbir URL kırılmadı.
  - Catalog mega-menu'ye kategori altında 4 subcategory link'i eklendi
    (data zaten geliyordu, gösterilmiyordu).
- **Phase 3:** Filter rail viewport-bounded scroll, `aria-current="page"`
  active sibling-pill'de. Daha geniş bir typography/spacing sweep
  yapmadım — mevcut sistem zaten tutarlı, sweep churn olur (gerekçe
  raporda).
- Preview branch alias: `foma-design-git-gece-20260626-foma1.vercel.app`
  (her green commit sonrası `vercel --yes` ile preview deploy).
- Prod'a giden yol: `DEPLOY-CHECKLIST.md` "Commands to ship" bloğu —
  human çalıştırır, agent değil (`vercel --prod` + `git push *`
  ikisi de deny rule'da).

## Gece durumu — 2026-06-30 (overnight loop)

- **Tick #2** (start 01:28 local, ~10 min wall) — Agent C koştu (önceki
  skip telafi). Bulguları: (a) 4 dead export `src/lib/site-copy.ts`
  içinde (PRINTING_PROMISE, SHIPPING_PROMISE, REPLY_PROMISE, SAME_DAY_TRIO
  — hepsi PR #29'da eklenmişti ama hiç import edilmemiş; triple-verify
  ettim, 0 ref); (b) `/api/quote` + `/api/reseller-application` JSON parse
  catch'leri `log.warn` emit etmiyor (observability gap, low); (c) API
  routes, email dispatcher'lar, middleware hepsi PR #31 baseline'a sadık,
  başka boşluk yok. Pick: dead-exports cleanup (en katı single-file +
  zero-risk + zero-ref kanıtlanmış). PR #33 merge edildi.

- **Tick #3** (start 01:58 local, ~8 min wall) — fresh agent koşmadan
  Agent C'nin Tick #2'de surface ettiği act edilmemiş bulguya gittim:
  `/api/quote` + `/api/reseller-application` JSON parse catch'leri
  hiç log emit etmiyordu (3am'de "endpoint neden 400 atıyor?" debug'ı
  imkansız). Loop kontratı strictly "single file edit" diyor ama
  paralel routes'a aynı 8-satırlık ekleme yapmak bence tek tutarlı
  değişiklik. Fix: her iki route'a `log.warn` ekledi
  (`event: "quote.invalid_json"` + `"reseller.invalid_json"`).
  Build ✓, smoke test (grep yeni event isimleri) ✓. PR #34.
