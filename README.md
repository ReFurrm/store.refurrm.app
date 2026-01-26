# Refurrm Creator

## Local Dev
```bash
npm install
npm run dev
```

## Supabase Setup
1) Create a Supabase project.
2) Run the migration in `supabase/migrations/20260124000100_initial_schema.sql`.
3) Create storage buckets:
   - `store-logos`
   - `reference-images`
   - `review-photos`
   - `chat-attachments`
4) Add env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Edge Functions (Stubs)
Stub functions live in `supabase/functions/*`. Deploy them with the Supabase CLI:
```bash
supabase functions deploy ai-campaign-generator
supabase functions deploy ai-collection-organizer
supabase functions deploy ai-dm-script-generator
supabase functions deploy ai-email-generator
supabase functions deploy ai-image-analyzer
supabase functions deploy ai-product-copy
supabase functions deploy ai-product-finisher
supabase functions deploy ai-store-generator
supabase functions deploy ai-voice-to-store
supabase functions deploy approve-affiliate
supabase functions deploy bulk-email-customers
supabase functions deploy cancel-subscription
supabase functions deploy create-checkout-session
supabase functions deploy export-data
supabase functions deploy generate-product-mockups
supabase functions deploy google-calendar-sync
supabase functions deploy google-oauth-initiate
supabase functions deploy grant-vip-access
supabase functions deploy printful-order-fulfillment
supabase functions deploy printify-get-shops
supabase functions deploy seed-account-data
supabase functions deploy social-media-scheduler
supabase functions deploy verify-payment-gateway
```

Shared helpers for CORS + JSON responses live in `supabase/functions/_shared`.
