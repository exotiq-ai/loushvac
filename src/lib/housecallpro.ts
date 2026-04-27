// Housecall Pro Public API client.
// NOTE: HCP's docs are JS-rendered; field names below are best-effort and may need
// adjustment once Lou's exact OAuth credentials and endpoint signatures are confirmed.
// Adjust createCustomer/createLead bodies as needed when the real API reference is in hand.

const apiBase = import.meta.env.HCP_API_BASE || 'https://api.housecallpro.com';
const clientId = import.meta.env.HCP_CLIENT_ID;
const clientSecret = import.meta.env.HCP_CLIENT_SECRET;
const accountToken = import.meta.env.HCP_ACCOUNT_TOKEN;
const apiVersion = import.meta.env.HCP_API_VERSION || '2024-01-01';

function configured(): boolean {
  return Boolean(clientId && clientSecret && accountToken);
}

function authHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'API-Version': apiVersion,
    'Client-Id': clientId!,
    'Client-Secret': clientSecret!,
    'Account-Token': accountToken!,
  };
}

export interface HCPCustomerInput {
  first_name: string;
  last_name: string;
  email?: string;
  mobile_number?: string;
  notifications_enabled?: boolean;
}

export interface HCPLeadInput {
  customer_id: string;
  service?: string;
  description?: string;
  source?: string;
}

async function postJson(path: string, body: unknown): Promise<{ data?: any; error?: string }> {
  try {
    const res = await fetch(`${apiBase}${path}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      return { error: `HCP ${path} ${res.status}: ${text.slice(0, 240)}` };
    }
    const data = await res.json();
    return { data };
  } catch (err: any) {
    return { error: err?.message || `HCP ${path} request failed` };
  }
}

export async function createCustomer(input: HCPCustomerInput): Promise<{ id?: string; error?: string }> {
  if (!configured()) return { error: 'HCP not configured' };
  const r = await postJson('/customers', input);
  if (r.error) return { error: r.error };
  return { id: r.data?.id };
}

export async function createLead(input: HCPLeadInput): Promise<{ id?: string; error?: string }> {
  if (!configured()) return { error: 'HCP not configured' };
  const r = await postJson('/leads', input);
  if (r.error) return { error: r.error };
  return { id: r.data?.id };
}

export async function findOrCreateCustomerAndLead(args: {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  source?: string;
}): Promise<{ customerId?: string; leadId?: string; error?: string }> {
  if (!configured()) return { error: 'HCP not configured' };

  const trimmed = args.name.trim();
  const [first_name, ...rest] = trimmed.split(/\s+/);
  const last_name = rest.join(' ') || '—';

  const customer = await createCustomer({
    first_name,
    last_name,
    email: args.email,
    mobile_number: args.phone,
    notifications_enabled: false,
  });
  if (customer.error || !customer.id) {
    return { error: customer.error || 'no customer id returned' };
  }

  const lead = await createLead({
    customer_id: customer.id,
    service: args.service,
    description: args.message,
    source: args.source || 'website',
  });

  return {
    customerId: customer.id,
    leadId: lead.id,
    error: lead.error,
  };
}
