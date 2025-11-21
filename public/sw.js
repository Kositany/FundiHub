// FundiHub Service Worker
const CACHE_NAME = 'fundihub-v2.0.0'
const STATIC_CACHE = 'fundihub-static-v2.0.0'
const DYNAMIC_CACHE = 'fundihub-dynamic-v2.0.0'

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add critical CSS and JS files here when they're generated
]

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /^https:\/\/nyc\.cloud\.appwrite\.io\/v1\/account/,
  /^https:\/\/nyc\.cloud\.appwrite\.io\/v1\/databases/,
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS.filter(asset => asset !== '/'))
      })
      .catch(error => {
        console.warn('[SW] Failed to cache some static assets:', error)
      })
  )
  
  // Force activation
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  // Take control of all pages
  event.waitUntil(self.clients.claim())
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension requests
  if (request.url.startsWith('chrome-extension://')) {
    return
  }
  
  event.respondWith(
    handleFetch(request)
  )
})

async function handleFetch(request) {
  const url = new URL(request.url)
  
  try {
    // Handle different types of requests
    if (request.destination === 'document') {
      return await handleNavigationRequest(request)
    } else if (isAPIRequest(request)) {
      return await handleAPIRequest(request)
    } else if (isStaticAsset(request)) {
      return await handleStaticAsset(request)
    } else {
      return await handleDynamicRequest(request)
    }
  } catch (error) {
    console.warn('[SW] Fetch error:', error)
    return new Response('Network error', { status: 500 })
  }
}

// Handle navigation requests (HTML pages)
async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Ultimate fallback - serve app shell
    const appShell = await caches.match('/')
    if (appShell) {
      return appShell
    }
    
    // If nothing works, return offline page
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>FundiHub - Offline</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .offline { color: #666; }
          </style>
        </head>
        <body>
          <div class="offline">
            <h1>You're offline</h1>
            <p>Please check your internet connection and try again.</p>
            <button onclick="window.location.reload()">Retry</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
}

// Handle API requests
async function handleAPIRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful GET requests
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Fallback to cache for GET requests
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request)
      if (cachedResponse) {
        console.log('[SW] Serving API response from cache:', request.url)
        return cachedResponse
      }
    }
    
    throw error
  }
}

// Handle static assets
async function handleStaticAsset(request) {
  // Cache first strategy for static assets
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.warn('[SW] Failed to fetch static asset:', request.url)
    throw error
  }
}

// Handle dynamic requests
async function handleDynamicRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Helper functions
function isAPIRequest(request) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(request.url))
}

function isStaticAsset(request) {
  const url = new URL(request.url)
  return /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/.test(url.pathname)
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  console.log('[SW] Performing background sync...')
  // Implement retry logic for failed requests here
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received:', event)
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from FundiHub',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Open FundiHub',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('FundiHub', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event)
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Error handling
self.addEventListener('error', (event) => {
  console.error('[SW] Service worker error:', event.error)
})

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason)
})

console.log('[SW] Service worker loaded successfully')
