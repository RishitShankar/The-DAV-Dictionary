/**
 * DAV Digital Focus OS - Android Device Administrator & Package Restriction Service
 * Simulates low-level Android 14 DevicePolicyManager, UsageStatsManager,
 * AccessibilityService, and NotificationListenerService interfaces for the DAV APK.
 */

export const DEVICE_POLICY_CONSTANTS = {
  PERMISSION_GRANTED: 'PERMISSION_GRANTED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  ADMIN_ACTIVE: 'ADMIN_ACTIVE',
  USAGE_ACCESS_ACTIVE: 'USAGE_ACCESS_ACTIVE',
  OVERLAY_PERMISSION_ACTIVE: 'OVERLAY_PERMISSION_ACTIVE',
  ACCESSIBILITY_SERVICE_ACTIVE: 'ACCESSIBILITY_SERVICE_ACTIVE',
  NOTIFICATION_LISTENER_ACTIVE: 'NOTIFICATION_LISTENER_ACTIVE'
};

export const ANDROID_PACKAGE_MAP = {
  YOUTUBE: 'com.google.android.youtube',
  CHROME: 'com.android.chrome',
  INSTAGRAM: 'com.instagram.android',
  WHATSAPP: 'com.whatsapp',
  FACEBOOK: 'com.facebook.katana',
  SNAPCHAT: 'com.snapchat.android',
  FLIPKART: 'com.flipkart.android',
  AMAZON: 'in.amazon.mShop.android.shopping',
  CHESS: 'com.chess',
  JIOHOTSTAR: 'in.startv.hotstar',
  MEESHO: 'com.meesho.supply',
  SOULED_STORE: 'com.thesouledstore'
};

class RegainDeviceAdminService {
  constructor() {
    this.storageKey = 'dav_device_admin_security_v2';
    this.permissions = this.loadPermissions();
    this.activeRestrictions = new Set();
    this.subscribers = new Set();
  }

  loadPermissions() {
    const defaultPerms = {
      isDeviceAdminActive: true,
      hasUsageStatsAccess: true,
      hasOverlayPermission: true,
      hasAccessibilityService: true,
      hasNotificationListenerAccess: true,
      batteryOptimizationIgnored: true,
      knoxContainerSimulated: true,
      tamperAttemptsCount: 0,
      emergencyUnlockCooldownExpiry: null,
      registeredLockTasks: [
        ANDROID_PACKAGE_MAP.YOUTUBE,
        ANDROID_PACKAGE_MAP.INSTAGRAM,
        ANDROID_PACKAGE_MAP.SNAPCHAT,
        ANDROID_PACKAGE_MAP.FACEBOOK
      ]
    };

    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return defaultPerms;
      return { ...defaultPerms, ...JSON.parse(saved) };
    } catch (e) {
      return defaultPerms;
    }
  }

  savePermissions() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.permissions));
    } catch (e) {}
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(event, payload) {
    this.subscribers.forEach(cb => {
      try {
        cb(event, payload);
      } catch (e) {}
    });
  }

  checkAllPermissionsStatus() {
    return {
      allGranted:
        this.permissions.isDeviceAdminActive &&
        this.permissions.hasUsageStatsAccess &&
        this.permissions.hasOverlayPermission &&
        this.permissions.hasAccessibilityService &&
        this.permissions.hasNotificationListenerAccess,
      details: [
        {
          id: 'admin',
          label: 'Device Administrator Policy',
          description: 'Prevents unauthorized uninstallation and settings bypass',
          status: this.permissions.isDeviceAdminActive ? 'Active' : 'Missing',
          required: true
        },
        {
          id: 'usage',
          label: 'Usage Stats Telemetry Access',
          description: 'Allows millisecond tracking of app screen time',
          status: this.permissions.hasUsageStatsAccess ? 'Active' : 'Missing',
          required: true
        },
        {
          id: 'overlay',
          label: 'Draw Over Other Apps (Overlay)',
          description: 'Renders the BrainPal HUD and friction countdowns',
          status: this.permissions.hasOverlayPermission ? 'Active' : 'Missing',
          required: true
        },
        {
          id: 'accessibility',
          label: 'Accessibility Service Interceptor',
          description: 'Detects short-form video vertical swipes on YouTube & Reels',
          status: this.permissions.hasAccessibilityService ? 'Active' : 'Missing',
          required: true
        },
        {
          id: 'notifications',
          label: 'Notification Listener Protocol',
          description: 'Silently vaults alerts during study blocks',
          status: this.permissions.hasNotificationListenerAccess ? 'Active' : 'Missing',
          required: true
        }
      ]
    };
  }

  simulatePackageLaunch(packageName) {
    // Check if package is under active lock or limit
    const isRestricted = this.permissions.registeredLockTasks.includes(packageName);
    if (!isRestricted) {
      return { allowed: true, reason: 'unrestricted' };
    }

    // Trigger overlay interception event
    this.notify('app_interception_triggered', {
      packageName,
      timestamp: Date.now()
    });

    return {
      allowed: false,
      reason: 'strict_study_lock_active',
      packageName
    };
  }

  addLockTask(packageName) {
    if (!this.permissions.registeredLockTasks.includes(packageName)) {
      this.permissions.registeredLockTasks.push(packageName);
      this.savePermissions();
      this.notify('lock_tasks_updated', this.permissions.registeredLockTasks);
    }
  }

  removeLockTask(packageName) {
    this.permissions.registeredLockTasks = this.permissions.registeredLockTasks.filter(
      p => p !== packageName
    );
    this.savePermissions();
    this.notify('lock_tasks_updated', this.permissions.registeredLockTasks);
  }

  recordTamperAttempt(attemptType) {
    this.permissions.tamperAttemptsCount += 1;
    this.savePermissions();
    this.notify('tamper_attempt_logged', {
      type: attemptType,
      count: this.permissions.tamperAttemptsCount,
      timestamp: new Date().toISOString()
    });
  }

  requestEmergencyBypass(providedPin) {
    if (providedPin === '2026') {
      const expiry = Date.now() + 60 * 60 * 1000; // 1 hour bypass
      this.permissions.emergencyUnlockCooldownExpiry = expiry;
      this.savePermissions();
      this.notify('emergency_bypass_granted', { expiry });
      return { success: true, expiry };
    }
    this.recordTamperAttempt('invalid_pin_entry');
    return { success: false, error: 'invalid_security_pin' };
  }
}

export const regainDeviceAdmin = new RegainDeviceAdminService();
