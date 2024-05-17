import { useQuery } from '@tanstack/react-query'
import { API_URLS, commentsClient } from '../axios'
import { commentsQueryKeys } from './comments-query-keys'
import { getLocalStorage } from '@/utilities/localStorage.utlity'
async function getComments () {
  const token = getLocalStorage('token').value ?? ''
  commentsClient.defaults.headers.common.Authorization = `Bearer ${token}`
  try {
    const response = await commentsClient.post(API_URLS.commentsClient.getUserComments)
    return response.data
  } catch (error) {
    console.error(error)
    return {
      comentarios: [],
      total: 0
    }
  }
}
export function useGetComments () {
  return useQuery({
    queryKey: commentsQueryKeys.allByUser,
    queryFn: getComments
  })
}
