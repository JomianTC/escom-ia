import { ErrorMessage, useField } from 'formik'
import React, { useEffect } from 'react'
interface MyTextInputProps {
  label: string
  name: string
  type?: 'text' | 'password' | 'email' | 'number'
  className?: string
  placeholder?: string
  [x: string]: any
}
export function MyTextInput ({ label, className, placeholder = '', ...props }: MyTextInputProps) {
  const [field] = useField(props.name)

  return (
<>
        <label className={` ${className}`}>
        <span>{label}</span>
        <input autoComplete='off' className={`'px-2 py-1 input-border mb-2' ${className}`} {...field} {...props} placeholder={placeholder } />
        <ErrorMessage className={'text-red-400'} name={field.name} component={'span'} />
        </label>
</>
  )
}

export function MyTextArea ({ label, className, placeholder = '', ...props }: MyTextInputProps) {
  const [field] = useField(props.name)

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
    return () => {
      if (textAreaRef.current != null) {
        textAreaRef.current.style.height = '20px'
      }
    }
  }, [field.value])

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = '40px'
    }
  }, [])

  return (
<>
        <label className={` flex flex-col ${className}`}>
        <span>{label}</span>
        <textarea ref={textAreaRef} className={`'px-2 py-1 input-border border-2 border-primary_200 text-area mb-2' ${className}`} {...field} {...props} placeholder={placeholder } />
        <ErrorMessage className={'text-red-400'} name={field.name} component={'span'} />
        </label>
</>
  )
}
