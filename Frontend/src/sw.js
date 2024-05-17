/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
precacheAndRoute(self.__WB_MANIFEST || [])
// Archivos estaticos que queremos cachear
const staticCacheName = 'site-static'
const assets = [
  'https://fonts.googleapis.com/css2?family=Glory:ital,wght@0,100..800;1,100..800&family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap',
  'icons/logoCompleto.webp',
  'icons/home.webp',
  'icons/teachers.webp'
]

registerRoute(
  ({ request }) => request.mode === 'navigate',
  createHandlerBoundToURL('/index.html')
)

// registerRoute(
//   ({ url }) => url.pathname.startsWith('/api/teacher'),
//   new StaleWhileRevalidate({
//     cacheName: 'api-teacher-cache',
//     cacheabkeResponse: { statuses: [0, 200] },
//     plugins: [new ExpirationPlugin({ maxEntries: 50 })]
//   })
// )

// eslint-disable-next-line no-void
self.addEventListener('install', () => void self.skipWaiting())
// eslint-disable-next-line no-void
self.addEventListener('activate', async (event) => {
  event.waitUntil(caches.open(staticCacheName).then(cache => {
    console.log('caching shell assets')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    cache.addAll(assets).then(() => {
      console.log('shell assets cached')
    })
  }))
  return self.clients.claim()
})

// Revisando si tenemos los archivos en la cache
self.addEventListener('fetch', (event) => {
  const request = event.request

  // Ignorar las peticiones a los datos de Axios
  if (request.url.includes('/api/') || request.url.includes('https://avataaars.io/')) {
    return
  }

  // Indicamos que nosotros queremos dar respuesta a esa petición
  event.respondWith(
    // Si tenemos una respuesta en la cache la devolvemos
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    caches.match(request).then(async cacheRes => {
      // Si no hay una respuesta en caché, buscarla en la red
      if (!cacheRes) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        cacheRes = await fetch(request)
        if (
          request.method === 'GET' &&
          (request.headers.get('accept').includes('text/html') ||
            request.headers.get('accept').includes('image/') ||
            request.headers.get('accept').includes('application/javascript') ||
            request.headers.get('accept').includes('text/css'))
        ) {
          await caches.open(staticCacheName).then(cache => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            void cache.put(request.url, cacheRes.clone())
          })
        }
      }
      return cacheRes
    })
  )
})
self.addEventListener('notificationclick', (event) => {
  // console.log('Notification clicked')
  // console.log(event)
  event.waitUntil(self.clients.openWindow(event.notification.tag))
  event.notification.close()
})

self.addEventListener('notificationclick', (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.tag))
  event.notification.close()
})

self.addEventListener('push', function (event) {
  console.log('Notificacion Recibida')

  const data = event.data.json()

  self.registration.showNotification(data.title, {
    icon: '/icons/logo.webp',
    body: data.message,
    vibrate: [50, 100, 50, 100, 50, 100, 400, 100, 300, 100, 350, 50, 200, 100, 100, 50, 600]
  })
})
