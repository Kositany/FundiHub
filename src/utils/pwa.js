// PWA Utility Functions

/**
 * Check if the app is running as a PWA
 */
export function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true ||
         document.referrer.includes('android-app://');
}

/**
 * Check if the app is installable
 */
export function isInstallable() {
  return !isPWA() && 'serviceWorker' in navigator;
}

/**
 * Get device type for PWA features
 */
export function getDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }
  
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  
  if (/Windows Phone/i.test(userAgent)) {
    return 'windows';
  }
  
  return 'desktop';
}

/**
 * Check if device supports PWA installation
 */
export function supportsPWAInstall() {
  const device = getDeviceType();
  
  switch (device) {
    case 'ios':
      // iOS supports PWA via Safari Add to Home Screen
      return /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
    case 'android':
      // Android supports PWA installation natively
      return true;
    case 'desktop':
      // Desktop browsers support PWA installation
      return 'serviceWorker' in navigator;
    default:
      return false;
  }
}

/**
 * Get PWA install instructions based on device
 */
export function getPWAInstructions() {
  const device = getDeviceType();
  
  const instructions = {
    ios: [
      'Tap the Share button in Safari',
      'Scroll down and tap "Add to Home Screen"',
      'Tap "Add" to install FundiHub'
    ],
    android: [
      'Tap the menu button (⋮) in your browser',
      'Select "Add to Home screen" or "Install app"',
      'Tap "Install" to add FundiHub to your home screen'
    ],
    desktop: [
      'Click the install button in your browser\'s address bar',
      'Or use the menu option "Install FundiHub"',
      'Follow the prompts to install the app'
    ]
  };
  
  return instructions[device] || instructions.desktop;
}

/**
 * Track PWA events for analytics
 */
export function trackPWAEvent(eventName, data = {}) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'PWA',
      device_type: getDeviceType(),
      is_pwa: isPWA(),
      ...data
    });
  }
  
  // Console log for development
  if (import.meta.env.DEV) {
    console.log(`[PWA Analytics] ${eventName}:`, {
      device_type: getDeviceType(),
      is_pwa: isPWA(),
      ...data
    });
  }
}

/**
 * Handle PWA lifecycle events
 */
export function setupPWAEventListeners() {
  // Track PWA launch
  if (isPWA()) {
    trackPWAEvent('pwa_launch');
  }
  
  // Track PWA installation
  window.addEventListener('appinstalled', () => {
    trackPWAEvent('pwa_installed');
  });
  
  // Track beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    trackPWAEvent('pwa_installprompt_shown');
  });
  
  // Track visibility changes (PWA vs browser usage)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      trackPWAEvent('pwa_visibility_change', {
        visible: true,
        timestamp: Date.now()
      });
    }
  });
}

/**
 * Check for PWA updates
 */
export function checkForPWAUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.update();
        
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            trackPWAEvent('pwa_update_found');
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                trackPWAEvent('pwa_update_ready');
                
                // Notify user about update
                if (window.showPWAUpdateNotification) {
                  window.showPWAUpdateNotification();
                }
              }
            });
          }
        });
      }
    });
  }
}

/**
 * Handle PWA share functionality
 */
export async function sharePWA(shareData = {}) {
  const defaultShareData = {
    title: 'FundiHub - Find Trusted Fundis',
    text: 'Connect with verified fundis for all your home and business needs.',
    url: window.location.href
  };
  
  const dataToShare = { ...defaultShareData, ...shareData };
  
  if (navigator.share) {
    try {
      await navigator.share(dataToShare);
      trackPWAEvent('pwa_share_success');
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        trackPWAEvent('pwa_share_error', { error: error.message });
      }
      return false;
    }
  } else {
    // Fallback to copying URL
    try {
      await navigator.clipboard.writeText(dataToShare.url);
      trackPWAEvent('pwa_share_fallback');
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      trackPWAEvent('pwa_share_fallback_error', { error: error.message });
      return false;
    }
  }
}

/**
 * Get PWA display mode
 */
export function getPWADisplayMode() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  }
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui';
  }
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  return 'browser';
}

/**
 * Handle PWA orientation changes
 */
export function handlePWAOrientation() {
  const updateOrientation = () => {
    const orientation = screen.orientation?.type || 'unknown';
    trackPWAEvent('pwa_orientation_change', { orientation });
    
    // Update CSS custom properties for orientation
    document.documentElement.style.setProperty('--orientation', orientation);
  };
  
  if (screen.orientation) {
    screen.orientation.addEventListener('change', updateOrientation);
    updateOrientation(); // Initial call
  }
}

/**
 * Initialize PWA features
 */
export function initializePWA() {
  console.log('[PWA] Initializing PWA features...');
  
  // Set up event listeners
  setupPWAEventListeners();
  
  // Handle orientation
  handlePWAOrientation();
  
  // Check for updates periodically
  if (isPWA()) {
    setInterval(checkForPWAUpdates, 60000 * 30); // Check every 30 minutes
  }
  
  // Set PWA display mode as CSS class
  document.documentElement.classList.add(`display-${getPWADisplayMode()}`);
  
  // Set device type as CSS class
  document.documentElement.classList.add(`device-${getDeviceType()}`);
  
  console.log('[PWA] PWA features initialized');
}

/**
 * PWA status information
 */
export function getPWAStatus() {
  return {
    isPWA: isPWA(),
    isInstallable: isInstallable(),
    deviceType: getDeviceType(),
    displayMode: getPWADisplayMode(),
    supportsPWAInstall: supportsPWAInstall(),
    hasServiceWorker: 'serviceWorker' in navigator,
    isOnline: navigator.onLine
  };
}
