## Database Setup (Supabase)

This app expects a Supabase project with a set of tables, storage buckets, and edge functions.
The schema below is a **minimum viable setup** derived from actual code usage. You can expand
columns, add indexes, and tighten RLS policies as needed.

### 0) Required Extensions
```sql
create extension if not exists "uuid-ossp";
```

### 1) Tables
```sql
-- Profiles (auth users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  brand_name text,
  username text unique,
  timezone text default 'UTC',
  created_at timestamptz default now()
);

-- User profile/store builder settings
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  store_name text,
  store_description text,
  store_url text,
  logo_url text,
  store_logo_url text,
  custom_domain text,
  primary_color text,
  secondary_color text,
  currency text default 'USD',
  tax_rate numeric default 0,
  enable_shipping boolean default true,
  shipping_flat_rate numeric default 0,
  free_shipping_threshold numeric default 0,
  payment_methods text[] default '{}',
  business_name text,
  business_email text,
  business_phone text,
  business_address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Shops (public storefront metadata)
create table if not exists shops (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  headline text,
  subheadline text,
  bio text,
  primary_color text,
  theme text default 'light',
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  youtube_url text,
  created_at timestamptz default now()
);

-- Products
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  shop_id uuid references shops(id) on delete set null,
  name text,
  description text,
  price numeric default 0,
  type text default 'digital', -- digital / physical / service
  file_url text,
  image_url text,
  stock_quantity integer default 0,
  low_stock_threshold integer default 0,
  track_inventory boolean default false,
  created_at timestamptz default now()
);

-- Orders
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete set null,
  shop_id uuid references shops(id) on delete set null,
  customer_name text,
  customer_email text,
  amount numeric default 0,
  status text default 'paid',
  download_token text,
  download_count integer default 0,
  created_at timestamptz default now()
);

-- Subscriptions
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  status text,
  stripe_subscription_id text,
  cancel_at_period_end boolean default false,
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Payment gateways (Stripe/PayPal configs)
create table if not exists payment_gateways (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  provider text, -- stripe / paypal
  test_mode boolean default true,
  stripe_publishable_key text,
  stripe_secret_key text,
  stripe_webhook_secret text,
  paypal_client_id text,
  paypal_secret text,
  is_active boolean default false,
  created_at timestamptz default now(),
  unique (user_id, provider)
);

-- Integrations (google calendar, printify, etc.)
create table if not exists integrations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  shop_id uuid references shops(id) on delete set null,
  type text,
  connected boolean default false,
  access_token text,
  refresh_token text,
  config jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Bookings
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid references shops(id) on delete set null,
  customer_name text,
  customer_email text,
  status text default 'scheduled',
  start_time timestamptz,
  end_time timestamptz,
  created_at timestamptz default now()
);

-- Calendar sync logs
create table if not exists calendar_sync_logs (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid references shops(id) on delete set null,
  booking_id uuid references bookings(id) on delete set null,
  status text,
  error_message text,
  created_at timestamptz default now()
);

-- Conversations + Messages (customer support chat)
create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid references shops(id) on delete set null,
  customer_name text,
  customer_email text,
  status text default 'open',
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_type text, -- customer / owner
  sender_name text,
  message_text text,
  file_url text,
  file_name text,
  created_at timestamptz default now()
);

-- Product reviews
create table if not exists product_reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  customer_name text,
  customer_email text,
  rating integer,
  title text,
  review_text text,
  is_approved boolean default false,
  admin_response text,
  admin_response_date timestamptz,
  created_at timestamptz default now()
);

-- Inventory history
create table if not exists inventory_history (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  change_type text,
  quantity_change integer,
  previous_quantity integer,
  new_quantity integer,
  notes text,
  created_at timestamptz default now()
);

-- Community posts
create table if not exists community_posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  likes integer default 0,
  comments integer default 0,
  created_at timestamptz default now()
);

-- Collections + join table
create table if not exists collections (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  description text,
  created_at timestamptz default now()
);

create table if not exists collection_products (
  id uuid primary key default uuid_generate_v4(),
  collection_id uuid references collections(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  sort_order integer default 0
);

-- Blog
create table if not exists blog_categories (
  id uuid primary key default uuid_generate_v4(),
  name text,
  slug text unique,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references blog_categories(id) on delete set null,
  title text,
  slug text unique,
  excerpt text,
  content text,
  featured_image text,
  status text default 'draft',
  created_at timestamptz default now()
);

-- Email marketing
create table if not exists email_templates (
  id uuid primary key default uuid_generate_v4(),
  created_by uuid references auth.users(id) on delete set null,
  name text,
  subject text,
  body text,
  created_at timestamptz default now()
);

create table if not exists email_campaigns (
  id uuid primary key default uuid_generate_v4(),
  created_by uuid references auth.users(id) on delete set null,
  template_id uuid references email_templates(id) on delete set null,
  name text,
  status text default 'draft',
  sent_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists email_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text,
  created_at timestamptz default now()
);

create table if not exists email_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  sender_name text,
  sender_email text,
  created_at timestamptz default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text,
  created_at timestamptz default now()
);

-- Social media scheduler
create table if not exists social_media_posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  platform text,
  content text,
  scheduled_at timestamptz,
  status text default 'scheduled',
  created_at timestamptz default now()
);

-- Support tickets
create table if not exists support_tickets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  subject text,
  message text,
  status text default 'open',
  created_at timestamptz default now()
);

-- Studio queue (AI generation pipeline)
create table if not exists studio_queue (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  status text default 'pending',
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Generated stores + artist campaigns
create table if not exists generated_stores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  store_name text,
  store_description text,
  theme jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists artist_campaigns (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  product_title text,
  product_description text,
  product_price text,
  image_url text,
  created_at timestamptz default now()
);

-- Affiliates
create table if not exists affiliates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  affiliate_code text unique,
  name text,
  email text,
  website text,
  instagram text,
  twitter text,
  tiktok text,
  youtube text,
  promotional_methods text,
  application_notes text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- DM campaigns
create table if not exists dm_campaigns (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid references shops(id) on delete set null,
  campaign_name text,
  keyword text,
  script jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Printful settings (placeholder)
create table if not exists printful_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  api_key text,
  created_at timestamptz default now()
);

-- Onboarding analytics
create table if not exists onboarding_analytics (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  step text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```

### 2) Storage Buckets
Create these buckets in the Supabase dashboard (Storage):
```
store-logos
reference-images
review-photos
chat-attachments
```
Recommended: set `store-logos`, `reference-images`, `review-photos` to public read; `chat-attachments` can be private if you plan to proxy downloads.

### 3) Edge Functions (create stubs or implement)
The app calls these edge functions:
```
ai-campaign-generator
ai-collection-organizer
ai-dm-script-generator
ai-email-generator
ai-image-analyzer
ai-product-copy
ai-product-finisher
ai-store-generator
ai-voice-to-store
approve-affiliate
bulk-email-customers
cancel-subscription
create-checkout-session
export-data
generate-product-mockups
google-calendar-sync
google-oauth-initiate
grant-vip-access
printful-order-fulfillment
printify-get-shops
seed-account-data
social-media-scheduler
verify-payment-gateway
```

### 4) RLS (baseline)
For a quick start, enable RLS and add simple “owner-only” policies for private tables.
Public tables like `products`, `shops`, `collections`, `blog_posts`, `community_posts` can allow
`select` for `anon`.

Example (repeat per table as needed):
```sql
alter table community_posts enable row level security;

create policy "community_posts_select" on community_posts
  for select using (true);

create policy "community_posts_write" on community_posts
  for insert with check (auth.uid() = user_id);

create policy "community_posts_update" on community_posts
  for update using (auth.uid() = user_id);

create policy "community_posts_delete" on community_posts
  for delete using (auth.uid() = user_id);
```

### 5) Notes
- Move Supabase URL/key to env (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) and update `src/lib/supabase.ts` if needed.
- This schema is intentionally minimal; add indexes and constraints as your data model stabilizes.
