import { useCreateUser } from '@/api/users/use-create-user.ts'
import { useUploadImage } from '@/api/users/use-upload-image'
import { useUpdateUser } from '@/api/users/useUpdateUser'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { closeModal } from '@/store/slices/uiSlice'
import { update } from '@/store/slices/userSlice.ts'
import { type Student } from '@/types/index'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

interface Components extends Array<JSX.Element> {
  components?: JSX.Element[]
}

export const useForm = (components: Components, isUpdate = false) => {
  const { rol, loggedIn, id, foto_perfil: fotoPerfil, ...user } = useAppSelector((state) => state.user)
  const [formStep, setFormStep] = useState(0)
  const [canRedirect, setCanRedirect] = useState(false)
  const dispatch = useDispatch()
  const createUser = useCreateUser()
  const uploadImage = useUploadImage()
  const updateUser = useUpdateUser()

  async function handleSubmit (values: Student) {
    if (formStep === components.length - 1) {
      if (isUpdate) {
        const infoToSend = { ...values }
        // Quitando correo academico si no cambio
        if (values.email_academico === user.email_academico) {
          delete infoToSend.email_academico
        }
        // Quitando correo de recuperacion si no cambio
        if (values.email_recuperacion === user.email_recuperacion) {
          delete infoToSend.email_recuperacion
        }
        console.log('Valores por actualizar', infoToSend)

        await updateUser.mutateAsync(infoToSend).then((data) => {
          setCanRedirect(true)
          dispatch(closeModal())
        })
      } else {
        await createUser.mutateAsync(values).then((_data) => {
          setCanRedirect(true)
        }).catch(() => {
          console.log('Oops something went wrong')
        })
      }
      if (values.foto_perfil != null && values.foto_perfil !== '') {
        await uploadImage.mutateAsync(values.foto_perfil as unknown as File).then((data) => {
          dispatch(update({ foto_perfil: data.foto_perfil }))
        })
      }
    } else {
      handleNext()
    }
  }

  function handleNext () {
    setFormStep(prev => prev + 1)
  }
  function handleBack () {
    setFormStep(prev => prev - 1)
  }
  const canAdvance = formStep < components.length - 1
  const canGoBack = formStep > 0
  return {
    formStep,
    handleNext,
    step: components[formStep],
    canAdvance,
    canGoBack,
    handleBack,
    handleSubmit,
    isLoading: createUser.isPending,
    isSuccess: createUser.isSuccess,
    canRedirect,
    isUpdateSuccess: updateUser.isSuccess
  }
}
