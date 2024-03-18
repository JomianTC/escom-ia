import { Form, Formik } from 'formik'
import { estudianteEsquemaRegistroFirstStep, estudianteEsquemaRegistroSecondStep } from '../Schemas'
import { Link } from 'react-router-dom'
import { PUBLIC_ROUTES } from '../../models'
import { FormStepOne } from './FormStepOne'
import { FormStepTwo } from './FormStepTwo'
import { useForm } from '../hooks/useForm'

const studentValues = {
  nombres: '',
  boleta: '',
  foto_perfil: null,
  apellidos: '',
  contrasena: '',
  email_academico: '',
  email_recuperacion: '',
  programa_academico: ''
}
export function Register () {
  const { handleSubmit, formStep, step } = useForm(studentValues, [<FormStepOne key={'stf1'}/>, <FormStepTwo key={'stf2'}/>])

  return (
        <div className="h-full flex flex-col justify-center items-center md:overflow-hidden py-16">
            <div
                className={`w-72 h-fit xs:w-80 sm:max-w-lg sm:w-full bg-bg_100 border-4 border-text_100 rounded-xl ${true} flex flex-col content-center items-center py-14 px-6  gap-2`}
            >
                <img
                    src="/icons/logoCompleto.png"
                    alt="escom plus"
                    className="w-40"
                />
                <Formik
                    initialValues={studentValues}
                    validateOnChange={false}
                  validationSchema={
                      formStep === 0
                        ? estudianteEsquemaRegistroFirstStep
                        : estudianteEsquemaRegistroSecondStep
                  }
                  onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form
                            className="flex flex-col gap-2 w-full sm:px-10"
                            noValidate
                        >
                          {step}
                        </Form>
                    )}
                </Formik>
                <Link
                    to={`/${PUBLIC_ROUTES.LOGIN}`}
                    className="text-primary_300"
                    replace
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </Link>
                {/* <button onClick={async () => { await startLogin() }}>Login</button> */}
                {/* <button onClick={async () => { await startLogin('ADMIN') }}>LoginUsingRole</button> */}
            </div>
        </div>
  )
}
