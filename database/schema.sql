-- ─── CodingSharks Database Schema ────────────────────────────────────────────
-- Run this SQL in your Supabase SQL Editor
-- Go to: Supabase Dashboard → SQL Editor → New Query → paste and run
-- (Admin Users, Blog, and Blog Tag tables have been removed)

create extension if not exists pgcrypto;

create table if not exists public.program_registrations (
  id uuid primary key default gen_random_uuid(),
  program text not null,
  name text not null,
  whatsapp text not null,
  email text not null,
  status text not null,
  college text not null,
  reality_check_score integer,
  amount_paise integer not null,
  currency text not null default 'INR',
  payment_status text not null default 'created'
    check (payment_status in ('created', 'paid', 'failed')),
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  failure_reason text,
  paid_at timestamptz,
  source_page text,
  utm jsonb not null default '{}'::jsonb,
  tracking jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Meta Conversions API data (fbp, fbc, ip, ua, lead_event_id). For existing databases:
alter table public.program_registrations add column if not exists tracking jsonb;

create index if not exists program_registrations_payment_status_idx
  on public.program_registrations (payment_status);
create index if not exists program_registrations_email_idx
  on public.program_registrations (email);
create index if not exists program_registrations_whatsapp_idx
  on public.program_registrations (whatsapp);

alter table public.program_registrations enable row level security;

create table if not exists public.program_form_drafts (
  draft_id uuid primary key,
  name text,
  whatsapp text,
  email text,
  status text,
  college text,
  indore boolean,
  reality_check_score integer,
  utm jsonb not null default '{}'::jsonb,
  page text,
  stage text not null default 'draft'
    check (stage in ('draft', 'submitted', 'paid', 'failed')),
  last_event text,
  registration_id uuid,
  razorpay_order_id text,
  razorpay_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists program_form_drafts_stage_idx
  on public.program_form_drafts (stage);
create index if not exists program_form_drafts_order_idx
  on public.program_form_drafts (razorpay_order_id);

alter table public.program_form_drafts enable row level security;
