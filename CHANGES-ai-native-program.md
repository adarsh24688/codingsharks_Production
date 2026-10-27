# AI-Native Developer Program: changes (27 Oct 2026)

Page: `/workshops/ai-native-developer-program`
File: `public/workshops/ai-native-developer-program/index.html` (static HTML; settings in the `CONFIG` block near the end)

None of this is live yet. Everything below is local until deployed.

---

## 1. Batch, price and seats

| Setting | Before | Now |
|---|---|---|
| Batch start (`cohortStart`) | 12 Oct 2026 | **23 Nov 2026, 10 AM** |
| Applications close (`reservationCloses`) | 11 Oct 2026 | **22 Nov 2026, 11:59 PM** |
| Seats (`seatsTotal`) | 100 | **60** |
| Fee | ₹12,999 | **₹17,999** |
| Instalments | ₹6,999 + ₹6,000 | **₹9,999 + ₹8,000** (confirmed) |
| Batch timings (`batchTimings`) | not set | **Mon–Sat · 10 AM – 1 PM** (placeholder, change if needed) |
| Orientation Day (`orientation`) | not set | **Sun 22 Nov 2026, 11 AM** (placeholder, change if needed) |
| Balance after ₹499 | ₹12,500 | **₹17,500** |
| Per-day line | ₹216 a day | **₹300 a day** |
| Day 60 / Demo Day | 10 Dec | **21 Jan 2027** (calculated from the start date) |

- `showPlaceholders` set to `false` (no TODO boxes on the page).
- Students only: removed the "0–3 years into work" line, the "(Working?)" checklist item (checklist is now out of 7) and the Graduate / Working professional options in the form.

## 2. Sections hidden or trimmed

All hidden sections are wrapped in `<!-- HIDDEN FOR NOW (...) -->`. Delete the two comment lines to bring one back.

| Section | Change |
|---|---|
| News clippings | Kept; the 4 "Read ↗" links removed |
| Old way vs AI-native way | Hidden |
| Coding Sharks Promise | Build Guarantee and "Repeat free" hidden; only the **7-day full refund** stays (`promise.confirmed: true`, approved by the business), centred as one card |
| Student testimonials (Priyanka, Saurabh, Nikhil, reels, WhatsApp) | Hidden; scripts updated so the page works without it |

## 3. New "How to join" process

Apply for ₹499 → Onboarding call (within 24 hrs) → **20-minute video interview** with a mentor (no DSA, no coding test) → Result within 48 hrs (not selected = full ₹499 refund) → Orientation day → Day 1: 23 Nov.

- FAQ, refund text, parents summary and the form now describe this process.
- Refund wording: "₹499 refunded if not selected" and "full refund before the first class".

## 4. Mentors

- **Sudhir Chauhan**: large featured card. AI Project Lead, Persistent Systems · 20 years. "Previously" row with J.P. Morgan and Cognizant logos, plus Mphasis as text. Quote from his ad video. New photo `img/expert-sudhir-chauhan.webp`. No "Industry mentor" tag.
- **Pradeep Patidar**: Tech Lead, Aerpace (was "Founder, Apoliums · ex-Airpace").
- Company logo badges on photos: Dingg (Santosh), Aerpace (Pradeep), Crewnox (Krati), Persistent (Sudhir).
- New box under the cards: "And many more industry experts joining us".
- Logos are in `img/logos/`; original files are in `img/logos/original/`.

## 5. Buttons (CTAs)

₹499 removed from all buttons. It is still shown in the price box and on the form's pay button.

| Where | Button |
|---|---|
| Nav / top bar | Apply now |
| Hero | Start my application |
| News | Put me in group 2 |
| Reality check | Fix this in 60 days |
| Cost of waiting | Join the 23 Nov batch |
| Certificate | Start earning it |
| Price box | Secure my seat |
| Promise | Try it risk-free |
| Final | Claim 1 of 60 seats |
| Sticky bar (phone) | "Only 60 seats · Starts 23 Nov" + Apply now |
| Form title / submit | Apply for the 23 Nov batch / **Pay ₹499 & submit application** |

- Removed the line under the hero button.
- Footer "Terms & refunds" now opens `/refund`.
- Razorpay payment window: "application fee" (was "seat reservation").

## 6. Certificate

- Certificate image is now **light** (ivory, navy, gold, orange): `img/certificate-sample.webp` and `-800.webp`.
- Completion date on it: 21 Jan 2027.
- Dark version kept in `img/original/certificate-sample-dark*.webp`.
- Design file: `Cohort-2026/ch2/web-2/certificate_template_light.html`.

## 7. Thank-you page (`src/app/thank-you/page.tsx`)

After a paid ₹499: "Your application is in." Next steps: onboarding call → 20-minute video interview → result in 48 hrs → full refund if not selected.

## 8. Tracking

**Browser (in the landing page `<head>`).** The page is static HTML and does not use the site layout, so these were missing before:
- Meta Pixel `970927388458009` (dataset CodeSharks-New)
- Google Ads `AW-16720744211` (page views only; no conversion action yet)
- Microsoft Clarity `wn9t2hssc1`

**Meta events**

| User action | Event | Sent from |
|---|---|---|
| Opens page | PageView | Browser |
| Scrolls 50% | ViewContent | Browser |
| Opens apply form | InitiateCheckout (₹499) | Browser |
| Submits form | Lead | Browser + Server, `event_id = lead_<uuid>` |
| Pays ₹499 | Purchase (₹499 INR) | Browser (thank-you page) + Server, `event_id = purchase_<order_id>` |

The browser and server send the same `event_id`, so Meta counts each event once. Other thank-you visits (non-program forms) still send Lead.

**Server (Conversions API)**
- New `src/lib/meta-capi.ts`. Does nothing unless `META_CAPI_TOKEN` is set.
- Lead: sent from `src/app/api/program/checkout/route.ts`.
- Purchase: sent from `markPaid()` in `src/lib/program-registrations.ts`, only the first time an order becomes paid (Razorpay webhook or verify, whichever comes first).
- Sends hashed email, phone (+91), name, country and external_id, plus `_fbp`/`_fbc`, IP and user agent.
- Browser IDs are saved in a new `tracking` jsonb column. If the column is missing, checkout still works without it.
- Tested 27 Oct with the real token: Lead and Purchase received and processed in Events Manager → Test events.

## 9. Files changed

- `public/workshops/ai-native-developer-program/index.html`
- `public/workshops/ai-native-developer-program/img/` (new Sudhir photo, `logos/`, light certificate, `original/`)
- `src/lib/meta-capi.ts` (new)
- `src/lib/program-registrations.ts`
- `src/app/api/program/checkout/route.ts`
- `src/components/common/meta-pixel.tsx`
- `src/app/thank-you/page.tsx`
- `database/schema.sql` (`tracking` column)
- `.env.example` (`META_CAPI_TOKEN`, `META_PIXEL_ID`, `META_TEST_EVENT_CODE`)

---

## To do before ads go live

1. **Supabase SQL editor:** `alter table public.program_registrations add column if not exists tracking jsonb;`
2. **Vercel env:** add `META_CAPI_TOKEN`. Do not leave `META_TEST_EVENT_CODE` set in production.
3. **Razorpay webhook:** `https://www.thecodingsharks.com/api/razorpay/webhook` with `payment.captured`.
4. **Deploy.**
5. **One real ₹499 test payment:** Lead and Purchase should show Browser + Server, "Deduplicated". Refund the test payment afterwards.

## Still to confirm or add

- Mentor LinkedIn links (`CONFIG.experts`), to come from sir
- Final batch timings and Orientation Day (placeholders are set; Orientation is 22 Nov, the same day applications close)
- Source of the existing Conversions API connection on the dataset (not from this website's code)
