/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ExpirationPlugin } from 'workbox-expiration'
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
precacheAndRoute(self.__WB_MANIFEST || [])

registerRoute(
  ({ request }) => request.mode === 'navigate',
  createHandlerBoundToURL('/index.html')
)

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/teacher'),
  new StaleWhileRevalidate({
    cacheName: 'api-teacher-cache',
    cacheabkeResponse: { statuses: [0, 200] },
    plugins: [new ExpirationPlugin({ maxEntries: 50 })]
  })
)

// eslint-disable-next-line no-void
self.addEventListener('install', () => void self.skipWaiting())
// eslint-disable-next-line no-void
self.addEventListener('activate', () => void self.clients.claim())

self.addEventListener('notificationclick', (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.tag))
  event.notification.close()
})
