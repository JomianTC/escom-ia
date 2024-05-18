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
                placeholder="fernando1902@alumno.ipn.mx"
            />
            <MyTextInput
                label="Email recuperación"
                name="email_recuperacion"
                type="email"
                placeholder="fernandoincreible@gmail.com"
            />
            <label>
                <span>Programa Acádemico</span>
                <Field
                    as="select"
                    name="programa_academico"
                    className={'px-2 py-1 input-border mb-2 text-text_100'}
                >
                    {PROGRAMAS_ACADEMICOS.map((programa) => (
                        <option
                            className="text-text_100"
                            key={programa}
                            value={programa}
                        >
                            {programa}
                        </option>
                    ))}
                </Field>
            </label>
        </>
  )
}
