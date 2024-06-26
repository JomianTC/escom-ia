import { useAppSelector } from '@/store/hooks/useAppSelector'
import { type FormattedInputTags, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, commentsClient, iaClient } from '../index'
import { tagQueryKeys } from '../tags/tags-query-keys'
import { type CommentCreatedResponse, type CommentsByTeacherResponse, type CommentStructure } from './../../types/api-responses'
import { commentsQueryKeys } from './comments-query-keys'

const createComment = async (data: CommentStructure) => {
  try {
    const validateResponse = await iaClient.post(API_URLS.ia.validate, { comentario: data.comentario })

    if (validateResponse.data.valid === false) {
      throw new Error('El comentario no es válido')
    }

    const response = await commentsClient.post(API_URLS.commentsClient.createComment, { ...data })
    const { data: commentResponse }: { data: CommentCreatedResponse } = response
    return commentResponse
  } catch (error) {
    throw new Error('Error al crear el comentario')
  }
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useCreateComment () {
  const queryClient = useQueryClient()
  const { nombres, apellidos, foto_perfil: fotoPerfil } = useAppSelector((state) => state.user)

  return useMutation({
    mutationFn: createComment,
    mutationKey: ['createComment'],
    onMutate: async (newData: CommentStructure) => {
      // Realizando un refetch de los comentarios para que se actualice la lista
      await queryClient.cancelQueries({ queryKey: commentsQueryKeys.all })
      // Obteniendo los tags que ya se tenían en cache
      const tags: FormattedInputTags[] = queryClient.getQueryData(tagQueryKeys.pagination(1)) ?? []
      interface PrevComments {
        pages: CommentsByTeacherResponse[]
        pageParams: number
      }
      const previousComments: PrevComments = queryClient.getQueryData(commentsQueryKeys.all) ?? { pages: [], pageParams: 1 }
      const tagsToShow = newData.tags.map((tag: string) => {
        return tags?.find((tagData: { value: string, label: string }) => tagData.value === tag)?.label
      }) ?? ['loading', 'loading']

      // Aqui colocar el comentario que se va a agregar
      const fecha = new Date().toLocaleDateString()

      const mockComment = {
        comentario: { puntuacion: newData.puntuacion, comentario: newData.comentario, fecha },
        id: newData.id_profesor,
        tags: (tagsToShow ?? []).filter((tag) => tag !== undefined) as string[],
        usuario: { nombres, apellidos, foto_perfil: fotoPerfil }
      }

      queryClient.setQueryData(commentsQueryKeys.all, () => {
        const { pages, pageParams } = previousComments
        pages[0].comentarios.unshift(mockComment)
        return { pages, pageParams }
      })
    },
    onSuccess: (data) => {
      toast.success('Comentario creado correctamente')
      return data
    },
    onError: (_err, _, context?: TSFixMe) => {
      toast.error('Puede que tu comentario no sea válido, intenta de nuevo, recuerda no insultar a nadie')
      return context?.previousComments
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: commentsQueryKeys.all })
    }
  })
}
