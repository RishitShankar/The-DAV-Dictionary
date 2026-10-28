export const config = {
  runtime: 'edge',
};

const BLOCKED_HEADERS = new Set([
  'content-disposition',
  'content-type',
  'x-frame-options',
  'content-security-policy',
  'x-content-security-policy',
  'x-webkit-csp'
]);

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing target URL parameter', { status: 400 });
  }

  const range = req.headers.get('range');
  const headers = new Headers();
  if (range) {
    headers.set('Range', range);
  }

  try {
    const upstreamRes = await fetch(targetUrl, { headers });

    const responseHeaders = new Headers();
    upstreamRes.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (!BLOCKED_HEADERS.has(lower)) {
        responseHeaders.set(key, value);
      }
    });

    responseHeaders.set('Content-Type', 'application/pdf');
    responseHeaders.set('Content-Disposition', 'inline');
    responseHeaders.set('Accept-Ranges', 'bytes');
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      statusText: upstreamRes.statusText,
      headers: responseHeaders,
    });
  } catch (err) {
    return new Response('Error streaming PDF: ' + err.message, { status: 500 });
  }
}
