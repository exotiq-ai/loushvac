-- Owner-approved optional email. Production currently has no configured Supabase.
-- Apply after previous migrations before enabling database capture; no fake emails.
begin;
alter table public.leads alter column email drop not null;
commit;
