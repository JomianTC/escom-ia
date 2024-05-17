import { getLocalStorage } from '@/utilities/localStorage.utlity'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { API_URLS, notificationClient } from '../axios'
import { notificationsQueryKeys } from './notification-query'

export function useIsActive () {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: notificationsQueryKeys.detail(id ?? ''),
    queryFn: async () => {
      const token = getLocalStorage('token').value ?? ''
      const response = await notificationClient.get(API_URLS.notificationRoutes.getProcedureNotification + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token ?? ''
        }
      })
      const data = response.data
      return data
    }
  })

  return {
    data
  }
}
