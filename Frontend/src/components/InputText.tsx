import { ErrorMessage, useField } from 'formik'
interface MyTextInputProps {
  label: string
  name: string
  type?: 'text' | 'password' | 'email' | 'number'
  className?: string
  placeholder?: string
  [x: string]: any
}
export function MyTextInput ({ label, className, ...props }: MyTextInputProps) {
  const [field, meta, helpers] = useField(props.name)

  return (
<>
        <label className={` ${className}`}>
        <span>{label}</span>
        <input className={'px-2 py-1 input-border mb-2'} {...field} {...props} placeholder='Antonio Mora'/>
        <ErrorMessage className={'text-red-400'} name={field.name} component={'span'} />
        </label>
</>
  )
}
