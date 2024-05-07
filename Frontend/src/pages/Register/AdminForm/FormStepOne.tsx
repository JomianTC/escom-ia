import { MyTextInput } from '@/components/InputText'
import { AREAS } from '@/pages/Schemas'
import { Field } from 'formik'

export function FormStepOneAdmin () {
  return (
        <>
            <MyTextInput
                label="Nombre"
                name="nombre"
                type="text"
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
              />
              <label className="text-text_accent">
                <span>Área</span>
                <Field id='area' as="select" name="area" className="text-text_accent h-fit">
                    {AREAS.map((area) => (
                        <option key={area} value={area}>{area}</option>
                    ))}
                </Field>
              </label>
                <MyTextInput
                    label="Identificador"
                    name="identificador"
                    type="password"
                    className=" col-span-2"
                />
            </div>
        </>
  )
}
