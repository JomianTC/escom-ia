import { useState } from 'react'

export const useForm = (initialValues, components) => {
  const [formStep, setFormStep] = useState(0)

  function handleSubmit (values) {
    console.log('values', values)
    if (formStep === 1) {
      console.log('values', values)
    } else {
      setFormStep(formStep + 1)
    }
  }
  return {
    formStep,
    handleSubmit,
    step: components[formStep]
  }
}
