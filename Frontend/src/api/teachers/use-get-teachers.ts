import { API_URLS, teacherClient } from '@/api'
import { type TeachersDataResponse } from '@/types/index'
import { getLocalStorage } from '@/utilities/localStorage.utlity'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { teacherQueryKeys } from './teachers-query-keys'

const getTeachers = async (page = 1, limit = 10) => {
  const { token } = await getLocalStorage('token')
  teacherClient.defaults.headers.common.Authorization = `Bearer ${token}`
  const response: TeachersDataResponse = await teacherClient.get(API_URLS.teacherClient.getTeachers, {
    params: {
      page,
      limit
    }
  })
  return response.data
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useTeachers () {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') ?? 1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, isError } = useQuery({
    queryKey: teacherQueryKeys.pagination(Number(page)),
    queryFn: async () => await getTeachers(Number(page), limit)
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
    totalPages: Math.round(((data?.total ?? 30) / limit) ?? 0),
    setLimit
  }
}
