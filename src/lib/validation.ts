import { z } from 'zod';
import { normalizeAttribution } from './attribution-policy.ts';

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.preprocess(value => typeof value === 'string' ? value.trim() || undefined : value === null ? undefined : value, z.email().max(254).optional()),
  service: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  preferred_time: z.string().max(200).optional(),
  source_page: z.string().max(200).optional(),
  attribution: z.unknown().transform(value => normalizeAttribution(value)).optional(),
  measurement_allowed: z.boolean().optional().catch(false),
  _gotcha: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
