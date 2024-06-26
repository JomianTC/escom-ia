import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URLS, procedureClient } from '../axios'
import { proceduresQueryKeys } from './procedures-query-keys'

type ProcedureResponse = { id: string
  nombre: string
  descripcion: string
  //     fechaInicio: 2024-06-11T12:00:00.000Z
  fechaInicio: string
  fechaTermino: string
  estado: boolean
  esInformativo: boolean
  requerimientos: string[]
  links: string[]
}

export function useGetOneProcedure () {
  const { id } = useParams()
  const navigate = useNavigate()
  if (id == null) {
    navigate('/private/tramites')
  }

  async function getOneProcedure () {
    try {
      const response = await procedureClient.get(API_URLS.procedures.getProcedure + id)
      const data: ProcedureResponse = response.data
      return data
    } catch (error) {

    }
  }
  const { data, isLoading } = useQuery({
    queryKey: proceduresQueryKeys.detail(id ?? ''),
    queryFn: getOneProcedure,
    staleTime: 1000
  })
  return {
    data,
    isLoading
  }
}
