// DAV Dictionary - PDF In-Browser Continuous Stream Service Worker
// Forces GitHub Media CDN binary streams to application/pdf & inline disposition
// so browsers view them directly inside the modal with smooth vertical scrolling without downloading.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === '/api/pdf-stream' || url.pathname.startsWith('/dav-pdf-stream')) {
    event.respondWith(handlePdfStream(event.request));
  }
});

async function handlePdfStream(request) {
  try {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
      return new Response('Missing target URL parameter', { status: 400 });
    }

    const headers = new Headers();
    const range = request.headers.get('range');
    if (range) {
      headers.set('Range', range);
    }

    const upstreamRes = await fetch(targetUrl, {
      method: request.method,
      headers: headers
    });

    const responseHeaders = new Headers();
    upstreamRes.headers.forEach((val, key) => {
      const lower = key.toLowerCase();
      if (lower !== 'content-disposition' && lower !== 'content-type') {
        responseHeaders.set(key, val);
      }
    });

    responseHeaders.set('Content-Type', 'application/pdf');
    responseHeaders.set('Content-Disposition', 'inline');
    responseHeaders.set('Accept-Ranges', 'bytes');
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      statusText: upstreamRes.statusText,
      headers: responseHeaders
    });
  } catch (err) {
    // If service worker fetch fails, fall through to network
    return fetch(request);
  }
}
