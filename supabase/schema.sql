-- =============================================================================
-- Nepali Connect Germany — Supabase / PostgreSQL schema
-- Run with: supabase db push   (or paste into the SQL editor)
-- =============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

create type moderation_status as enum ('pending', 'approved', 'rejected');
create type housing_type as enum ('Room', 'Apartment', 'Temporary Accommodation');
create type job_type as enum ('Full-time', 'Part-time', 'Internship', 'Working Student', 'Ausbildung');
create type language as enum ('Nepali', 'English', 'German', 'Hindi');
create type practice_area as enum ('Immigration', 'Civil', 'Criminal', 'Family', 'Corporate');

-- ---------------------------------------------------------------------------
-- Cities
-- ---------------------------------------------------------------------------
create table cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  state text not null,
  lat double precision not null,
  lng double precision not null,
  hero_image text,
  blurb text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Categories (sports, community, services, food, life)
-- ---------------------------------------------------------------------------
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  icon text not null,
  "group" text not null,
  description text
);

-- ---------------------------------------------------------------------------
-- Users (mirrors Clerk user, kept in sync via webhook)
-- ---------------------------------------------------------------------------
create table users (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique not null,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'member', -- member | business_owner | moderator | admin
  city_id uuid references cities(id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Sports clubs / community associations
-- ---------------------------------------------------------------------------
create table clubs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city_id uuid not null references cities(id),
  category_id uuid not null references categories(id),
  owner_id uuid references users(id),
  logo text,
  cover_image text,
  description text,
  social jsonb default '{}'::jsonb, -- { instagram, facebook, tiktok, whatsapp, website }
  captain_name text,
  phone text,
  email text,
  practice_location text,
  practice_time text,
  maps_url text,
  member_count int not null default 0,
  is_featured boolean not null default false,
  status moderation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Communities (cultural orgs, student associations, religious orgs, etc.)
-- ---------------------------------------------------------------------------
create table communities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city_id uuid not null references cities(id),
  category_id uuid not null references categories(id),
  owner_id uuid references users(id),
  logo text,
  description text,
  social jsonb default '{}'::jsonb,
  contact_name text,
  contact_email text,
  status moderation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Businesses (consultants, financial services, general directory)
-- ---------------------------------------------------------------------------
create table businesses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city_id uuid not null references cities(id),
  owner_id uuid references users(id),
  category text not null,
  logo text,
  description text,
  opening_hours jsonb default '[]'::jsonb, -- [{ day, hours }]
  address text,
  maps_url text,
  social jsonb default '{}'::jsonb,
  phone text,
  rating numeric(2,1) default 0,
  review_count int not null default 0,
  is_premium boolean not null default false,
  status moderation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Restaurants (extends businesses 1:1)
-- ---------------------------------------------------------------------------
create table restaurants (
  business_id uuid primary key references businesses(id) on delete cascade,
  cuisine text[] default '{}',
  menu_highlights jsonb default '[]'::jsonb, -- [{ name, price, description }]
  delivery jsonb default '[]'::jsonb -- [{ partner, url }]
);

-- ---------------------------------------------------------------------------
-- Grocery stores (extends businesses 1:1)
-- ---------------------------------------------------------------------------
create table grocery (
  business_id uuid primary key references businesses(id) on delete cascade,
  specialties text[] default '{}'
);

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
create table events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  city_id uuid not null references cities(id),
  organizer text,
  organizer_id uuid references users(id),
  poster text,
  location text,
  maps_url text,
  start_date date not null,
  end_date date,
  description text,
  category text not null, -- festival | sports | cultural | networking | religious
  festival_tag text,      -- Dashain | Tihar | Teej | Holi
  price text,
  register_url text,
  is_featured boolean not null default false,
  status moderation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Jobs
-- ---------------------------------------------------------------------------
create table jobs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  company text not null,
  city_id uuid not null references cities(id),
  posted_by uuid references users(id),
  salary text,
  type job_type not null,
  remote boolean not null default false,
  description text,
  requirements text[] default '{}',
  posted_date date not null default current_date,
  apply_url text,
  is_promoted boolean not null default false,
  status moderation_status not null default 'pending'
);

-- ---------------------------------------------------------------------------
-- Housing
-- ---------------------------------------------------------------------------
create table housing (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  city_id uuid not null references cities(id),
  posted_by uuid references users(id),
  type housing_type not null,
  price numeric(8,2) not null,
  size_sqm numeric(6,2),
  available_from date,
  photos text[] default '{}',
  description text,
  contact_name text,
  contact_phone text,
  is_promoted boolean not null default false,
  status moderation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Lawyers
-- ---------------------------------------------------------------------------
create table lawyers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city_id uuid not null references cities(id),
  practice_areas practice_area[] not null default '{}',
  languages language[] not null default '{}',
  address text,
  phone text,
  maps_url text,
  photo text,
  status moderation_status not null default 'pending'
);

-- ---------------------------------------------------------------------------
-- Doctors
-- ---------------------------------------------------------------------------
create table doctors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city_id uuid not null references cities(id),
  specialization text,
  languages language[] not null default '{}',
  address text,
  phone text,
  maps_url text,
  appointment_url text,
  photo text,
  status moderation_status not null default 'pending'
);

-- ---------------------------------------------------------------------------
-- Universities & student associations
-- ---------------------------------------------------------------------------
create table universities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city_id uuid not null references cities(id),
  logo text,
  student_association_name text,
  student_association_contact text
);

create table student_associations (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities(id) on delete cascade,
  name text not null,
  contact_email text,
  instagram text,
  facebook text
);

-- ---------------------------------------------------------------------------
-- Media, reviews, favorites
-- ---------------------------------------------------------------------------
create table photos (
  id uuid primary key default gen_random_uuid(),
  owner_type text not null, -- club | business | event | housing
  owner_id uuid not null,
  url text not null,
  cloudinary_public_id text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  target_type text not null, -- business | restaurant | club
  target_id uuid not null,
  author_id uuid references users(id),
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  target_type text not null, -- city | club | business | restaurant | event | job | housing
  target_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

-- =============================================================================
-- Indexes
-- =============================================================================
create index idx_clubs_city on clubs (city_id);
create index idx_clubs_category on clubs (category_id);
create index idx_businesses_city on businesses (city_id);
create index idx_events_city on events (city_id);
create index idx_events_start_date on events (start_date);
create index idx_jobs_city on jobs (city_id);
create index idx_housing_city on housing (city_id);
create index idx_reviews_target on reviews (target_type, target_id);
create index idx_favorites_user on favorites (user_id);

-- =============================================================================
-- Row Level Security — public read of approved content, owner-only writes
-- =============================================================================
alter table clubs enable row level security;
alter table businesses enable row level security;
alter table events enable row level security;
alter table jobs enable row level security;
alter table housing enable row level security;

create policy "Public can read approved clubs" on clubs
  for select using (status = 'approved');
create policy "Owners can manage their own clubs" on clubs
  for all using (auth.uid()::text = owner_id::text);

create policy "Public can read approved businesses" on businesses
  for select using (status = 'approved');
create policy "Owners can manage their own businesses" on businesses
  for all using (auth.uid()::text = owner_id::text);

create policy "Public can read approved events" on events
  for select using (status = 'approved');
create policy "Organizers can manage their own events" on events
  for all using (auth.uid()::text = organizer_id::text);

create policy "Public can read approved jobs" on jobs
  for select using (status = 'approved');
create policy "Posters can manage their own jobs" on jobs
  for all using (auth.uid()::text = posted_by::text);

create policy "Public can read approved housing" on housing
  for select using (status = 'approved');
create policy "Posters can manage their own housing" on housing
  for all using (auth.uid()::text = posted_by::text);

alter table favorites enable row level security;
create policy "Users manage their own favorites" on favorites
  for all using (auth.uid()::text = user_id::text);
