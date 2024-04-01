import { PUBLIC_ROUTES_MODEL } from '@/models'
import { type Administrador } from '@/types'
import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { administradorEsquema } from '../../Schemas'
import { FormStepOneAdmin } from './FormStepOne'

const adminValues = {
  identificador: '1010101010',
  nombre: 'Super SU Admin',
  email: 'superSuAdmin@ipn.mx',
  area: 'Servicios SU'
}
const FORM_STEPS = [<FormStepOneAdmin key={'stfa1'} />]
export function AdminForm () {
  const handleSubmit = (values: Administrador) => { }
  const handleBack = () => { }
  const canAdvance = false
  const canGoBack = false
  return (
    <>
    <Formik
        initialValues={adminValues}
        validateOnChange={false}
        validationSchema={
            administradorEsquema
        }
        onSubmit={handleSubmit}
    >
        {() => (
            <Form
                className="flex flex-col gap-2 w-full sm:px-10"
                noValidate
            >
                {FORM_STEPS[0]}
                <div className="flex justify-between flex-row-reverse">
                    <button
                        type="submit"
                        className="white-border disabled:opacity-50"
                    >
                        {canAdvance ? 'Siguiente' : 'Registrarse'}
                    </button>
                    {canGoBack && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="white-border"
                        >
                            Anterior
                        </button>
                    )}
                </div>
            </Form>
        )}
    </Formik>
    <Link
        to={`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`}
        className="text-primary_300"
        replace
    >
        ¿Ya tienes cuenta? Inicia sesión
    </Link>
    {/* <button onClick={async () => { await startLogin() }}>Login</button> */}
    {/* <button onClick={async () => { await startLogin('ADMIN') }}>LoginUsingRole</button> */}
</>
  )
}
