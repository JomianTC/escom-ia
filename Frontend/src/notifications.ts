import { toast } from 'react-toastify'
import { API_URLS, notificationClient } from './api'
import { urlB64ToUint8Array } from './utilities/key-formatter'
import { getLocalStorage } from './utilities/localStorage.utlity'

declare const self: ServiceWorkerGlobalScope
export async function requestPermission () {
  console.log('Requesting permission...')
  try {
    await navigator.permissions?.query({
      name: 'notifications'
    })
    console.log('Notification permission status:', navigator.permissions)
  } catch (e) {
    // Log error, but otherwise ignore.
    console.error(e)
  }
}

export async function showNotificationToUser (id: string) {
  console.log('Showing notification...')
  console.log('Objeto Navigator : ', navigator)
  console.log('ID del tramite', id)

  console.log(self)

  await Notification.requestPermission().then(async (result) => {
    if (result === 'granted') {
      await navigator.serviceWorker.ready.then(async (registration) => {
        // Mostrar anuncio de notificacion
        await registration.showNotification('Vibration Sample', {
          body: 'Obtendras notificaciones!',
          icon: '/icons/logo.webp'
        })
        // Obteniendo la VAPIDKEY para el dispositivo
        const vapidResponse = await notificationClient.get(API_URLS.notificationRoutes.getVapidKey, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
          }
        })
        const key: string = await vapidResponse.data.llave_publica ?? ''
        if (key === '') {
          toast.error('Error al hacer la suscripción')
          return
        }
        console.log('Vapid Key: ', key)
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(key)
        }).then(async (sub) => {
          toast.success('Subscribed')
          const response = await notificationClient.post(API_URLS.notificationRoutes.createProcedureSubscription + id, sub, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
            }
          })
          return response.data
        }).catch((error) => {
          console.error('Error al suscribirse', error)
          toast.error('Error al suscribirse')
        })
      })
    } else {
      toast.info('No se ha permitido las notificaciones')
    }
  })

  // Revisando si las notificaciones push están permitidas
  await navigator.serviceWorker.ready.then(async _registration => {
    console.log('Entro aqui')
    // // Obteniendo la VAPIDKEY para el dispositivo
    // const vapidResponse = await notificationClient.get(API_URLS.notificationRoutes.getVapidKey)
    // const key: string = await vapidResponse.data.llave_publica ?? ''
    // if (key === '') {
    //   toast.error('Error al hacer la suscripción')
    //   return
    // }
    // console.log('Vapid Key: ', key)
    // await registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: urlB64ToUint8Array(key)
    // }).then(async (sub) => {
    //   toast.success('Subscribed')
    //   const response = await notificationClient.post(API_URLS.notificationRoutes.createProcedureSubscription + id, sub)
    //   return response.data
    // }).catch((error) => {
    //   console.error('Error al suscribirse', error)
    //   toast.error('Error al suscribirse')
    // })
  }).catch((error) => {
    console.error('Error al obtener el registro del service worker', error)
    toast.error('Error al obtener el registro del service worker')
  })
}

// Respuesta
// {
//   "endpoint": "https://fcm.googleapis.com/fcm/send/ecHV0UU-BeQ:APA91bE-cPJKelMcMvz0YNqQvBqd424mPCbopF-3SygeIcZDIHeAhuHGsaKPVzNKIE46h2qHuE7ZPJb2zY_EOOwPTj2vU3udcvRr0QJrstjJWXxe1vewHkHEPIwF9DPLZbTGa2-V9JQ4",
//   "expirationTime": null,
//   "keys": {
//       "p256dh": "BJ3yGWgojP9YL24lwcO2GcY6r4mTJZIKr9mWM5WS1mgLdTtn0JJRvPLq-_AITo_DD80xYkxyfqYfJK7nlXume_4",
//       "auth": "HxA_zjEquOkaTmmVBr_rrA"
//   }
// }
