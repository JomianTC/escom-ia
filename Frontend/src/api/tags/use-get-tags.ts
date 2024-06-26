import { API_URLS, tagsClient } from '@/api'
import { type TagsResponse } from '@/types/index'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { tagQueryKeys } from './tags-query-keys'

const defaultValue = [{
  label: 'buen profesor',
  value: 'buen profesor'
}]

const getTags = async (page = 1, limit = 1000) => {
  const response = await tagsClient.get(API_URLS.tagClient.getTags, {
    params: {
      page,
      limit
    }
  })
  const data: TagsResponse = response.data
  const formattedInputData = data.tags.map((tag) => {
    return {
      label: tag.nombre,
      value: tag.id
    }
  })

  return formattedInputData ?? defaultValue
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useTags (limitResults = 100) {
  const [limit, setLimit] = useState(limitResults)

  const { data, isLoading, isError } = useQuery({
    queryKey: tagQueryKeys.all,
    queryFn: async () => await getTags(1, limit),
    staleTime: 1000
  })

  return {
    data,
    isLoading,
    isError,
    setLimit
  }
}
