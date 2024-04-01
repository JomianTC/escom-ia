import { useDispatch } from 'react-redux'
import { useCreateUser } from '@/api/users/use-create-user.ts'
import { type Student } from '@/types/index'
import { useState } from 'react'
import { showUserInfo } from '@/store/slices/userSlice.ts'

interface Components extends Array<JSX.Element> {
  components?: JSX.Element[]
}

export const useForm = (initialValues: Student, components: Components) => {
  const [formStep, setFormStep] = useState(0)
  const [canRedirect, setCanRedirect] = useState(false)
  const dispatch = useDispatch()
  const createUser = useCreateUser()

  async function handleSubmit (values: Student) {
    if (formStep === components.length - 1) {
      createUser.mutate(values)
      if (createUser.isSuccess) {
        setCanRedirect(true)
        return dispatch(showUserInfo(values))
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
    canRedirect
  }
}
