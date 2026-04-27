-- 001_create_leads.sql
-- Run via Supabase SQL Editor or `supabase db push`.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  email text not null,
  service text,
  message text,
  preferred_time text,
  source_page text,
  user_agent text,
  ip_hash text,
  status text default 'new' check (status in ('new','contacted','won','lost')),
  hcp_lead_id text,
  hcp_customer_id text,
  email_sent boolean default false,
  notes text
);

create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_status_idx on leads(status);

-- RLS on; the server endpoint uses the service-role key which bypasses RLS.
-- No public select/insert policies are defined intentionally.
alter table leads enable row level security;
