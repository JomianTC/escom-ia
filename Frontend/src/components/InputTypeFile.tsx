import { type FunctionComponent } from 'react'
import { ErrorMessage, useField, type FormikErrors } from 'formik'

interface IUploadFile {
  name: string
}

export const InputTypeFile: FunctionComponent<IUploadFile> = ({
  name
}) => {
  const [field,, helpers] = useField(name)
  const { setValue } = helpers

  return (
  <label className='w-32 h-32 rounded-full  mb-2 border-2 border-text_100 self-center'>
      <input
        className='hidden'
        type="file"
        name="foto_perfil"
        // set supported file types here,
        // could also check again within formik validation or backend
        accept="image/png, .svg"
        onChange={(e) => {
          // Object is possibly null error w/o check
          if (e.currentTarget.files !== null) {
            console.log(e.currentTarget.files[0])
            void setValue(e.currentTarget.files[0])
          }
        }}
      />
      {(field.name != null) && (
        <>
          <br />
          <ErrorMessage className={'text-red-400'} name={field.name} component={'span'} />
          <br />
        </>
      )}
    </label>
  )
}
