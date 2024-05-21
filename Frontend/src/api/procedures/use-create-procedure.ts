import { type CreateProcedure, type OneProcedureAdminResponse } from '@/types/api-responses'
import { formatLinks } from '@/utilities/formatted-links'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, procedureClient } from '../axios'
import { proceduresQueryKeys } from './procedures-query-keys'

async function createProcedure (procedure: CreateProcedure) {
  const formattedLinks = formatLinks(procedure.links)
  const { id, links, ...procedureInfo } = procedure
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
    onError: (_err, _procedure, _context) => {
      toast.error('No se pudo crear el trámite')
    }

  })
}
