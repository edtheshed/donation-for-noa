# Blood Donation Registry

Next.js 16 (App Router, TypeScript, Tailwind v4) + Supabase (Postgres + Storage).

## Stack
- **Framework:** Next.js App Router, `force-dynamic` on the homepage (data changes frequently)
- **Database:** Supabase Postgres
- **Storage:** Supabase Storage bucket `donation-photos` (public)
- **Fonts:** Cormorant Garamond (display) + Lora (body) via `next/font/google`
- **Styling:** Tailwind v4 with custom tokens in `app/globals.css` — crimson/cream palette

## Key files
| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage — fetches donations, renders feed + form |
| `app/actions.ts` | Server actions: `getDonations()` and `submitDonation(formData)` |
| `app/components/DonationCard.tsx` | Server component card |
| `app/components/DonationForm.tsx` | `"use client"` form with live photo preview |
| `lib/supabase.ts` | Lazy Supabase client via `getSupabase()` (safe at build time) |
| `types/donation.ts` | `Donation` interface |
| `supabase/schema.sql` | Full DB + storage setup — run once in Supabase SQL editor |

## Database schema
```sql
donations (
  id         uuid primary key,
  name       text not null,
  donated_at date not null,
  location   varchar not null,
  message    text,           -- optional
  photo_url  text,           -- optional, public URL from Supabase Storage
  created_at timestamptz default now()
)
```

## Setup
1. Copy `.env.local.example` → `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
2. Run `supabase/schema.sql` in the Supabase SQL editor
3. `npm run dev`

## Notes
- All page text is intentionally generic — ready for customisation
- Photo uploads: server action converts `File` → `ArrayBuffer`, uploads to `donation-photos` bucket, stores public URL in `photo_url`
- After a successful form submission, `revalidatePath('/')` refreshes the feed
