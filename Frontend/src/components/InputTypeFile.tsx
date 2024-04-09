import { ErrorMessage, useField } from 'formik'
import { useEffect, useState, type FunctionComponent } from 'react'

interface IUploadFile {
  name: string
}

export const InputTypeFile: FunctionComponent<IUploadFile> = ({
  name
}) => {
  const [field, , helpers] = useField(name)
  const [preview, setPreview] = useState<string>('')
  const { setValue } = helpers

  useEffect(() => {
    if (field.value instanceof File) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(field.value)
    }
  }, [field.value])

  return (
    <label className='w-32 h-32 rounded-full  mb-2 border-2 border-text_100 self-center overflow-hidden relative'>
      <img src={preview} alt="Imagen subida" />
      <input
        className='hidden'
        type="file"
        name="foto_perfil"
        required = {false}
        // set supported file types here,
        // could also check again within formik validation or backend
        accept="image/png, .svg"
        onChange={(e) => {
          // Object is possibly null error w/o check
          if (e.currentTarget.files !== null) {
            void setValue(e.currentTarget.files[0])
          } else {
            void setValue({ name: '' })
          }
        }}
      />
      {(field.name != null) && (
        <>
          <br />
          <ErrorMessage className={'bg-bg_200 absolute bottom-10 text-text_200 z-50 text-center'} name={field.name} component={'p'} />
          <br />
        </>
      )}
    </label>
  )
}
