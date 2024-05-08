import { useQuery } from '@tanstack/react-query'
import { API_URLS, commentsClient } from '../axios'
import { commentsQueryKeys } from './comments-query-keys'
async function getComments () {
  try {
    const response = await commentsClient.post(API_URLS.commentsClient.getUserComments)
    console.log(response.data)
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
