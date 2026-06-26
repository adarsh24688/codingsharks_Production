# Coding Sharks — SEO/AEO Handover

Site: **https://www.thecodingsharks.com** · Status: in-code SEO/AEO build complete (Phases 0–3).
Master plan: `latestPlan.md`. Constraints honoured: no fees shown anywhere; no named-competitor comparisons.

---

## 1. ✅ What has been built (and where to look)

Open these on the live site (after deploy) or locally via `npm run dev` → `localhost:3000`.

### New SEO/AEO pages
| URL | Targets |
|---|---|
| `/coding-bootcamp-indore` | "coding bootcamp / classes Indore" (local pillar) |
| `/placements` | "coding sharks placement" + real outcomes |
| `/reviews` | "coding sharks reviews" |
| `/why-coding-sharks` | "is coding sharks good / why" |
| `/full-stack-development-course` | "full stack course with placement" |
| `/ai-course-india` | "AI course India" |
| `/data-science-course-india` | "data science course India" |
| `/coding-bootcamp-vs-self-taught` | comparison (table) |
| `/coding-bootcamp-vs-college-degree` | comparison (table) |
| `/non-cs-background` | "non-CS to software engineer" |
| `/for-freshers` | "coding course for freshers" |
| `/dsa-course-for-placements` | "DSA course for placements" (interview intent) |
| `/system-design-course` | "system design course India" |
| `/software-developer-salary-india` | "software developer salary India" (AI-citable data) |
| `/faq` | aggregated FAQ hub (AEO) |
| `/instructors` | mentors + Person schema (E-E-A-T) |

### Foundation (sitewide)
- One business entity, single `@id`, EducationalOrganization + LocalBusiness, NAP + geo + hours + sameAs — driven from one config (`src/data/site.json` + `src/lib/site-config.ts`).
- Central schema helper (`src/lib/seo-schema.ts`); no self-serving star ratings; no prices in schema.
- Every new page: server-rendered, self-canonical, FAQPage + Breadcrumb JSON-LD, answer-first content (built to be cited by AI).
- All 21 blog posts now emit FAQPage + BlogPosting schema — including a 3000-word **pillar guide** `/blog/how-to-become-a-full-stack-developer-in-india` and career/interview/language/worth-it/Indore-jobs posts.
- `robots.txt` (allows AI answer bots, blocks training bots), `sitemap.xml` (all pages + real blog dates), `llms.txt` (AI manifest).
- Footer links to the key new pages (internal-link equity).

### How to verify it's working (free, do this yourself)
1. Open a page → right-click → **View Page Source** → Ctrl+F `application/ld+json` → schema is there.
2. Paste the URL into **Google Rich Results Test** → https://search.google.com/test/rich-results (expect 0 errors).
3. Paste into **Schema Validator** → https://validator.schema.org
4. Check `/robots.txt`, `/sitemap.xml`, `/llms.txt` load.
5. Speed: **PageSpeed Insights** → https://pagespeed.web.dev (target: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1).

---

## 2. 📋 What YOU need to provide / do (from sir) — in priority order

| # | Task | Why it matters | Effort |
|---|---|---|---|
| 1 | **Google Business Profile** — claim & verify the Bhawarkua address, set category "Computer Training School" + "Vocational School", add photos, list programs | GBP = ~32% of local ranking weight. Biggest Indore lever. | High |
| 2 | **Real social URLs** (Instagram / LinkedIn / YouTube) → give me, I plug into `site.json` (schema + llms auto-update) | Entity trust (`sameAs`) | 2 min for you |
| 3 | **Real OG image 1200×630** (branded) to replace the stopgap | Social share previews | Designer |
| 4 | **Google Search Console + Bing Webmaster** — verify the domain, submit `sitemap.xml`. Give me the GSC verification token and I add it to the code | Indexing + rank tracking | Medium |
| 5 | **Confirm exact numbers** — per-program placement %, CTC, hiring-partner names (are these publishable?) | I used the strategy-doc values; you confirm accuracy | 10 min |
| 6 | **Education + local listings** (free) — Shiksha, CollegeDunia, Justdial, Sulekha, IndiaMART, Yelp India. Use **byte-identical NAP** everywhere | Citations + AI answers pull from these | Medium |
| 7 | **Student Google reviews** — ask each cohort to leave one; respond to all | Review velocity is a top local signal | Ongoing |
| 8 | **Off-site presence** (free) — 1 YouTube explainer + transcript; genuine helpful answers on Reddit (r/developersIndia) & Quora; claim a Course Report profile | This is where ChatGPT/Perplexity pull citations | Ongoing |
| 9 | **Decision: AI training bots** — currently blocked (stay-in-answers, opt-out-of-training). Say if you want them open | Reach vs control | 1 min |

---

## 3. 🔍 Where + how to check your rank after SEO (free tools — researched)

### First-party (free, most accurate — set up first)
- **Google Search Console** — https://search.google.com/search-console — your real Google rankings, impressions, clicks, average position, indexing. The #1 free tool. ([source](https://learn.g2.com/best-free-seo-tools))
- **Bing Webmaster Tools** — https://www.bing.com/webmasters
- **Google Analytics 4** — traffic + where visitors come from (add an "AI" channel filter for chatgpt/perplexity/gemini referrers).

### Free / freemium keyword rank trackers
- **SE Ranking** (5 keywords free) — https://seranking.com
- **Mangools SERPWatcher** (free trial, daily updates) — https://mangools.com
- **SEO PowerSuite** Rank Tracker (free desktop, no keyword limit) — https://www.link-assistant.com
- (sources: [respona](https://respona.com/blog/seo-rank-tracking-tools/), [jaysearch](https://jaysearch.com/blog/free-keyword-rank-checkers))

### Free site / technical audit
- **PageSpeed Insights** — https://pagespeed.web.dev (Core Web Vitals)
- **Ahrefs Webmaster Tools** (free for your own site) — https://ahrefs.com/webmaster-tools (backlinks + site health)
- **Screaming Frog** (free up to 500 URLs) — https://www.screamingfrog.co.uk/seo-spider/
- **Semrush free Site Audit** — https://www.semrush.com/siteaudit/ · **Backlinko SEO checker** — https://backlinko.com/tools/seo-checker

### AI-search visibility (AEO — is AI citing you?)
- **Ahrefs AI Visibility Checker** (free, no signup — ChatGPT, Gemini, Perplexity, Copilot, Google AI Overviews) — https://ahrefs.com/ai-visibility-checker
- **Omnia free AI visibility checker** — https://www.useomnia.com/ai-visibility-checker
- **Otterly.ai** (low-cost AI answer monitoring) — https://otterly.ai
- (source: [Ahrefs](https://ahrefs.com/ai-visibility-checker), [gilmedia](https://www.gilmedia.com/blog/track-ai-brand-visibility-2026/))

### India local + education listings (free, high ROI)
- **Google Business Profile** (top priority) · **Justdial** · **Sulekha** · **IndiaMART** · **Yelp India**
- Education-specific: **Shiksha.com** · **CollegeDunia** (source: [w3era](https://www.w3era.com/blog/seo/free-business-listing-sites-india/), [kodetimize](https://kodetimize.com/local-seo-checklist-india-2026/))

---

## 4. 🆓 Free improvement checklist (do now, no spend)

- [ ] Verify domain in GSC + Bing; submit `/sitemap.xml`; use "Request indexing" for the new pages.
- [ ] Claim + fully complete Google Business Profile; add 10+ photos; post weekly.
- [ ] Get students leaving Google reviews (steady flow), respond to all.
- [ ] Create Shiksha + CollegeDunia + Justdial + Sulekha listings with identical NAP.
- [ ] Publish 1 YouTube "Is a coding bootcamp worth it in India?" explainer + paste the transcript on a blog post.
- [ ] Answer 5–10 genuine questions on Reddit (r/developersIndia) and Quora about bootcamps/placement (no spam).
- [ ] Run each new page through Rich Results Test + PageSpeed Insights; fix any flagged item.
- [ ] After 2–4 weeks, check Search Console for the target keywords and AI Visibility Checker for AI mentions.

---

## 5. ⏳ Known pending (engineering, parked by owner)
- Full `next build` has an intermittent prerender flake (transient, ~0–2 pages). Permanent fix = server-render the heavy `use client` pages (CourseDetailPage etc.). Parked per your call; `tsc` is clean.
- Blog content lead paragraphs can be polished to strict answer-first format later (already FAQPage-schema'd and well-structured).

---

## 6. 🪜 STEP-BY-STEP GUIDES (do these in order — no SEO experience needed)

> Business facts to use everywhere (keep them **byte-identical** — same spelling, spacing, format):
> - **Name:** Coding Sharks
> - **Phone:** +91 9424586286
> - **Email:** info@thecodingsharks.com
> - **Address:** 3rd Floor, Veda Complex, Room No. 301, Bhawarkua Main Road, Bhawarkua Square, Indore, Madhya Pradesh 452001, India
> - **Website:** https://www.thecodingsharks.com

### STEP A — Deploy the site live on `www.thecodingsharks.com` (do this FIRST)
Nothing ranks until the new pages are live on the real domain.
1. In **Vercel** → open the Coding Sharks project → **Settings → Domains** → confirm `www.thecodingsharks.com` is added and shows **"Valid"**. (It is already connected per the owner.)
2. Make `thecodingsharks.com` (without www) redirect to `www.thecodingsharks.com` — Vercel does this automatically when you add both; if not, add the non-www domain and set it to "Redirect to www".
3. Push the latest code to the connected Git branch so Vercel rebuilds and deploys. After deploy, open `https://www.thecodingsharks.com` and check the new pages load (e.g. `/placements`, `/faq`).

### STEP B — Google Search Console (get Google to find + index the site) ⭐ most important
1. Go to **https://search.google.com/search-console** → sign in with the company Google account.
2. Click **Add property** → choose the **"URL prefix"** box → type `https://www.thecodingsharks.com` → **Continue**.
3. Pick the **"HTML tag"** verification method → it shows a line like `<meta name="google-site-verification" content="XXXXXXXX" />`. **Copy the `content` value (the XXXXXXXX part)** and send it to your developer (me) — I paste it into the site, you redeploy, then click **Verify**.
   - *Easier alternative:* choose **"Domain"** method → it gives a **TXT record** → add it in your domain registrar's DNS settings → Verify. (Use this only if you have DNS access.)
4. After it says **Verified**, go to **Sitemaps** (left menu) → in the box type `sitemap.xml` → **Submit**. It should say "Success".
5. Go to **URL Inspection** (top search bar) → paste each important page URL one by one (`https://www.thecodingsharks.com/`, `/coding-bootcamp-indore`, `/placements`, `/faq`, etc.) → click **Request indexing**. Do this for ~15 main pages.
6. Come back after 1–2 weeks → **Performance** tab shows your impressions, clicks, and average position (your real rank).

### STEP C — Bing Webmaster Tools (free, 5 minutes)
1. Go to **https://www.bing.com/webmasters** → sign in.
2. Click **Import** → choose **"Import from Google Search Console"** → authorize → it copies everything automatically. (If import fails, add `https://www.thecodingsharks.com` manually and verify the same way as Step B, then submit `sitemap.xml`.)

### STEP D — Google Business Profile (Indore local #1 lever) ⭐
1. Go to **https://business.google.com** → sign in with the company Google account → **Add your business / Manage now**.
2. Business name: **Coding Sharks**. Search first — if a listing already exists, **claim** it instead of making a duplicate.
3. Business category: type **Computer Training School** (primary). Later add a secondary category **Vocational School**.
4. Add the **exact address** (from the box at the top of this section). Place the map pin correctly on Bhawarkua Square.
5. Add **phone** and **website** (exact values above).
6. **Verify** the business — Google offers postcard (by mail), phone, or **video verification**. Video is fastest: record the storefront, signage, and inside as instructed.
7. After verification, complete the profile fully:
   - Add **business hours** (e.g. 11am–8pm, the same hours shown on the site).
   - Upload **10+ real photos**: classroom, mentors, students, logo, building outside.
   - Add **Services** = your programs (Full Stack, AI, Data Science, DSA, System Design…). Do **not** put fees.
   - Write a short business description using the same facts.
8. Keep it active: post an update once a week (a placement, a workshop, a photo).

### STEP E — Collect + send these to the developer (me)
You collect, I plug into the site (5-min job each):
1. **Real social profile URLs** — your actual Instagram, LinkedIn, YouTube (and X/Twitter if any). Send the full links.
2. **One branded OG image, 1200×630 px** (PNG/JPG) — a banner with the logo + tagline "Learn Coding. Get Placed." + maybe "91%+ Placement". A designer or even Canva (free) can make it. Send the file.
3. **Confirm the numbers** are accurate and OK to publish: per-program placement % (94% Full Stack, 96% System Design, 91% AI, 92% Data Science), ₹8–15 LPA average, ₹21L+ top, 50+ hiring partners, 61% non-CS, 15,000+ trained, company names (Zepto, Razorpay, Swiggy, CRED, Meesho, Coforge). If any number is wrong, tell me the correct one.
4. **AI training-bots decision** — right now we let AI *answer* about you but block AI *training*. If you want maximum reach (allow training too), just say "open training bots".

### STEP F — Free listings (do 1–2 per day, NAP must be identical everywhere)
For each site: create an account → "Add your business / institute" → fill Name, Address, Phone, Website **exactly** as in the box above → save. Add photos where allowed.
1. **Justdial** — https://www.justdial.com (search your business first; claim if it exists)
2. **Sulekha** — https://www.sulekha.com
3. **Shiksha** — https://www.shiksha.com (education-specific, important)
4. **CollegeDunia** — https://collegedunia.com (education-specific)
5. **IndiaMART** — https://www.indiamart.com
6. **Yelp India** — https://www.yelp.co.in

### STEP G — Get Google reviews flowing (top local signal)
1. In **Google Business Profile** → there is a **"Ask for reviews / Get more reviews"** button → it gives a short **review link** (looks like `g.page/r/...`).
2. Send that link to every student who finished a cohort, on WhatsApp, with a simple message: "If Coding Sharks helped you, a quick Google review means a lot 🙏 [link]".
3. **Reply to every review** (good or bad) within a day or two. A short thank-you is enough. Aim for a steady flow (a few new reviews every week), not a one-time burst.

### STEP H — Off-site presence (free, ongoing — where AI pulls answers from)
1. **YouTube** — film one simple explainer video, e.g. "Is a coding bootcamp worth it in India?" or a student placement story. Upload it, put `https://www.thecodingsharks.com` in the description. Send the transcript to me to publish on a matching blog post.
2. **Reddit** (r/developersIndia) and **Quora** — find real questions about coding bootcamps, placement, career change in India. Answer them genuinely and helpfully. Mention Coding Sharks only when it actually fits. **No spam** — Reddit bans obvious promotion.
3. **Course Report** — https://www.coursereport.com → "Add your school" → create the Coding Sharks profile so review-aggregators (which AI cites) know you exist.

### STEP I — Check progress (after 2–4 weeks)
1. **Google Search Console → Performance** — see which keywords you appear for and your position.
2. **PageSpeed Insights** (https://pagespeed.web.dev) — paste your homepage, check the score is green.
3. **Ahrefs AI Visibility Checker** (https://ahrefs.com/ai-visibility-checker, free) — type "Coding Sharks" / "best coding bootcamp Indore" → see if AI mentions you.
4. If something looks wrong or a page has an error, tell the developer (me) with the URL — we fix and continue.

> **Order that matters most:** A (deploy) → B (Search Console + indexing) → D (Google Business Profile) → G (reviews) → F (listings) → H (off-site). Everything else is quick wins you can do alongside.
