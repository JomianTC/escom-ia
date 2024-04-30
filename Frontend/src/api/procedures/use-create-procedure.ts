import { type CreateProcedure, type OneProcedureAdminResponse } from '@/types/api-responses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, procedureClient } from '../axios'
import { proceduresQueryKeys } from './procedures-query-keys'
import { getLocalStorage } from '@/utilities/localStorage.utlity'
import { formatLinks } from '@/utilities/formatted-links'

async function createProcedure (procedure: CreateProcedure) {
  const token = getLocalStorage('token')
  procedureClient.defaults.headers.common.Authorization = `Bearer ${token.value}`
  const formattedLinks = formatLinks(procedure.links)
  const { id, estado, links, ...procedureInfo } = procedure
  try {
    const response = await procedureClient.post(API_URLS.procedures.createProcedure, { ...procedureInfo, links: formattedLinks })
    const data: OneProcedureAdminResponse = response.data
    return data
  } catch (err) {
    console.error(err)
    throw new Error('No se pudo crear el trámite')
  }
}

export function useCreateProcedure () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProcedure,
    onMutate: async () => {
      toast.info('Creando trámite')
      await queryClient.cancelQueries({ queryKey: proceduresQueryKeys.all })
    },
    onSuccess: (data) => {
      toast.success('Trámite creado')
      return data
    },
    onError: (_err, procedure, context) => {
      console.log(procedure)
      console.log(context)
      console.log(_err)

      toast.error('No se pudo crear el trámite')
    }

  })
}
