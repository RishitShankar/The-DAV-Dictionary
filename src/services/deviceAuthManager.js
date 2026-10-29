import { getSupabaseClient } from './supabaseClient';

const DEVICE_ID_KEY = 'dav_device_fingerprint_id';
const LOCAL_SESSION_KEY = 'dav_active_device_session';
const SESSION_BOOK_TITLE = 'ACTIVE_DEVICE_SESSION';
const HEARTBEAT_INTERVAL_MS = 30000; // 30 seconds
const SESSION_STALE_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes of no heartbeat considered stale

let heartbeatTimer = null;
let realtimeChannel = null;
let broadcastChannel = null;

/**
 * Get or generate persistent unique Device Identifier for this browser/device
 */
export function getDeviceId() {
  if (typeof window === 'undefined') return 'server_device';
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      const randPart = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID().slice(0, 12)
        : Math.random().toString(36).substring(2, 14);
      id = `dav_dev_${Date.now().toString(36)}_${randPart}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch (e) {
    return `dav_dev_fallback_${Date.now()}`;
  }
}

/**
 * Detect client device metadata (OS, Browser, Device Type, Screen Resolution)
 */
export function getDeviceMetadata() {
  if (typeof window === 'undefined') {
    return {
      deviceId: 'server',
      deviceName: 'Unknown Server',
      deviceCategory: 'Server',
      os: 'Unknown',
      browser: 'Unknown'
    };
  }

  const ua = navigator.userAgent || '';
  let os = 'Unknown OS';
  if (/windows phone/i.test(ua)) os = 'Windows Phone';
  else if (/win/i.test(ua)) os = 'Windows PC';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/ipad/i.test(ua)) os = 'iPad iOS';
  else if (/iphone|ipod/i.test(ua)) os = 'iPhone iOS';
  else if (/mac/i.test(ua)) os = 'macOS Mac';
  else if (/cros/i.test(ua)) os = 'Chrome OS';
  else if (/linux/i.test(ua)) os = 'Linux PC';

  let browser = 'Unknown Browser';
  if (/edg/i.test(ua)) browser = 'Microsoft Edge';
  else if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua)) browser = 'Google Chrome';
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = 'Apple Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Mozilla Firefox';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';
  else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet';

  const isMobile = /mobile|iphone|android|touch/i.test(ua);
  const isTablet = /ipad|tablet/i.test(ua) || (isMobile && window.innerWidth >= 768);
  const deviceCategory = isTablet ? 'Tablet' : isMobile ? 'Mobile Phone' : 'Desktop PC';

  const deviceName = `${os} (${browser})`;
  const deviceId = getDeviceId();

  return {
    deviceId,
    deviceName,
    deviceCategory,
    os,
    browser,
    screenResolution: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    userAgent: ua.slice(0, 150)
  };
}

/**
 * Determine maximum allowed devices for account tier:
 * Normal = 1 device | VIP = 2 devices | Double VIP (VVIP) = 3 devices
 */
export function getMaxDevicesForUser(user) {
  // Strict "One Man, One Account, One Device" rule:
  // Every user, including VIP and Double VIP, is strictly locked to 1 device.
  return 1;
}

/**
 * Check if account is currently active on another device in Supabase Cloud
 */
export async function checkDeviceSession(userId, currentUserObj = null) {
  if (!userId || userId === 'guest_student') {
    return { allowed: true, isSameDevice: true, currentActiveSession: null };
  }

  const currentDeviceId = getDeviceId();
  const normalizedUid = String(userId).trim().toLowerCase();
  const client = getSupabaseClient();
  const maxAllowed = getMaxDevicesForUser(currentUserObj);

  // If Supabase not reachable, check local storage
  if (!client) {
    try {
      const local = localStorage.getItem(LOCAL_SESSION_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        const activeDevices = Array.isArray(parsed.activeDevices) ? parsed.activeDevices : [parsed.deviceId];
        if (activeDevices.includes(currentDeviceId)) {
          return { allowed: true, isSameDevice: true, currentActiveSession: parsed };
        }
        if (parsed.userId?.toLowerCase() === normalizedUid && activeDevices.length >= maxAllowed) {
          return {
            allowed: false,
            isSameDevice: false,
            currentActiveSession: parsed,
            conflictDevice: parsed.deviceMetadata || { deviceName: 'Another Browser' }
          };
        }
      }
    } catch (e) {}
    return { allowed: true, isSameDevice: true, currentActiveSession: null };
  }

  try {
    const { data, error } = await client
      .from('dav_pdf_annotations')
      .select('canvas_data, updated_at')
      .eq('user_id', normalizedUid)
      .eq('book_title', SESSION_BOOK_TITLE)
      .maybeSingle();

    if (error || !data?.canvas_data) {
      return { allowed: true, isSameDevice: true, currentActiveSession: null };
    }

    let activeSession = null;
    try {
      activeSession = JSON.parse(data.canvas_data);
    } catch (parseErr) {
      return { allowed: true, isSameDevice: true, currentActiveSession: null };
    }

    if (!activeSession || activeSession.status !== 'active') {
      return { allowed: true, isSameDevice: true, currentActiveSession: null };
    }

    const activeDevicesList = Array.isArray(activeSession.activeDevices) 
      ? activeSession.activeDevices 
      : (activeSession.deviceId ? [activeSession.deviceId] : []);

    // Check if it's already one of the authorized devices
    if (activeDevicesList.includes(currentDeviceId) || activeSession.deviceId === currentDeviceId) {
      return {
        allowed: true,
        isSameDevice: true,
        currentActiveSession: activeSession
      };
    }

    // Different device: check if session is stale (abandoned without logout > 20 mins)
    const timeSinceHeartbeat = Date.now() - (activeSession.lastActiveAt || 0);
    const isStale = timeSinceHeartbeat > SESSION_STALE_TIMEOUT_MS;

    if (isStale) {
      return {
        allowed: true,
        isSameDevice: false,
        wasStale: true,
        currentActiveSession: activeSession
      };
    }

    // Allow multiple devices if under the user's tier limit (Normal: 1, VIP: 2, Double VIP: 3)
    const sessionTierLimit = getMaxDevicesForUser(activeSession);
    const effectiveLimit = Math.max(maxAllowed, sessionTierLimit);

    if (activeDevicesList.length < effectiveLimit) {
      return {
        allowed: true,
        isSameDevice: false,
        currentActiveSession: activeSession
      };
    }

    // Active conflict! Exceeds tier limit
    return {
      allowed: false,
      isSameDevice: false,
      currentActiveSession: activeSession,
      conflictDevice: activeSession.deviceMetadata || { deviceName: 'Another Device' },
      lastActiveMinutesAgo: Math.max(1, Math.round(timeSinceHeartbeat / 60000))
    };
  } catch (err) {
    console.error('checkDeviceSession error:', err);
    return { allowed: true, isSameDevice: true, currentActiveSession: null };
  }
}

/**
 * Register current device as the single active device for this user
 */
export async function registerDeviceSession(user, forceTakeover = false) {
  if (!user || !user.id || user.id === 'guest_student') {
    return { success: true };
  }

  const normalizedUid = String(user.id).trim().toLowerCase();
  const currentDeviceId = getDeviceId();
  const metadata = getDeviceMetadata();
  const client = getSupabaseClient();

  const maxAllowed = getMaxDevicesForUser(user);
  let existingDevices = [currentDeviceId];
  try {
    const local = localStorage.getItem(LOCAL_SESSION_KEY);
    if (local) {
      const p = JSON.parse(local);
      if (p.userId === normalizedUid && Array.isArray(p.activeDevices)) {
        existingDevices = Array.from(new Set([currentDeviceId, ...p.activeDevices])).slice(0, maxAllowed);
      }
    }
  } catch (e) {}

  const sessionData = {
    userId: normalizedUid,
    originalId: user.id,
    userName: user.name || user.fullName || user.id,
    role: user.role || 'Student',
    plan: user.plan || 'normal',
    dimension: user.dimension || 1,
    isDoubleVip: Boolean(user.plan === 'vvip' || user.dimension === 3),
    isVip: Boolean(user.plan === 'vip' || user.dimension === 2 || user.plan === 'vvip' || user.dimension === 3),
    deviceId: currentDeviceId,
    activeDevices: forceTakeover ? [currentDeviceId] : existingDevices,
    maxDevicesAllowed: maxAllowed,
    deviceMetadata: metadata,
    loginAt: Date.now(),
    lastActiveAt: Date.now(),
    status: 'active'
  };

  // 1. Notify local BroadcastChannel if taking over
  try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (!broadcastChannel) {
        broadcastChannel = new BroadcastChannel('dav_device_session_sync');
      }
      broadcastChannel.postMessage({
        type: 'DEVICE_SESSION_REGISTERED',
        userId: normalizedUid,
        deviceId: currentDeviceId,
        forceTakeover
      });
    }
  } catch (e) {}

  // 2. Save locally
  try {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionData));
  } catch (e) {}

  // 3. Upsert to Supabase Cloud
  if (client) {
    try {
      const row = {
        user_id: normalizedUid,
        book_title: SESSION_BOOK_TITLE,
        page_number: 1,
        canvas_data: JSON.stringify(sessionData),
        notes: [],
        updated_at: new Date().toISOString()
      };
      await client
        .from('dav_pdf_annotations')
        .upsert(row, { onConflict: 'user_id,book_title,page_number' });
    } catch (e) {
      console.warn('registerDeviceSession cloud upsert warning:', e);
    }
  }

  // 4. Start heartbeat timer
  startHeartbeat(normalizedUid);

  return { success: true, session: sessionData };
}

/**
 * Start periodic heartbeat to signal that this device is actively online
 */
function startHeartbeat(normalizedUid) {
  stopHeartbeat();
  heartbeatTimer = setInterval(async () => {
    try {
      const client = getSupabaseClient();
      const currentDeviceId = getDeviceId();
      const metadata = getDeviceMetadata();

      const updatedSession = {
        userId: normalizedUid,
        deviceId: currentDeviceId,
        deviceMetadata: metadata,
        lastActiveAt: Date.now(),
        status: 'active'
      };

      // Update local storage
      try {
        const local = localStorage.getItem(LOCAL_SESSION_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          parsed.lastActiveAt = Date.now();
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(parsed));
        }
      } catch (e) {}

      // Update cloud database
      if (client) {
        const { data } = await client
          .from('dav_pdf_annotations')
          .select('canvas_data')
          .eq('user_id', normalizedUid)
          .eq('book_title', SESSION_BOOK_TITLE)
          .maybeSingle();

        if (data?.canvas_data) {
          const existing = JSON.parse(data.canvas_data);
          // Only update if WE are still the active device
          if (existing.deviceId === currentDeviceId) {
            existing.lastActiveAt = Date.now();
            await client
              .from('dav_pdf_annotations')
              .upsert({
                user_id: normalizedUid,
                book_title: SESSION_BOOK_TITLE,
                page_number: 1,
                canvas_data: JSON.stringify(existing),
                notes: [],
                updated_at: new Date().toISOString()
              }, { onConflict: 'user_id,book_title,page_number' });
          }
        }
      }
    } catch (err) {
      // Quiet fail on network blip
    }
  }, HEARTBEAT_INTERVAL_MS);
}

function stopHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

/**
 * Release this device on logout.
 * Clears the cloud session so the account is free to log in on any device,
 * and clears local session so another student can log in on this device.
 */
export async function releaseDeviceSession(userId) {
  stopHeartbeat();
  stopDeviceGuard();

  const normalizedUid = userId ? String(userId).trim().toLowerCase() : null;
  const currentDeviceId = getDeviceId();

  // 1. Broadcast session release to other tabs/windows
  try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (!broadcastChannel) {
        broadcastChannel = new BroadcastChannel('dav_device_session_sync');
      }
      broadcastChannel.postMessage({
        type: 'DEVICE_SESSION_RELEASED',
        userId: normalizedUid,
        deviceId: currentDeviceId
      });
    }
  } catch (e) {}

  // 2. Remove local device session
  try {
    localStorage.removeItem(LOCAL_SESSION_KEY);
  } catch (e) {}

  // 3. Remove cloud session from Supabase
  if (normalizedUid) {
    const client = getSupabaseClient();
    if (client) {
      try {
        // First check if the session in cloud belongs to this device before deleting
        const { data } = await client
          .from('dav_pdf_annotations')
          .select('canvas_data')
          .eq('user_id', normalizedUid)
          .eq('book_title', SESSION_BOOK_TITLE)
          .maybeSingle();

        if (data?.canvas_data) {
          const existing = JSON.parse(data.canvas_data);
          if (existing.deviceId === currentDeviceId) {
            await client
              .from('dav_pdf_annotations')
              .delete()
              .eq('user_id', normalizedUid)
              .eq('book_title', SESSION_BOOK_TITLE);
          }
        }
      } catch (e) {
        console.warn('releaseDeviceSession cloud delete warning:', e);
      }
    }
  }

  return true;
}

/**
 * Guard that runs while user is logged in.
 * Listens for remote device logins or session invalidations.
 * If another device logs in with this account, onForceLoggedOut is triggered immediately!
 */
export function startDeviceGuard(user, onForceLoggedOut) {
  if (!user || !user.id || user.id === 'guest_student' || typeof onForceLoggedOut !== 'function') {
    return () => {};
  }

  const normalizedUid = String(user.id).trim().toLowerCase();
  const currentDeviceId = getDeviceId();
  const client = getSupabaseClient();

  // 1. Listen via BroadcastChannel (Intra-device / cross-tab)
  try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (!broadcastChannel) {
        broadcastChannel = new BroadcastChannel('dav_device_session_sync');
      }
      broadcastChannel.onmessage = (event) => {
        const msg = event.data;
        if (!msg) return;
        if (msg.type === 'DEVICE_SESSION_REGISTERED' && msg.userId === normalizedUid && msg.deviceId !== currentDeviceId) {
          onForceLoggedOut({
            reason: 'ANOTHER_DEVICE_LOGGED_IN',
            message: 'Your account was accessed from another tab or browser on this computer.'
          });
        }
      };
    }
  } catch (e) {}

  // 2. Listen via Supabase Postgres Changes (Cross-device, real-time anywhere in the world)
  if (client) {
    try {
      realtimeChannel = client
        .channel(`dav_device_guard_${normalizedUid}_${Date.now()}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'dav_pdf_annotations',
            filter: `user_id=eq.${normalizedUid}`
          },
          (payload) => {
            if (payload.new && payload.new.book_title === SESSION_BOOK_TITLE && payload.new.canvas_data) {
              try {
                const session = JSON.parse(payload.new.canvas_data);
                // If another device registered
                if (session.deviceId && session.deviceId !== currentDeviceId) {
                  onForceLoggedOut({
                    reason: 'ANOTHER_DEVICE_LOGGED_IN',
                    conflictDevice: session.deviceMetadata,
                    message: `Your account was logged in from another device (${session.deviceMetadata?.deviceName || 'New Device'}). Under DAV's One Man, One Device policy, this session has ended.`
                  });
                }
              } catch (e) {}
            } else if (payload.eventType === 'DELETE') {
              // Session was remotely terminated
              onForceLoggedOut({
                reason: 'SESSION_TERMINATED',
                message: 'Your session was logged out remotely. Please log in again to continue.'
              });
            }
          }
        )
        .subscribe();
    } catch (e) {
      console.warn('realtimeChannel subscribe warning:', e);
    }
  }

  // 3. Periodic verification poll (every 25 seconds) as fallback
  const verifyTimer = setInterval(async () => {
    try {
      const status = await checkDeviceSession(normalizedUid);
      if (!status.allowed && !status.isSameDevice) {
        clearInterval(verifyTimer);
        onForceLoggedOut({
          reason: 'ANOTHER_DEVICE_LOGGED_IN',
          conflictDevice: status.conflictDevice,
          message: `Your account is active on another device (${status.conflictDevice?.deviceName || 'Other Device'}). Under DAV's One Man, One Device policy, this session has ended.`
        });
      }
    } catch (e) {}
  }, 25000);

  // Return unsubscribe cleanup function
  return () => {
    clearInterval(verifyTimer);
    stopDeviceGuard();
  };
}

export function stopDeviceGuard() {
  if (realtimeChannel && typeof getSupabaseClient === 'function') {
    try {
      const client = getSupabaseClient();
      if (client) client.removeChannel(realtimeChannel);
    } catch (e) {}
    realtimeChannel = null;
  }
}

/**
 * Fetch all currently active device sessions (for Admin Rishit Shankar in Admin Panel)
 */
export async function fetchAllActiveDeviceSessions() {
  const client = getSupabaseClient();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('dav_pdf_annotations')
      .select('user_id, canvas_data, updated_at')
      .eq('book_title', SESSION_BOOK_TITLE);

    if (error || !data) return [];

    return data
      .map(row => {
        try {
          return {
            ...JSON.parse(row.canvas_data),
            updatedAt: row.updated_at
          };
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}

/**
 * Terminate a student's session remotely (Admin power)
 */
export async function adminTerminateDeviceSession(userId) {
  const client = getSupabaseClient();
  if (!client || !userId) return false;
  try {
    const normalizedUid = String(userId).trim().toLowerCase();
    const { error } = await client
      .from('dav_pdf_annotations')
      .delete()
      .eq('user_id', normalizedUid)
      .eq('book_title', SESSION_BOOK_TITLE);
    return !error;
  } catch (e) {
    return false;
  }
}
