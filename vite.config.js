import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Dev Server Middleware: Proxies PDF streams with Content-Type: application/pdf & inline disposition
// to prevent forced browser downloads during local testing
function devPdfStreamPlugin() {
  return {
    name: 'dev-pdf-stream-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/pdf-stream')) {
          return next();
        }

        try {
          const parsed = new URL(req.url, 'http://localhost:3000');
          const targetUrl = parsed.searchParams.get('url');

          if (!targetUrl) {
            res.statusCode = 400;
            return res.end('Missing url query parameter');
          }

          const client = targetUrl.startsWith('https:') ? https : http;
          const upstreamHeaders = {};
          if (req.headers.range) {
            upstreamHeaders['Range'] = req.headers.range;
          }

          const proxyReq = client.get(targetUrl, { headers: upstreamHeaders }, (upstreamRes) => {
            res.statusCode = upstreamRes.statusCode || 200;

            ['content-range', 'accept-ranges', 'content-length'].forEach(headerName => {
              if (upstreamRes.headers[headerName]) {
                res.setHeader(headerName, upstreamRes.headers[headerName]);
              }
            });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline');
            res.setHeader('Access-Control-Allow-Origin', '*');

            upstreamRes.pipe(res);
          });

          proxyReq.on('error', (err) => {
            res.statusCode = 502;
            res.end('Proxy streaming error: ' + err.message);
          });
        } catch (err) {
          res.statusCode = 500;
          res.end('Internal server error: ' + err.message);
        }
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), devPdfStreamPlugin()],
  build: {
    emptyOutDir: false
  },
  server: {
    host: true,
    port: 3000
  }
})
