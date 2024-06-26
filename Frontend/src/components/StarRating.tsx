import { Field, type FieldProps, type FormikHelpers } from 'formik'

interface StarIconProps {
  filled: boolean
  handleClick: () => void
  readOnly: boolean
}

function StarIcon ({ filled, handleClick, readOnly }: StarIconProps) {
  const handleClickWrapper = () => {
    if (!readOnly) {
      handleClick()
    }
  }

  return (
    <svg
      className={`w-6 sm:w-8 h-6 sm:h-8 text-gray-300 me-1 dark:text-gray-500 cursor-pointer  ${readOnly ? 'pointer-events-none' : 'hover:stroke-yellow-500 hover:fill-yellow-500'}`}
      aria-hidden="true"
      stroke='var(--primary_100)'
      strokeWidth='1'
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? 'yellow' : 'currentColor'}
      viewBox="0 0 22 20"
      onClick={handleClickWrapper}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  )
}

interface StarComponentProps {
  field: FieldProps['field']
  form: FormikHelpers<any> & { errors: Record<string, string> }
}

export function StarRating ({ stars = 5, readOnly = false, name = 'rating' }) {
  return (
    <Field name={name}>
      {({ field, form }: StarComponentProps) => (
        <div className="flex flex-col relative -z-10">
          <div className="flex items-center">
            {Array.from({ length: stars }, (_, i) => (
              <StarIcon
                key={i}
                filled={i < field.value}
                handleClick={async () => await form.setFieldValue(field.name, i + 1)}
                readOnly={readOnly}
              />
            ))}
          </div>
          {(form.errors[field.name] !== '') && (
          <div className='text-red-500 '>{form.errors[field.name]}</div>
          )}
        </div>
      )}
    </Field>
  )
}

export function StarComponent ({ stars = 5, rating = 0, className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
    {Array.from({ length: stars }, (_, i) => (
      <StarIcon
        readOnly
        handleClick={() => {}}
        key={i}
        filled={i < rating}
      />
    ))}
  </div>
  )
}
