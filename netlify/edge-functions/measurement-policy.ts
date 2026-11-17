// Netlify supplies this trusted geo context; visitor headers/query strings are not used.
interface PolicyContext { geo?: { country?: { code?: string } }; }
export default async function measurementPolicy(request: Request, context: PolicyContext): Promise<Response> {
  const gpc = request.headers.get('Sec-GPC') === '1';
  return Response.json({ defaultOn: !gpc && context.geo?.country?.code === 'US', ...(gpc ? { gpc: true } : {}) }, {
    headers: {
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex',
      'Vary': 'Cookie, Sec-GPC',
    },
  });
}
