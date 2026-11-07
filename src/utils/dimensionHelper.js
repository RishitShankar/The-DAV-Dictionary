/**
 * DAV Smart Portal - Advanced Dimension & Platform Architecture
 * 
 * Dimensions Matrix:
 * - Super Dimension 1: PC Website
 * - Super Dimension 2: Mobile Website
 * - Super Dimension 3: Android Native APK
 * 
 * Ultra Dimensions:
 * - Ultra Super Dimension 1: PC Platform (Super Dimension 1)
 * - Ultra Super Dimension 2: Mobile Unified Platform (Super Dimension 2 + Super Dimension 3)
 */

export function detectPlatformDimensions() {
  if (typeof window === 'undefined') {
    return {
      superDimension: 1,
      superDimensionName: 'Super Dimension 1: PC Website',
      ultraDimension: 1,
      ultraDimensionName: 'Ultra Super Dimension 1: PC Platform',
      isApk: false,
      isMobile: false,
      isPc: true
    };
  }

  const ua = navigator.userAgent || '';
  const isApk = ua.includes('DAVSmartPortalApp') || 
                window.isAndroidApk === true || 
                window.location.host.includes('appassets') ||
                window.location.protocol === 'file:' ||
                window.location.origin.includes('appassets.androidplatform.net');

  const isMobileScreen = window.innerWidth <= 768 || 
                        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  let superDim = 1;
  let superDimName = 'Super Dimension 1: PC Website';

  if (isApk) {
    superDim = 3;
    superDimName = 'Super Dimension 3: Android APK';
  } else if (isMobileScreen) {
    superDim = 2;
    superDimName = 'Super Dimension 2: Mobile Website';
  }

  const ultraDim = superDim === 1 ? 1 : 2;
  const ultraDimName = ultraDim === 1 
    ? 'Ultra Super Dimension 1: PC Platform' 
    : 'Ultra Super Dimension 2: Mobile Unified Platform';

  return {
    superDimension: superDim,
    superDimensionName: superDimName,
    ultraDimension: ultraDim,
    ultraDimensionName: ultraDimName,
    isApk: superDim === 3,
    isMobile: ultraDim === 2,
    isPc: ultraDim === 1
  };
}

// Automatically expose to window for background diagnostic logging without disrupting UI
if (typeof window !== 'undefined') {
  try {
    window.__DAV_DIMENSIONS__ = detectPlatformDimensions();
  } catch (e) {}
}

export default detectPlatformDimensions;
