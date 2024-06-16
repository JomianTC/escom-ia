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

self.addEventListener('fetch', (event) => {
  const request = event.request

  // Ignorar las peticiones a los datos de Axios y avataaars.io
  if (request.url.includes('https://avataaars.io/')) {
    return
  }

  // Indicamos que nosotros queremos dar respuesta a esa petición
  event.respondWith(
    // Intentar obtener la respuesta de la red
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fetch(request)
      .then(response => {
        // Si la respuesta es válida, almacenarla en la caché y devolverla
        if (request.method === 'GET' && response.status === 200) {
          const clonedResponse = response.clone()
          void caches.open(staticCacheName).then(cache => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            void cache.put(request.url, clonedResponse)
          })
        }
        return response
      })
      .catch(async () => {
        // Si la red falla, intentar obtener la respuesta de la caché
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return await caches.match(request)
      })
  )
})
self.addEventListener('notificationclick', (event) => {
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
