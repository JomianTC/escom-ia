import { API_URLS, tagsClient } from '@/api'
import { type TagsResponse } from '@/types/index'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { tagQueryKeys } from './tags-query-keys'

const defaultValue = [{
  label: 'buen profesor',
  value: 'buen profesor'
}]

const getTags = async (page = 1, limit = 10) => {
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
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') ?? 1)
  const [limit, setLimit] = useState(limitResults)

  const { data, isLoading, isError } = useQuery({
    queryKey: tagQueryKeys.pagination(Number(page)),
    queryFn: async () => await getTags(Number(page), limit),
    staleTime: 1000
  })
  const handlePageChange = (page: number) => {
    if (page < 1) return
    setPage(Number(page))
    const searchParams = new URLSearchParams()
    searchParams.set('page', page.toString())
    setSearchParams(searchParams.toString())
  }

  return {
    handlePageChange,
    page: Number(page),
    data,
    isLoading,
    isError,
    setLimit
  }
}
