import { API_URLS, procedureClient } from '@/api'
import { type AllProceduresAdminResponse } from '@/types/api-responses'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { proceduresQueryKeys } from './procedures-query-keys'

// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
const getProcedures = async (page = 1, limit = 100) => {
  // /
  const response = await procedureClient.get(API_URLS.procedures.getProcedures + `?page=${page}&limit=${limit}`)

  const data: AllProceduresAdminResponse = response.data
  return data
}
export function useProcedures (resultLimit = 10) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') ?? 1)
  const [limit, setLimit] = useState(resultLimit)

  const { data, isLoading, isError } = useQuery({
    queryKey: proceduresQueryKeys.all,
    queryFn: async () => await getProcedures(Number(page), limit)
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
    data: data?.tramites ?? [],
    isLoading,
    isError,
    totalPages: Math.round(((data?.total ?? 30) / limit) ?? 0),
    setLimit
  }
}
