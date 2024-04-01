import { Field } from 'formik'
import { MyTextInput } from '../../../components/InputText'
const PROGRAMAS_ACADEMICOS = [
  'ISC-2009',
  'ISC-2020',
  'IA-2020',
  'LCD-2020',
  'ISISA',
  'MCSCM'
]
export const FormStepTwo = () => {
  return (
        <>
            <MyTextInput
                label="Email acádemico"
                name="email_academico"
                type="email"
            />
            <MyTextInput
                label="Email recuperación"
                name="email_recuperacion"
                type="email"
          />
          <label >
          <span>Programa Acádemico</span>
          <Field as="select" name="color" className={'px-2 py-1 input-border mb-2 text-black'}>
              {PROGRAMAS_ACADEMICOS.map((programa) => (
                    <option key={programa} value={programa}>
                        {programa}
                    </option>
              ))}
              </Field>
              </label>
        </>
  )
}
