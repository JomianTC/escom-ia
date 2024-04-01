import { useForm } from '@hooks/useForm'
import { PUBLIC_ROUTES_MODEL } from '@models/index.ts'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  estudianteEsquemaRegistroFirstStep,
  estudianteEsquemaRegistroSecondStep
} from '../../Schemas'
import { FormStepOne } from './FormStepOne'
import { FormStepTwo } from './FormStepTwo'

const studentValues = {
  nombres: 'Antonio',
  boleta: '2020630319',
  foto_perfil: '',
  apellidos: 'Mora',
  contrasena: '@200120Tm',
  email_academico: 'antonio_@gmail.com',
  email_recuperacion: 'antonio_@gmail.com',
  programa_academico: 'ISC-2009'
}
const FORM_STEPS = [<FormStepOne key={'stf1'} />, <FormStepTwo key={'stf2'} />]
export function StudentForm () {
  const navigate = useNavigate()
  const {
    formStep,
    step,
    canAdvance,
    handleBack,
    canGoBack,
    handleSubmit,
    isLoading,
    isSuccess
  } = useForm(studentValues, FORM_STEPS)

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`)
    }
  }, [isSuccess])

  return isLoading
    ? (
        <div>Loading...</div>
      )
    : (
        <>
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
                {() => (
                    <Form
                        className="flex flex-col gap-2 w-full sm:px-10"
                        noValidate
                    >
                        {step}
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
