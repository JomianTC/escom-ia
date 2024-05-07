import { type CommentsByTeacherResponse } from '@/types/api-responses'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { commentsClient } from '../axios'
import { commentsQueryKeys } from './comments-query-keys'

export const useGetComments = (readyToFetch: boolean) => {
  const { id } = useParams()

  const getAllComments = async ({ pageParam }: { pageParam: number }) => {
    const response = await commentsClient.get(`teacher/${id}?page=${pageParam}`)
    const data: CommentsByTeacherResponse = response.data
    console.log(data)

    return data
  }

  return useInfiniteQuery({
    queryKey: commentsQueryKeys.all,
    queryFn: getAllComments,
    enabled: readyToFetch,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    }
  })
}
