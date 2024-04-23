import { useCreateRequirment } from '@/api/requirments/use-create-requirment'
import { type FieldProps } from 'formik'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

const defaultOptions = [
  { value: '1', label: 'Aún no hay nada' }
]
type OptionType = {
  value: string
  label: string
}
interface CustomSelectProps extends FieldProps {
  options: OptionType[]
  isMulti?: boolean
  placeholder?: string
  isCreatable?: boolean
}

export const CustomSelect = ({
  isCreatable = false,
  field,
  form,
  options = defaultOptions,
  isMulti = false,
  placeholder = 'Select'
}: CustomSelectProps) => {
  const createRequirment = useCreateRequirment()
  const handleCreate = async (inputValue: string) => {
    await createRequirment.mutateAsync(inputValue)
  }
  async function onChange (option: any) {
    await form.setFieldValue(field.name, option !== undefined ? (option).map((item: OptionType) => item.value) : [])
  }

  const getValue = () => {
    if (options !== undefined && field.value !== undefined) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value)
    } else {
      return isMulti ? [] : ('')
    }
  }

  if (isCreatable && isMulti) {
    return (
      <CreatableSelect
        className='max-w-[300px]'
        isMulti
        name={field.name}
      options={options ?? defaultOptions}
      value={getValue()}
      onChange={onChange}
      onBlur={field.onBlur}
        onCreateOption={handleCreate}
        isLoading={createRequirment.isPending}
    />
    )
  }

  if (!isMulti) {
    return (
            <Select
                options={options}
                name={field.name}
                value={options !== undefined ? options.find(option => option.value === field.value) : ''}
                onChange={async (option: any) => await form.setFieldValue(field.name, option !== null ? option.value ?? '' : '')}
                onBlur={field.onBlur}
                placeholder={placeholder}
            />
    )
  } else {
    return (
            <Select
                className="react-select-container"
                classNamePrefix="react-select"
                name={field.name}
                value={getValue()}
                onChange={onChange}
                options={options ?? defaultOptions}
                isMulti={true}
                placeholder={placeholder}
            />
    )
  }
}
