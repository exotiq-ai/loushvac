-- Optional future Supabase history. Production is currently email-only.
-- Apply after 001_create_leads.sql ONLY to the deliberately configured Lou database.
-- Does not alter RLS, required contact fields, or existing records.
begin;
alter table public.leads
  add column if not exists enquiry_reference uuid,
  add column if not exists received_at timestamptz,
  add column if not exists attribution jsonb;
create unique index if not exists leads_enquiry_reference_idx
  on public.leads(enquiry_reference) where enquiry_reference is not null;
commit;
