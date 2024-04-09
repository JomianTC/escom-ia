import { type FieldProps } from 'formik'
import Select from 'react-select'

interface Option {
  label: string
  value: string
}

interface CustomSelectProps extends FieldProps {
  options: Option[]
  isMulti?: boolean
  className?: string
  placeholder?: string
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form: { touched, errors, setFieldValue },
  options,
  isMulti = false
}: CustomSelectProps) => {
  const onChange = async (option) => {
    await setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    )
  }

  const getValue = () => {
    if (options.length === 0) return []
    return isMulti
      ? options.filter(option => field.value.indexOf(option.value) >= 0)
      : options.find(option => option.value === field.value)
  }

  return (
    <div className='flex flex-col'>
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      />
      {(errors[field.name] !== '') && (
        <div className='text-red-500'>{errors[field.name]?.toString() ?? ''}</div>
      )}
      </div>
  )
}

export default CustomSelect
