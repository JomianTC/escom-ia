import { useDispatch } from 'react-redux'
import { useCreateUser } from '@/api/users/use-create-user.ts'
import { type Student } from '@/types/index'
import { useState } from 'react'
import { showUserInfo } from '@/store/slices/userSlice.ts'
import { useUploadImage } from '@/api/users/use-upload-image'
import { useUpdateUser } from '@/api/users/useUpdateUser'
import { closeModal } from '@/store/slices/uiSlice'

interface Components extends Array<JSX.Element> {
  components?: JSX.Element[]
}

export const useForm = (components: Components, isUpdate = false) => {
  const [formStep, setFormStep] = useState(0)
  const [canRedirect, setCanRedirect] = useState(false)
  const dispatch = useDispatch()
  const createUser = useCreateUser()
  const uploadImage = useUploadImage()
  const updateUser = useUpdateUser()

  async function handleSubmit (values: Student) {
    if (formStep === components.length - 1) {
      if (isUpdate) {
        await updateUser.mutateAsync(values).then((data) => {
          setCanRedirect(true)
          dispatch(closeModal())
          return dispatch(showUserInfo(data))
        })
        return
      } else {
        await createUser.mutateAsync(values).then((_data) => {
          setCanRedirect(true)
        }).catch(() => {
          console.log('Oops something went wrong')
        })
      }
      if (values.foto_perfil != null && values.foto_perfil !== '') {
        uploadImage.mutate(values.foto_perfil as unknown as File)
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
