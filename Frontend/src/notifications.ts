import { toast } from 'react-toastify'
import { API_URLS, notificationClient } from './api'
import { urlB64ToUint8Array } from './utilities/key-formatter'
import { getLocalStorage, setLocalStorage } from './utilities/localStorage.utlity'

export async function requestPermission () {
  try {
    await Notification.requestPermission().then(async (result) => {
      if (result === 'granted') {
        await navigator.serviceWorker.ready.then(async (registration) => {
          // Mostrar anuncio de notificacion
          await registration.showNotification('Wohoo', {
            body: 'Obtendras notificaciones!',
            icon: '/icons/logo.webp'
          })
        })
      } else {
        toast.info('No se ha permitido las notificaciones')
      }
    })
  } catch (e) {
    // Log error, but otherwise ignore.
    console.error(e)
  }
}

export async function showNotificationToUser (id: string) {
  // Revisando si tenemos permisos
  const hasPermission = Notification.permission === 'granted'

  if (hasPermission) {
    await navigator.serviceWorker.ready.then(async (registration) => {
      // Revisando si tenemos una llave publica para el dispositivo
      const savedKey = getLocalStorage('vapid')
      // Revisando si tenemos una llave publica para el dispositivo
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
        toast.success('Te has suscrito correctamente')
        try {
          const response = await notificationClient.post(API_URLS.notificationRoutes.createProcedureSubscription + id, sub, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
            }
          })
          const multipleDevices = await notificationClient.post(API_URLS.notificationRoutes.checkDeviceNotification, sub, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
            }
          })
          console.log(multipleDevices)

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
    toast.info('No permitiste las notificaiones')
    await requestPermission()
  }
}
