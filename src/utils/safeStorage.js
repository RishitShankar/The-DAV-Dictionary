/**
 * Safe LocalStorage & Image Compression Manager
 * Prevents QuotaExceededError DOMException crashes on mobile and desktop browsers.
 */

const EXPENDABLE_STORAGE_KEYS = [
  'dav_uploaded_pdfs',
  'dav_attached_scanned_pyq_pdfs_v1',
  'dav_official_chapter_notes_v2',
  'dav_uploaded_pyqs_v2',
  'dav_uploaded_sample_papers_v2',
  'dav_active_call_signal_event',
  'dav_headchat_call_history'
];

/**
 * Detects if an error is a Storage Quota Exceeded error.
 */
export function isQuotaExceededError(err) {
  if (!err) return false;
  return (
    err.name === 'QuotaExceededError' ||
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    err.code === 22 ||
    err.code === 1014 ||
    err.number === -2146828281 ||
    String(err.message || '').toLowerCase().includes('quota') ||
    String(err).toLowerCase().includes('quota')
  );
}

/**
 * Emergency purge of large expendable caches to free up localStorage space.
 */
export function cleanupExpendableStorage() {
  try {
    EXPENDABLE_STORAGE_KEYS.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (e) {}
    });
  } catch (e) {}
}

/**
 * Ensures user object has lightweight avatar data before committing to localStorage.
 * If photoUrl/dp is a massive uncompressed data URL (> 45KB), it safely trims it.
 */
export function sanitizeUserForStorage(user) {
  if (!user || typeof user !== 'object') return user;
  const clone = { ...user };

  const MAX_PHOTO_BASE64_LEN = 45000; // ~33KB limit for stored profile pictures

  const checkAndTrim = (field) => {
    if (typeof clone[field] === 'string' && clone[field].startsWith('data:image')) {
      if (clone[field].length > MAX_PHOTO_BASE64_LEN) {
        // Strip oversized raw data URL from session storage to avoid quota crash
        clone[field] = null;
      }
    }
  };

  checkAndTrim('dp');
  checkAndTrim('avatar');
  checkAndTrim('photoUrl');
  checkAndTrim('photoURL');

  return clone;
}

/**
 * Safely persists 'dav_user' with bulletproof quota protection.
 * Will NEVER throw an uncaught exception to the ErrorBoundary.
 */
export function safeSetUser(user) {
  if (!user || user.plan === 'guest') {
    try {
      localStorage.removeItem('dav_user');
    } catch (e) {}
    return;
  }

  const sanitized = sanitizeUserForStorage(user);
  let payload = '';
  try {
    payload = JSON.stringify(sanitized);
  } catch (e) {
    return;
  }

  try {
    localStorage.setItem('dav_user', payload);
  } catch (err) {
    if (isQuotaExceededError(err)) {
      console.warn('Storage quota exceeded while saving dav_user. Performing emergency cleanup...');
      cleanupExpendableStorage();

      try {
        localStorage.setItem('dav_user', payload);
      } catch (retryErr) {
        // Ultimate fallback: save minimal user session credentials without any photos
        try {
          const minimalUser = {
            id: user.id,
            name: user.name,
            plan: user.plan,
            role: user.role,
            dimension: user.dimension,
            dimensionName: user.dimensionName,
            classNum: user.classNum,
            section: user.section,
            isAdmin: user.isAdmin,
            subject: user.subject,
            department: user.department,
            bio: user.bio
          };
          localStorage.setItem('dav_user', JSON.stringify(minimalUser));
        } catch (minErr) {
          console.error('Critical storage failure saving dav_user:', minErr);
        }
      }
    } else {
      console.warn('localStorage error setting dav_user:', err);
    }
  }
}

/**
 * Safe generic localStorage.setItem wrapper that handles QuotaExceededError gracefully.
 */
export function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    if (isQuotaExceededError(err)) {
      console.warn(`Storage quota exceeded for key "${key}". Freeing expendable storage...`);
      cleanupExpendableStorage();
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (retryErr) {
        console.warn(`Could not save key "${key}" even after cleanup:`, retryErr);
        return false;
      }
    }
    console.warn(`Failed to set item "${key}":`, err);
    return false;
  }
}

/**
 * Safe generic localStorage.getItem wrapper.
 */
export function safeGetItem(key, fallback = null) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch (err) {
    return fallback;
  }
}

/**
 * Compresses an image File or Blob to a lightweight base64 JPEG data URL
 * using an off-screen HTML5 Canvas. Max width/height default is 256px, quality 0.8.
 * Typically yields ~15-30KB, preventing QuotaExceededError permanently.
 */
export function compressImageFile(file, maxDim = 256, quality = 0.8) {
  return new Promise((resolve) => {
    if (!file) return resolve(null);

    // If already small (< 30KB) and is an image, we can still standardize or return directly
    const reader = new FileReader();
    reader.onerror = () => resolve(null);
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (!dataUrl) return resolve(null);

      const img = new Image();
      img.onerror = () => resolve(dataUrl); // Fallback to raw if decoding fails
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(dataUrl);

          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch (err) {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
