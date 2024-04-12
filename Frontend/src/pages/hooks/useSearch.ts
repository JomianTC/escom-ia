import { useTeachers } from '@/api/teachers/use-get-teachers'
import { useDebounce } from '@uidotdev/usehooks'
import { useMemo, useState } from 'react'

export function useSearch (cacheKey = '') {
  const [search, setSearch] = useState('')
  const debouncedSearchTerm: string = useDebounce(search, 800)

  const { data, isLoading, page, handlePageChange, totalPages } = useTeachers()
  const filteredData = useMemo(() => {
    return data?.profesores.filter(teacher => teacher.nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
  }, [data, debouncedSearchTerm])

  return { search, setSearch, filteredData, data, isLoading, page, handlePageChange, totalPages }
}
