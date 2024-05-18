import { toast } from 'react-toastify'
import { API_URLS, notificationClient } from './api'
import { urlB64ToUint8Array } from './utilities/key-formatter'
import { getLocalStorage, setLocalStorage } from './utilities/localStorage.utlity'

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
  await Notification.requestPermission().then(async (result) => {
    if (result === 'granted') {
      await navigator.serviceWorker.ready.then(async (registration) => {
        // Mostrar anuncio de notificacion
        await registration.showNotification('Wohoo siempre enterado', {
          body: 'Obtendras notificaciones!',
          icon: '/icons/logo.webp'
        })
        // Revisando si tenemos una llave publica para el dispositivo
        const savedKey = getLocalStorage('vapid')

        if (savedKey.value === null) {
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
          setLocalStorage('vapid', key)
        }
        const key: string = getLocalStorage('vapid').value
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(key)
        }).then(async (sub) => {
          toast.success('Subscribed')
          try {
            const response = await notificationClient.post(API_URLS.notificationRoutes.createProcedureSubscription + id, sub, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
              }
            })
            return response.data
          } catch (error) {
            toast.info('Ya cuentas con una suscripción')
          }
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

  }).catch((error) => {
    console.error('Error al obtener el registro del service worker', error)
    toast.error('Error al obtener el registro del service worker')
  })
}
