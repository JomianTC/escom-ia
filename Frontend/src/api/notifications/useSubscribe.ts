import { requestPermission, showNotificationToUser } from '@/notifications'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export function useSubscribe () {
  const { id } = useParams()
  const subscribe = async () => {
    await requestPermission()
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const response = await showNotificationToUser(id ?? '')
    console.log('Respuesta de la suscripción', response)
  }
  return useMutation({
    mutationFn: subscribe,
    onMutate: () => {
      // toast.info('Avisando...')
    },
    onSuccess: () => {
      toast.success('¡Listo! Ahora recibirás notificaciones')
    },
    onError: () => {
      toast.error('Oops hubo un error...')
    }
  })
}
