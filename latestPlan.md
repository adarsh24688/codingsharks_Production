# Coding Sharks — Master SEO + AEO Plan (latestPlan.md)

> Goal: rank **#1** for high-intent coding-bootcamp queries in India AND get **cited** by Google AI Overviews, ChatGPT/SearchGPT, Perplexity, and Gemini — the way large authority sites do.
> Method: one consolidated entity, server-rendered + validated schema, answer-first citable passages, real placement proof, Indore local dominance, off-site corroboration, measured by citations not just clicks.
>
> Built from: codebase audit (this repo) + competitor research (web) + 2026 SEO/AEO frontier research + `apex-seo` + `apex-aeo` skills + `codingshark_seo_skill.md` + `codingsharks_content.md`.
> Date: 2026-06-20. Owner: dev team. Status legend: 🔴 critical · 🟠 high · 🟡 medium · ⚪ later.

---

## 0. Executive Summary

Coding Sharks has a solid technical base (metadataBase, generateMetadata on most pages, Organization/LocalBusiness/Course/Article/Event schema, sitemap, robots). But it is **not built to win #1 or get cited** yet. Four things block it:

1. **Canonical host + a preview leak.** This project = `thecodingsharks.com` (the site we rank). Its own Vercel preview (`codingsharks-production.vercel.app`) is indexed and competing with it — `noindex` that first. (`thecodingsharks.in` is a *separate* project, not ours to touch — but shares the brand+city, so it carries a cannibalization risk for the owner to weigh. See Section 1.) **Lock `.com` + kill the preview leak before content work.**
2. **Missing money pages.** No `/placements`, `/reviews`, `/pricing`, `/compare/*`, `/coding-bootcamp-indore`, `/for-freshers`, `/non-cs-background`. These are exactly the high-intent + comparison + local queries that convert and that AI engines cite.
3. **AEO surface is thin.** No `llms.txt`, robots doesn't split training vs retrieval bots, blog FAQs aren't emitted as `FAQPage`, content isn't answer-first/fact-dense, no off-site corroboration (Reddit/Quora/YouTube/Course Report/Shiksha).
4. **Broken/weak trust assets.** `og-default.png`, favicons, `logo.png` referenced but missing; `site.json` social URLs empty (breaks `sameAs`); self-serving `aggregateRating` on the org node; mentors not modeled as `Person`.

The plan fixes these in 5 phases. Quick wins ship in days; full dominance is a 90-day program plus ongoing off-site + reviews work.

---

## 1. CRITICAL — Lock `thecodingsharks.com` as the canonical host (+ kill the preview leak)

**Clarified scope:** THIS project = **`thecodingsharks.com`** — it is the site we are optimizing to #1.
`thecodingsharks.in` is a **separate, independent project** (different codebase) — NOT ours to redirect or merge. Out of scope for this repo.

Three hostnames currently surface the brand:

| Surface | Where seen | Action |
|---|---|---|
| `thecodingsharks.com` | `metadataBase`, canonicals, sitemap, robots `BASE_URL` ([layout.tsx](src/app/layout.tsx), [robots.ts](src/app/robots.ts), [sitemap.ts](src/app/sitemap.ts)) | ✅ KEEP — this is our canonical. Lock it. |
| `codingsharks-production.vercel.app` | Vercel's default URL for THIS same deployment (`.com` is the custom domain connected to this Vercel project) | ❌ Redirect → `.com` or `noindex` it — same content on two URLs = duplicate content competing with `.com` |
| `thecodingsharks.in` | Separate project ("#1 Best Coding Classes in Indore") | ⚠️ Not ours — do not touch. See risk note below. |

**Actions for THIS repo:**
- [ ] 🔴 Confirm `NEXT_PUBLIC_SITE_URL = https://www.thecodingsharks.com` (no trailing slash, stripped once); verify every canonical, OG url, schema `@id`, sitemap entry resolves to it.
- [ ] 🔴 Handle the `.vercel.app` duplicate of this same deployment: either set a 301 redirect `*.vercel.app` → `thecodingsharks.com` (Vercel domain settings / middleware on `host !== thecodingsharks.com`), OR send `X-Robots-Tag: noindex` on the `.vercel.app` host. Stops two URLs serving identical content.
- [ ] 🔴 Verify `https://www.thecodingsharks.com` in Google Search Console + Bing Webmaster; submit sitemap.
- [ ] 🔴 Decide www vs non-www; 301 the other → chosen; keep one form in all canonicals.

**⚠️ Brand-cannibalization risk (owner decision, not a code task):**
`.com` and `.in` share the **same brand name + Indore location**. Even though they are separate projects, Google and AI answer engines resolve by *entity*, not by domain — two "Coding Sharks / Indore" sites can cannibalize each other's rankings and confuse which one gets cited in AI answers. Options for the owner: (a) make one the clear primary brand entity and differentiate the other (different name/positioning), (b) cross-reference via `sameAs` if they are genuinely one org on two domains, or (c) accept the split. Flag only — no code action from this repo.

> For everything below, "the site" = `thecodingsharks.com`.

---

## 2. Current-State Scorecard (from codebase audit)

| Area | State | Grade |
|---|---|---|
| Root metadata (metadataBase, title template, OG/Twitter, GSC verify) | Present ([layout.tsx](src/app/layout.tsx)) | B+ |
| Per-page metadata | 17/20 pages have it; missing on `/privacy`, `/terms`, `/course-curriculum` | B |
| Schema breadth | Organization+EducationalOrg, WebSite, LocalBusiness, Course, Event, Article, FAQPage(home) | B |
| Entity hygiene | Two `@id`s (`#organization` + `#localbusiness`) for one org; self-serving `aggregateRating` 4.9/312 + 4.9/180 with no `Review` backing | C |
| robots bot policy | Allow-all; no training vs retrieval split | D |
| Blog schema | Article + BreadcrumbList; **no FAQPage** despite `faqs` array; author = plain string not `Person @id` | C |
| Courses `/[slug]` | Course schema good BUT component is `"use client"` → SSR/hydration risk (known bug) | D |
| Sitemap | All routes; **but lastModified = build-time `now`** (no real freshness); missing money pages | C |
| Trust assets | `og-default.png`, `/public` favicons, `logo.png` **missing**; `site.json` socials empty | D |
| AEO files | No `llms.txt` / `llms-full.txt` | F |
| Money pages | `/placements`, `/reviews`, `/pricing`, `/compare/*`, local + audience pages all missing | F |
| Source of truth | `site.json` lacks geo, postalCode, social URLs, hours; values hardcoded in [page.tsx](src/app/page.tsx) | C |

Broken internal links found: home CTAs point to `/apply` (route does not exist) and `/course-curriculum` not in sitemap. Fix during Phase 0.

---

## 3. Competitor & Market Landscape (web research)

**Who ranks for "best/compare coding bootcamp India" today:** mostly **third-party review/aggregator sites**, not the bootcamps themselves — Course Report, collegedunia, collegedekho, collegesimplified, Shiksha, Fueler, plus Reddit/Teamblind threads. ([Course Report](https://www.coursereport.com/best-coding-bootcamps), [collegesimplified Scaler vs Newton vs Masai](https://www.collegesimplified.in/post/scaler-vs-newton-vs-masai-2026-comparing-modern-tech-school-courses-and-streams), [collegedunia Newton](https://collegedunia.com/college/64273-newton-school-of-technology-sonepat))

**Competitor snapshot:**

| Competitor | Model | Placement claim | Notable | Schema/SEO |
|---|---|---|---|---|
| Masai School | ISA / pay-after-placement; ₹3–3.5L; IIT/IIM partnerships | ~85% (2026) / markets "94%" | 10,000+ placed, 40,000+ learners, Series B, media logos ([masaischool.com](https://www.masaischool.com)) | No comparison pages or visible schema on homepage |
| Newton School | Pay-after-placement + B.Tech degree (UGC); ₹1L fixed post-placement online | Strong, college-style placement pages | Degree credibility; ranks via collegedunia/collegedekho | Aggregator-driven |
| Scaler | Premium ₹9–25L; FAANG-oriented | High; brand marketing | Strong organic + InterviewBit funnel | Big content engine |
| PW Skills | Mass-market, low price | Volume play | Physics Wallah brand reach | Large blog |
| Coding Ninjas | DSA-heavy, established | — | Strong DSA content | Established domain |

**Where Coding Sharks can win (gaps):**
1. **Bootcamps themselves don't own the "vs" SERP** → first-mover on honest `/compare/coding-sharks-vs-*` pages with real tables.
2. **Indore / Tier-2 local** is near-uncontested by the big online-first players → own `coding-bootcamp-indore` + local pack.
3. **Specific verified numbers** (94% Full Stack, 96% System Design, ₹21L+ top, named companies) beat competitors' vague "high placement."
4. **Non-CS background success** (61%) is a differentiated content cluster nobody owns.
5. **AEO/citation**: AI answers lean on Reddit, Quora, YouTube, Course Report, Shiksha — Coding Sharks is nearly absent there → build off-site corroboration.
6. **Course Report / Shiksha / AmbitionBox profiles** with review velocity directly feed AI "best bootcamp India" answers.

---

## 4. 2026 SEO/AEO Operating Principles (the rules we build to)

**SEO (apex-seo):** one entity / one `@id` / one source of truth · server-rendered + validated JSON-LD (never client-effect) · absolute self-canonical every route · most-specific schema type · **no self-serving aggregateRating** (stars come from GBP) · NAP byte-identical · **INP ≤200ms / LCP ≤2.5s / CLS ≤0.1** mobile · create assets before referencing them · Experience-first E-E-A-T with named `Person` authors.

**AEO/GEO (apex-aeo, Princeton GEO arXiv 2311.09735):** optimize the **passage not the page** (RAG cites chunks) · **answer first in 40–60 words under a question-shaped H2** · fact density every 150–200 words (real **stat / quote / citation** — the methods that measurably lift citation) · information gain or invisible · declarative unhedged phrasing · `FAQPage` kept as AI-extraction signal (Google FAQ rich results retired May 2026; DOM must match JSON-LD) · entity trust converts citation · **allow retrieval bots, opt out of training bots** · `llms.txt` = agent insurance, not a citation lever · **measure citations, not just clicks**.

**Deprecated — do NOT do:** keyword stuffing · FAQ/HowTo rich-result chasing · self-applied review stars · scaled/AI mass pages · parasite SEO · near-duplicate multi-city doorway pages · CWV as a primary lever (it's a tiebreaker).

---

## 5. The Plan — 6 Pillars

### Pillar 1 — Technical SEO Foundation
- [ ] 🔴 Domain consolidation + redirects + GSC (Section 1).
- [ ] 🔴 Create missing assets: `public/og-default.png` (1200×630 branded), `public/logo.png` (square ≥600px), `public/favicon.ico` + `favicon-16x16.png` + `apple-touch-icon.png`. Validate all return 200.
- [ ] 🔴 Per-route `opengraph-image.tsx` for hub/money pages (never 404s, branded preview).
- [ ] 🟠 Sitemap: real `lastModified` (blog `publishDate`, course/workshop update date), add all new money pages, wrap dynamic gen in try/catch.
- [ ] 🟠 Add metadata to `/privacy`, `/terms`, `/course-curriculum`; `noindex` thin/utility (thank-you already done).
- [ ] 🟠 Fix broken `/apply` links (create page or repoint to `/book-demo`).
- [ ] 🟠 Fix `/courses/[slug]` `"use client"` SSR risk — keep schema + primary content server-rendered (move interactivity into child client components). High-value pages must be SSG/SSR.
- [ ] 🟡 INP/LCP pass on mobile: hero `priority` + correct `sizes`/AVIF; lazy-load below-fold islands; keep third-party scripts `afterInteractive`.

### Pillar 2 — Entity & Schema (the citation engine)
- [ ] 🔴 Build a single `BUSINESS`/`SITE` source of truth in `site.json` (or a config module): name, canonical URL, NAP, **postalCode 452001**, **geo 22.7196 / 75.8577**, hours, real social URLs. All schema/footer/contact read from it.
- [ ] 🔴 Collapse to ONE business node `@id` (`{url}/#org`), typed `["EducationalOrganization","LocalBusiness"]`, referenced everywhere via `@id`. Add `WebSite` node (`#website`) so `isPartOf`/`publisher` resolve.
- [ ] 🔴 Fill `sameAs` with real Instagram/LinkedIn/YouTube/GBP/Course Report/Shiksha URLs (entity corroboration).
- [ ] 🔴 Remove self-serving `aggregateRating` from the org/LocalBusiness node. Keep ratings ONLY on `/reviews` `Product`/course context with genuine first-party reviews, or let stars come from GBP.
- [ ] 🟠 Blog `/[slug]`: emit `FAQPage` from `article.faqs` (DOM already renders them via `BlogFaqList` — match text verbatim); add `dateModified`; upgrade `author` → `Person @id` pointing at a real `/team/[slug]` profile (build profiles FIRST).
- [ ] 🟠 `/instructors`: model each mentor (Santosh Patidar, Prasheel Soni, Krati Vyas, etc.) as `Person` with `@id`, `jobTitle`, `worksFor` → org `@id`, `sameAs` LinkedIn; link courses → instructors.
- [ ] 🟠 `/courses/[slug]`: keep `Course`; fix `CourseInstance` to reflect online vs Indore via `course.mode` (VirtualLocation vs Place); add `educationalCredentialAwarded`; real enroll URL.
- [ ] 🟡 Per-page schema matrix (Section 8). Validate every block in Rich Results Test + schema.org validator; clear all warnings.

### Pillar 3 — Content & Page Architecture (build the money pages)
Priority order (calibrated to research + owner constraints):

> **Owner constraints (locked):**
> 1. **No pricing/fees anywhere** — no `/pricing` page, no `Offer`/`price` in schema, no fee numbers in copy. CTA is always "book free demo / career session", never a price.
> 2. **No head-to-head vs named competitors** (no "vs Masai/Newton/Scaler"). Those pages hand rivals legitimacy and invite scrutiny. Instead use **profit-only comparisons**: positioning where Coding Sharks always wins — "best in Indore" + **learning-path** comparisons (bootcamp vs self-taught, vs college, vs free YouTube). Never name or trash a direct competitor.

| # | Page | Type | Primary query | Schema |
|---|---|---|---|---|
| 1 🔴 | `/placements` | Proof hub | "coding sharks placement", "coding course with placement guarantee" | EducationalOrganization + (real) Review |
| 2 🔴 | `/coding-bootcamp-indore` | Local pillar | "best coding bootcamp Indore", "coding classes in Indore", "full stack course Indore" | LocalBusiness + Course + FAQPage |
| 3 🔴 | `/reviews` | Trust | "coding sharks reviews" | Review + AggregateRating (genuine) |
| 4 🟠 | `/why-coding-sharks` | Positioning | "why coding sharks", "is coding sharks good" | WebPage + FAQPage |
| 5 🟠 | `/coding-bootcamp-vs-self-taught` | Path comparison (safe) | "coding bootcamp vs self-taught", "self-taught vs bootcamp developer" | WebPage + FAQPage + table |
| 6 🟠 | `/coding-bootcamp-vs-college-degree` | Path comparison (safe) | "coding bootcamp vs college degree India" | WebPage + FAQPage + table |
| 7 🟠 | `/full-stack-development-course` | SEO landing | "full stack developer course with placement" | Course + FAQPage |
| 8 🟡 | `/non-cs-background` | Differentiator | "non-CS to software engineer" | WebPage + FAQPage |
| 9 🟡 | `/for-freshers` | Audience | "coding course for freshers India" | WebPage + FAQPage |

- **Comparison strategy = profit-only.** Compare against *learning paths* (self-taught, college degree, free YouTube), NOT named institutes. Blueprint: summary table (path A vs path B on outcome/time/portfolio/placement/mentorship) → who each path suits → why structured + placement-backed wins → FAQ → free-demo CTA. Coding Sharks is always the favorable answer; no rival is named.
- Local pillar (`/coding-bootcamp-indore`) owns "best coding bootcamp/classes in Indore" — positions us #1 locally without trashing anyone.

**Mechanism — adopt the Kaya Salon hub-and-cluster SEO-landing pattern (reference: `D:\job\apoliums\Production_Kaya_Salon`):**
- Kaya uses one `seo-services.ts` data module — a typed `ServiceData` shape (`slug, h1, metaTitle, metaDescription, keywords[], intro, benefits[], faqs[], relatedServices[]`) — feeding a **hub → cluster → child** set of programmatic local landing pages ("[service] in [city]"), all interlinked via `relatedServices`. This is the exact engine to mirror.
- Build `src/data/seo-landing.ts` for Coding Sharks: **hub** `coding-bootcamp-indore` → **clusters** full-stack / data-science / AI-agents / DSA → **children** (e.g. `full-stack-developer-course-indore`, `python-course-indore`). Each entry = one local+intent landing page (H1, meta, answer-first intro, benefits, 5–7 FAQs, related links). Reuse for the path-comparison pages too.
- **Drop all price fields** from our version (owner rule) — Kaya's data carries `priceRange`, ours will not; CTA = book free demo.

**Schema approach — confirmed by the Kaya reference (mirror these):**
- Most-specific `@type` with ONE `@id` `#organization` (Kaya = `BeautySalon`; ours = `["EducationalOrganization","LocalBusiness"]`), full NAP+geo+hours+`sameAs`, `hasOfferCatalog` of `Service`s **without price**, `potentialAction` (Kaya `ReserveAction` → ours a "Book free demo" action).
- **`aggregateRating` intentionally omitted** from the org node (Kaya leaves an explicit comment why — matches our LAW 5). Re-add only via genuine `Review` data on `/reviews`.
- Single source of truth (`lib/site-config` + a `business.ts` for hours) — exactly what our Pillar 2 prescribes. No `keywords` meta (ignored).
- Every page: entity-first opening paragraph (factual, what-it-is, with a verified number), ≥7 question-H2 → direct-answer blocks, comparison table where relevant, one CTA.
- Voice: follow `codingsharks_content.md` voice card + anti-LLM scan (no em dashes, no banned words, active voice, specific numbers, never claim placement without the %).
- **Pillar-cluster internal linking** (descriptive anchors, 1 link/200–300 words):
  - Pillar `/blog/how-to-become-full-stack-developer-india` → clusters: full-stack-vs-data-science, best-language-2026, crack-interview, `/courses/full-stack`, `/placements`.
  - Pillar `/compare/best-coding-bootcamps-india` → each `/compare/vs-*` + `/placements`.
- Reverse-link: course/placement pages link back to relevant blog posts (close the loop).
- Blog: the 15 posts already shipped — upgrade each with answer-first leads, fact density, FAQPage, Person author, internal links to a course + `/placements`.

### Pillar 4 — AEO / GEO (get cited by AI)
- [ ] 🔴 `public/llms.txt` (and `llms-full.txt` for top pages) — H1 + summary blockquote + linked key pages with notes. Agent insurance.
- [ ] 🔴 robots bot policy: allow `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Googlebot`, `Applebot`; opt out of training `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider` (or keep training open for max reach — owner decision). Keep dev `Disallow: /`.
- [ ] 🟠 Rewrite every money-page + blog intro answer-first (40–60 words, declarative) under real-question H2s; one real stat/quote/citation per 150–200 words; comparison rows as one-fact-per-row tables.
- [ ] 🟠 Off-site corroboration program (where AI actually pulls citations):
  - Claim + populate **Course Report, Shiksha, AmbitionBox, SwitchUp** profiles; drive review velocity.
  - Genuine helpful answers on **Reddit** (r/developersIndia, r/india), **Quora**, **Teamblind** for bootcamp/placement threads (no spam; mention only when relevant).
  - **YouTube** explainer ("Is a coding bootcamp worth it in India?" / "Coding Sharks placement story") + transcript on-site — video is a top-cited format.
- [ ] 🟡 Pursue Wikidata entry only if genuinely notable (press/awards) — don't fabricate.

### Pillar 5 — Local SEO (own Indore)
- [ ] 🔴 Google Business Profile: claim/verify at Bhawarkua address; primary category "Computer Training School" + secondary "Vocational School"; list all 8 programs as services with prices; classroom/mentor/project photos; weekly posts.
- [ ] 🔴 Review velocity: post-cohort SMS/email ask → `/review` redirect to GBP; respond to ~all reviews. (Stars come from GBP, never self-schema.)
- [ ] 🟠 `/coding-bootcamp-indore` page with Bhawarkua mention, map embed (keyless), local alumni/companies.
- [ ] 🟡 NAP-identical listings on Justdial, Sulekha, Shiksha. No near-duplicate city pages unless genuinely localized.

### Pillar 6 — Measurement (citations, not just clicks)
- [ ] 🟠 GA4 custom AI channel group: regex `chatgpt|openai|perplexity|gemini|claude|copilot|grok|you\.com` on source/medium + referrer. (ChatGPT apps land in Direct — expect undercount.)
- [ ] 🟠 Search Console: track impressions/positions for the target keyword set; monitor AI-Overview-eligible queries.
- [ ] 🟡 Citation share-of-voice tool (Otterly for budget, or Profound) for "best coding bootcamp India", "coding bootcamp Indore", "Coding Sharks vs X".
- [ ] 🟡 Server-log grep for `OAI-SearchBot|PerplexityBot|Claude-SearchBot|Googlebot` to confirm retrieval-bot crawling.

---

## 6. Phased Roadmap (sequenced)

**Phase 0 — Foundation (Week 1, 🔴 blockers).** Domain consolidation + redirects + GSC; create og/logo/favicon assets; fix `/apply` links; robots bot-policy; `llms.txt`; remove self-serving aggregateRating; build `BUSINESS` source of truth + unify `@id` + fill `sameAs`. *Nothing else ranks until this is done.*

**Phase 1 — Proof + Local (Weeks 2–3).** `/placements`, `/coding-bootcamp-indore`, `/reviews`, `/pricing`; GBP claim + review engine; sitemap real dates; metadata on legal pages.

**Phase 2 — Comparison engine (Weeks 3–5).** `/compare/best-coding-bootcamps-india` pillar + `vs-masai` / `vs-newton` / `vs-scaler`; internal-link pillar-cluster; off-site profiles (Course Report/Shiksha/AmbitionBox) live.

**Phase 3 — Landing + audience + blog upgrade (Weeks 5–8).** `/full-stack-development-course`, `/non-cs-background`, `/for-freshers`; upgrade 15 blogs (answer-first, FAQPage, Person author, links); `/team/[slug]` profiles + Person schema; fix course `/[slug]` SSR.
- [ ] 🟡 Wikidata entry only if genuinely notable (press/awards) — don't fabricate.

**Phase 4 — AEO amplification + measurement (Weeks 8–12, ongoing).** Reddit/Quora/YouTube program; review velocity; GA4 AI channel + SoV tool; iterate from Search Console + citation data; expand content clusters.

---

## 7. Keyword Universe (target map — condensed)

**Tier 1 (bottom funnel, highest priority):** coding bootcamp India · full stack course with placement · coding course with placement guarantee · best coding bootcamp India 2026 · coding classes in Indore · full stack developer course Indore · Coding Sharks vs Masai/Newton/Scaler · Coding Sharks review/placement/fees · AI course with placement India · data science bootcamp India · DSA course for placements · system design course India.

**Tier 2 (mid funnel):** how to become full stack developer India · career change to software developer India · non-CS background software engineering · full stack vs data science · best programming language 2026 · is coding bootcamp worth it India · self-taught vs bootcamp · average software developer salary India 2026 · how to crack software developer interview.

**Tier 3 (top funnel):** what is full stack development · how to learn coding (free vs paid) · software developer career India · tech jobs in Indore · AI jobs India 2026.

**Branded (always own):** "Coding Sharks review", "Coding Sharks vs [X]", "Coding Sharks placement rate", "Coding Sharks fees".

---

## 8. Per-Page Schema Matrix

| Page | Required schema |
|---|---|
| Home | EducationalOrganization+LocalBusiness (one `@id`) + WebSite + FAQPage |
| `/courses/[slug]` | Course + (org by `@id`) + FAQPage |
| `/courses` | ItemList |
| `/placements` | EducationalOrganization(ref) + Review/AggregateRating (genuine) |
| `/reviews` | Review + AggregateRating (genuine first-party) |
| `/pricing` | EducationalOrganization(ref) + Offer (real prices) |
| `/compare/*` | WebPage + FAQPage (+ ItemList on the pillar) |
| `/coding-bootcamp-indore` | LocalBusiness(ref) + Course + FAQPage |
| `/blog/[slug]` | BlogPosting (Person author `@id`) + BreadcrumbList + FAQPage |
| `/team/[slug]` | Person (`worksFor` org `@id`, `sameAs`) |
| `/instructors` | ProfilePage + Person[] |
| `/workshops/[slug]` | Event + EducationalOrganization(ref) |

All: server-rendered, absolute self-canonical, one business `@id`, NAP from source of truth, validated (zero warnings), referenced assets return 200.

---

## 9. KPIs / Success Metrics

| Metric | Baseline | 90-day target |
|---|---|---|
| One canonical domain indexed (others 301'd) | 3 hosts | 1 host |
| Money pages live (placements/compare/reviews/pricing/local) | 0 | 8+ |
| Schema blocks valid, zero warnings | partial | 100% of public pages |
| GBP reviews (Indore) | ? | steady weekly velocity, ~all responded |
| Off-site profiles (Course Report/Shiksha/AmbitionBox) | ~0 | claimed + reviews flowing |
| Rank: "coding classes Indore" / "coding bootcamp Indore" | ? | top 3 + local pack |
| Rank: "Coding Sharks vs *" branded | none | #1 (own it) |
| AI citation SoV: "best coding bootcamp India" | ~0 | appear in ≥1 engine's answer |
| Core Web Vitals (mobile) | check | INP ≤200ms, LCP ≤2.5s, CLS ≤0.1 |

---

## 10. Hard Rules / Guardrails

1. Never claim placement without the specific % (94% Full Stack, 96% System Design, etc.).
2. Always cite exact numbers: ₹21L+ top, ₹8–15L avg, 50+ hiring partners, 15,000+ trained, 61% non-CS.
3. Comparison pages must be fair to competitors. Trust > manipulation.
4. No self-serving `aggregateRating` on the org node — stars come from GBP / genuine first-party reviews only.
5. All SEO content server-rendered (SSG/SSR). No primary content or JSON-LD via client effects.
6. One entity, one `@id`, one source of truth — never re-type NAP/hours/geo.
7. Create assets before referencing them (og, logo, favicons) — no 404'd schema images.
8. Allow retrieval bots; opt out of training bots (or keep open) — never block retrieval bots.
9. No em dashes, no banned LLM words (per `codingsharks_content.md` anti-LLM scan).
10. Every blog post links to ≥1 course + `/placements` with descriptive anchor text (never "click here").

---

## 11. Open Decisions (need owner input before Phase 0)

- [x] **Canonical domain = `thecodingsharks.com`** (settled — this project). `.in` is a separate project (out of scope). Remaining sub-decision: how to handle the `.com`↔`.in` brand-cannibalization risk (differentiate / `sameAs` / accept) — see Section 1.
- [ ] **GBP access** — who owns/can verify the Google Business Profile?
- [ ] **Real review data** — source of genuine first-party reviews for `/reviews` schema (GBP export? on-site form?).
- [ ] **Training bots** — opt out (privacy-conservative) or keep open (max brand presence in AI)?
- [ ] **Confirm verified numbers** — exact per-program placement %, top/avg CTC, hiring-partner names for citable copy.
- [ ] **Geo coords / postal code** — confirm 22.7196 / 75.8577, 452001 for the Bhawarkua address.

---

### Appendix — Sources
- Codebase audit (this repo) · `apex-seo` + `apex-aeo` skills · `codingshark_seo_skill.md` · `codingsharks_content.md`.
- Princeton/Allen-AI GEO study: https://arxiv.org/abs/2311.09735
- Google: helpful-content-into-core https://developers.google.com/search/blog/2024/03/core-update-spam-policies · review-snippet https://developers.google.com/search/docs/appearance/structured-data/review-snippet · Course schema https://developers.google.com/search/docs/appearance/structured-data/course-info · AI features https://developers.google.com/search/docs/appearance/ai-features
- web.dev INP https://web.dev/articles/inp · Vitals https://web.dev/articles/vitals · llms.txt https://llmstxt.org
- Competitor/market: https://www.coursereport.com/best-coding-bootcamps · https://www.collegesimplified.in/post/scaler-vs-newton-vs-masai-2026-comparing-modern-tech-school-courses-and-streams · https://www.masaischool.com · https://collegedunia.com/college/64273-newton-school-of-technology-sonepat
- Live brand surfaces observed: https://www.thecodingsharks.in/ · https://codingsharks-production.vercel.app/

> Web research note: live web worked from the main session; background subagents were permission-denied for web, so competitor + frontier facts here were gathered by the main agent + in-repo skills. Re-run any external-facing % against a live source before publishing.
