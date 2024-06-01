import { showNotificationToUser } from '@/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { notificationsQueryKeys } from './notification-query'

export function useSubscribe () {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const subscribe = async () => {
    // await requestPermission()
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const response = await showNotificationToUser(id ?? '')
    console.log('Respuesta de la suscripción', response)
  }
  return useMutation({
    mutationFn: subscribe,
    onMutate: () => {
      // toast.info('Avisando...')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.detail(id ?? '')
      })
      toast.success('¡Listo! Ahora recibirás notificaciones')
    },
    onError: () => {
      toast.error('Oops hubo un error...')
    }
  })
}
