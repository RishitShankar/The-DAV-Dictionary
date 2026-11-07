import crypto from 'crypto';

const AUTH_SECRET = 'DAV_PORTAL_SECURE_AUTH_KEY_2026_HEADBOY_RISHIT';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    if (res && res.setHeader) {
      Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(200).end();
    }
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    const err = { error: 'Method Not Allowed' };
    if (res && res.status) {
      Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(405).json(err);
    }
    return new Response(JSON.stringify(err), { status: 405, headers: CORS_HEADERS });
  }

  let body = {};
  if (typeof req.json === 'function') {
    body = await req.json().catch(() => ({}));
  } else if (req.body) {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  const cleanEmail = String(body.email || '').trim().toLowerCase();
  const cleanOtp = String(body.otp || '').trim();
  const expiresAt = Number(body.expiresAt || 0);
  const token = String(body.token || '').trim();

  if (!cleanEmail || !cleanOtp) {
    const err = { success: false, error: 'Email and 6-digit OTP code are required.' };
    if (res && res.status) {
      Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(400).json(err);
    }
    return new Response(JSON.stringify(err), { status: 400, headers: CORS_HEADERS });
  }

  if (!token || !expiresAt) {
    const err = { 
      success: false, 
      error: 'Session token missing or invalid. Please request a new OTP code.' 
    };
    if (res && res.status) {
      Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(400).json(err);
    }
    return new Response(JSON.stringify(err), { status: 400, headers: CORS_HEADERS });
  }

  if (Date.now() > expiresAt) {
    const err = { 
      success: false, 
      error: 'This OTP code has expired. Please request a new code.' 
    };
    if (res && res.status) {
      Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(400).json(err);
    }
    return new Response(JSON.stringify(err), { status: 400, headers: CORS_HEADERS });
  }

  // Calculate expected HMAC signature
  const expectedSignature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`${cleanEmail}:${cleanOtp}:${expiresAt}`)
    .digest('hex');

  if (token !== expectedSignature) {
    const err = {
      success: false,
      error: 'Invalid 6-digit OTP code. Please check your Gmail and try again.'
    };
    if (res && res.status) {
      Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(401).json(err);
    }
    return new Response(JSON.stringify(err), { status: 401, headers: CORS_HEADERS });
  }

  const successResponse = {
    success: true,
    email: cleanEmail,
    verified: true,
    message: 'Gmail address authenticated successfully.'
  };

  if (res && res.status) {
    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).json(successResponse);
  }
  return new Response(JSON.stringify(successResponse), {
    status: 200,
    headers: CORS_HEADERS
  });
}
