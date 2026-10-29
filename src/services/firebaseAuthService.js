import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// User's official Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyAS_qK_q6FOpLJP722mKpNb645pGnjPTJc",
  authDomain: "dav-dictionary-67711.firebaseapp.com",
  projectId: "dav-dictionary-67711",
  storageBucket: "dav-dictionary-67711.firebasestorage.app",
  messagingSenderId: "542707810777",
  appId: "1:542707810777:web:78ddcd09f69a887fcc19c8",
  measurementId: "G-HB1887Q9YL"
};

// Singleton Firebase initialization
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseApp);

const TRACKER_KEY = 'dav_firebase_daily_sms_quota';
const DAILY_MAX_SMS = 10;

/**
 * Get current date key in YYYY-MM-DD format (IST / Local)
 */
function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Retrieve current daily tracker state, resetting automatically if new day
 */
export function getDailySmsQuotaState() {
  const today = getTodayDateKey();
  try {
    const raw = localStorage.getItem(TRACKER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === today) {
        return {
          date: today,
          count: Number(parsed.count || 0),
          requestedNumbers: Array.isArray(parsed.requestedNumbers) ? parsed.requestedNumbers : []
        };
      }
    }
  } catch (e) {}

  // New day or uninitialized: reset quota to 0
  const fresh = {
    date: today,
    count: 0,
    requestedNumbers: []
  };
  try {
    localStorage.setItem(TRACKER_KEY, JSON.stringify(fresh));
  } catch (e) {}
  return fresh;
}

/**
 * Update daily tracker state
 */
function recordDispatchedSms(digits) {
  const current = getDailySmsQuotaState();
  const updated = {
    date: current.date,
    count: current.count + 1,
    requestedNumbers: Array.from(new Set([...current.requestedNumbers, digits]))
  };
  try {
    localStorage.setItem(TRACKER_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

/**
 * Check if a number or the portal has exceeded daily OTP limits
 */
export function checkSmsAvailability(phone) {
  const digits = String(phone || '').replace(/[^0-9]/g, '').slice(-10);
  const state = getDailySmsQuotaState();

  // 1. Check if the global limit of 10 SMS per day is exhausted
  if (state.count >= DAILY_MAX_SMS) {
    return {
      allowed: false,
      reason: 'global_limit_reached',
      message: `Daily mobile SMS limit (${DAILY_MAX_SMS}/${DAILY_MAX_SMS}) reached for today. The quota resets tonight at midnight. Please sign in with your Google account.`,
      remaining: 0
    };
  }

  // 2. Check if this specific phone number already received its 1 daily OTP
  if (state.requestedNumbers.includes(digits)) {
    return {
      allowed: false,
      reason: 'per_user_limit_reached',
      message: 'You have already requested your 1 daily SMS OTP for today. Please enter the code sent to your mobile or try again tomorrow.',
      remaining: Math.max(0, DAILY_MAX_SMS - state.count)
    };
  }

  return {
    allowed: true,
    remaining: Math.max(0, DAILY_MAX_SMS - state.count)
  };
}

let activeRecaptchaVerifier = null;
let activeConfirmationResult = null;

/**
 * Initialize reCAPTCHA verifier for Firebase Phone Auth
 */
function setupRecaptcha(containerId = 'firebase-recaptcha-container') {
  if (typeof window === 'undefined') return null;

  try {
    if (activeRecaptchaVerifier) {
      try {
        activeRecaptchaVerifier.clear();
      } catch (e) {}
    }

    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }

    activeRecaptchaVerifier = new RecaptchaVerifier(firebaseAuth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved - allow signInWithPhoneNumber
      },
      'expired-callback': () => {
        // Reset reCAPTCHA if expired
        try {
          activeRecaptchaVerifier.render().then(widgetId => {
            if (window.grecaptcha) window.grecaptcha.reset(widgetId);
          });
        } catch (e) {}
      }
    });

    return activeRecaptchaVerifier;
  } catch (err) {
    console.error('Error creating RecaptchaVerifier:', err);
    return null;
  }
}

/**
 * Dispatch real Firebase SMS OTP with daily limits enforced
 */
export async function sendFirebasePhoneOtp(phone) {
  const digits = String(phone || '').replace(/[^0-9]/g, '').slice(-10);
  if (digits.length !== 10) {
    return { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
  }

  // Check rate limits
  const quotaCheck = checkSmsAvailability(digits);
  if (!quotaCheck.allowed) {
    return {
      success: false,
      limitReached: quotaCheck.reason === 'global_limit_reached',
      error: quotaCheck.message
    };
  }

  const formattedPhone = `+91${digits}`;

  try {
    const verifier = setupRecaptcha();
    if (!verifier) {
      return { success: false, error: 'Security verification (reCAPTCHA) initialization failed.' };
    }

    const confirmationResult = await signInWithPhoneNumber(firebaseAuth, formattedPhone, verifier);
    activeConfirmationResult = confirmationResult;
    window.__dav_confirmationResult = confirmationResult;

    // Record the dispatched SMS in the daily tracker
    recordDispatchedSms(digits);

    return {
      success: true,
      phone: formattedPhone,
      digits,
      remainingToday: Math.max(0, DAILY_MAX_SMS - (getDailySmsQuotaState().count))
    };
  } catch (error) {
    console.error('Firebase Phone Auth Error:', error);
    
    // Clear verifier on error so subsequent attempts can create fresh verifier
    if (activeRecaptchaVerifier) {
      try { activeRecaptchaVerifier.clear(); } catch (e) {}
      activeRecaptchaVerifier = null;
    }

    let userFriendlyError = error.message || 'Failed to dispatch SMS OTP.';
    if (error.code === 'auth/quota-exceeded' || error.message?.includes('quota')) {
      userFriendlyError = 'Firebase SMS daily quota reached. Please sign in with your Google account.';
    } else if (error.code === 'auth/too-many-requests') {
      userFriendlyError = 'Too many requests from this device. Please wait a few minutes or sign in with Google.';
    } else if (error.code === 'auth/invalid-phone-number') {
      userFriendlyError = 'The mobile number format is invalid. Please check the 10-digit number.';
    } else if (error.code === 'auth/captcha-check-failed') {
      userFriendlyError = 'reCAPTCHA verification failed. Please refresh and try again.';
    }

    return {
      success: false,
      error: userFriendlyError,
      code: error.code
    };
  }
}

/**
 * Verify Firebase 6-digit OTP code
 */
export async function verifyFirebasePhoneOtp(otpCode) {
  const cleanOtp = String(otpCode || '').trim();
  if (!cleanOtp || cleanOtp.length !== 6) {
    return { success: false, error: 'Please enter the 6-digit OTP code sent to your mobile.' };
  }

  const confirmation = activeConfirmationResult || window.__dav_confirmationResult;
  if (!confirmation) {
    return { success: false, error: 'No active OTP verification session found. Please request a new OTP code.' };
  }

  try {
    const userCredential = await confirmation.confirm(cleanOtp);
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    console.error('Firebase verify OTP error:', error);
    let userMsg = 'Invalid OTP code. Please enter the correct 6-digit code received on your phone.';
    if (error.code === 'auth/invalid-verification-code') {
      userMsg = 'Invalid verification code. Please check your SMS and enter the correct 6-digit code.';
    } else if (error.code === 'auth/code-expired') {
      userMsg = 'This OTP code has expired. Please request a new code.';
    }
    return {
      success: false,
      error: userMsg
    };
  }
}
