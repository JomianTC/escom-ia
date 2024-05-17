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
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { SubmitButton } from '@/components/SubmitButton'

const studentValues = {
  nombres: 'Erick',
  boleta: '2020630318',
  foto_perfil: '',
  apellidos: 'Mora',
  contrasena: '@200120Tm',
  email_academico: 'erick@alumno.ipn.mx',
  email_recuperacion: 'erick@gmail.com',
  programa_academico: 'ISC-2009'
}

export function StudentForm ({ isUpdate = false }: { isUpdate?: boolean }) {
  const FORM_STEPS = [<FormStepOne key={'stf1'} canUpload = {isUpdate} />, <FormStepTwo key={'stf2'} />]
  const { rol, loggedIn, id, foto_perfil: fotoPerfil, ...user } = useAppSelector((state) => state.user)
  const initialValues = isUpdate ? { ...user, contrasena: '' } : studentValues
  const navigate = useNavigate()
  const {
    formStep,
    step,
    canAdvance,
    handleBack,
    canGoBack,
    handleSubmit,
    isLoading,
    isSuccess,
    canRedirect
  } = useForm(FORM_STEPS, isUpdate)

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`)
    }
    if (canRedirect) {
      navigate(`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`)
    }
  }, [canRedirect])

  return isLoading
    ? (
        <div>Loading...</div>
      )
    : (
        <>
            <Formik
                initialValues={initialValues}
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
                        <div className="flex justify-between flex-row-reverse">
                        <SubmitButton disabled={isSubmitting} text={canAdvance ? 'Siguiente' : isUpdate ? 'Actualizar' : 'Registrarse'} />
                            {canGoBack && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="white-border opacity-100"
                                >
                                    Anterior
                                </button>
                            )}
                        </div>
                    </Form>
          )}
            </Formik>
        {!isUpdate && (
          <>
          <Link
          to={`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`}
          className="text-primary_300 mt-3 underline underline-offset-4"
          replace
      >
          ¿Ya tienes cuenta? Inicia sesión
          </Link>
          </>
        )}
        </>
      )
}
