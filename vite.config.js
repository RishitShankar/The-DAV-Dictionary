import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendGmailTls, activeOtpStore } from './api/send-otp.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Dev Server Middleware: Proxies PDF streams with Content-Type: application/pdf & inline disposition
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

// Dev Server Middleware: Dispatches real Gmail OTP and verifies codes directly
function devOtpPlugin() {
  return {
    name: 'dev-otp-api-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        // 1. Send OTP: POST /api/send-otp
        if (req.url.startsWith('/api/send-otp') && req.method === 'POST') {
          let rawBody = '';
          req.on('data', chunk => { rawBody += chunk; });
          req.on('end', async () => {
            try {
              const body = JSON.parse(rawBody || '{}');
              const cleanEmail = String(body.email || '').trim().toLowerCase();
              if (!cleanEmail || !cleanEmail.includes('@')) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Please enter a valid Google email address.' }));
              }

              const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
              await sendGmailTls({ toEmail: cleanEmail, otpCode: generatedOtp });

              activeOtpStore.set(cleanEmail, {
                code: generatedOtp,
                expiresAt: Date.now() + 10 * 60 * 1000
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: true, 
                message: `Real 6-digit security OTP sent to ${cleanEmail}. Check your Gmail inbox.` 
              }));
            } catch (err) {
              console.error('Dev OTP Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || 'Failed to dispatch email' }));
            }
          });
          return;
        }

        // 2. Verify OTP: POST /api/verify-otp
        if (req.url.startsWith('/api/verify-otp') && req.method === 'POST') {
          let rawBody = '';
          req.on('data', chunk => { rawBody += chunk; });
          req.on('end', () => {
            try {
              const body = JSON.parse(rawBody || '{}');
              const cleanEmail = String(body.email || '').trim().toLowerCase();
              const cleanOtp = String(body.otp || '').trim();

              const entry = activeOtpStore.get(cleanEmail);
              if (!entry || Date.now() > entry.expiresAt || entry.code !== cleanOtp) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Invalid or expired OTP code. Please check your Gmail.' }));
              }

              activeOtpStore.delete(cleanEmail);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, verified: true }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), devPdfStreamPlugin(), devOtpPlugin()],
  build: {
    emptyOutDir: false
  },
  server: {
    host: true,
    port: 3000
  }
})
