import { type CreateProcedure, type OneProcedureAdminResponse } from '@/types/api-responses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, procedureClient } from '../axios'
import { proceduresQueryKeys } from './procedures-query-keys'

async function createProcedure (procedure: CreateProcedure) {
  const { id, ...procedureInfo } = procedure
  try {
    const response = await procedureClient.post(API_URLS.procedures.createProcedure, procedureInfo)
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

      toast.error('No se pudo crear el trámite')
    }

  })
}