import { type AllProceduresAdminResponse } from '@/types/api-responses'
import { useDebounce } from '@uidotdev/usehooks'
import { useMemo, useState } from 'react'

type UseProcedureSearch = {
  type: 'tramite'
  data: AllProceduresAdminResponse['tramites']
}
type UseProfesorSearch = {
  type: 'profesor'
  data: any[]
}

export function useSearch ({ type, data }: UseProcedureSearch | UseProfesorSearch) {
  const [search, setSearch] = useState('')
  const [hideActive, setHideActive] = useState(true)
  const debouncedSearchTerm: string = useDebounce(search, 800)

  const changeFilter = () => {
    setHideActive(!hideActive)
  }

  const filteredData = useMemo(() => {
    if (data === undefined || data.length < 0) return []
    if (type === 'tramite') {
      if (!hideActive) {
        return data.filter(element => element.tramite.nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) && element.tramite.estado)
      }
      return data.filter(element => element.tramite.nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    }
    return data.filter(element => {
      return element.nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    })
  }, [data, debouncedSearchTerm, hideActive])

  return { search, setSearch, filteredData, changeFilter, buttonMessage: hideActive ? 'Ocultar desactivados' : 'Mostrar Desactivados' }
}
