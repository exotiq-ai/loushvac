import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  phone: z.string().min(7).max(30).trim(),
  email: z.string().email().max(254).trim(),
  service: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  preferred_time: z.string().max(200).optional(),
  source_page: z.string().max(200).optional(),
  _gotcha: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
