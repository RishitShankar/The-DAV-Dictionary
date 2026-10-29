import { activeOtpStore } from './send-otp.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    if (res && res.status) return res.status(405).json({ error: 'Method Not Allowed' });
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  let body = {};
  if (typeof req.json === 'function') {
    body = await req.json().catch(() => ({}));
  } else if (req.body) {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  const cleanEmail = String(body.email || '').trim().toLowerCase();
  const cleanOtp = String(body.otp || '').trim();

  if (!cleanEmail || !cleanOtp) {
    const err = { success: false, error: 'Email and 6-digit OTP code are required.' };
    if (res && res.status) return res.status(400).json(err);
    return new Response(JSON.stringify(err), { status: 400 });
  }

  const entry = activeOtpStore.get(cleanEmail);
  if (!entry) {
    const err = { 
      success: false, 
      error: 'No active OTP verification found. Please request a new code.' 
    };
    if (res && res.status) return res.status(400).json(err);
    return new Response(JSON.stringify(err), { status: 400 });
  }

  if (Date.now() > entry.expiresAt) {
    activeOtpStore.delete(cleanEmail);
    const err = { 
      success: false, 
      error: 'This OTP code has expired. Please request a new code.' 
    };
    if (res && res.status) return res.status(400).json(err);
    return new Response(JSON.stringify(err), { status: 400 });
  }

  if (entry.code !== cleanOtp) {
    const err = { 
      success: false, 
      error: 'Invalid OTP code. Please check your Gmail and enter the exact 6-digit code.' 
    };
    if (res && res.status) return res.status(400).json(err);
    return new Response(JSON.stringify(err), { status: 400 });
  }

  // OTP is valid! Consume it so it cannot be re-used
  activeOtpStore.delete(cleanEmail);

  const ok = { success: true, verified: true, email: cleanEmail };
  if (res && res.status) return res.status(200).json(ok);
  return new Response(JSON.stringify(ok), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
