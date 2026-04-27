import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.SUPABASE_URL;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = url && serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : null;

export interface LeadRow {
  name: string;
  phone: string;
  email: string;
  service?: string;
  message?: string;
  preferred_time?: string;
  source_page?: string;
  user_agent?: string;
  ip_hash?: string;
  hcp_lead_id?: string;
  hcp_customer_id?: string;
  email_sent?: boolean;
  notes?: string;
}

export async function insertLead(row: LeadRow): Promise<{ id?: string; error?: string }> {
  if (!supabase) return { error: 'Supabase not configured' };
  const { data, error } = await supabase.from('leads').insert(row).select('id').single();
  if (error) return { error: error.message };
  return { id: data?.id };
}
