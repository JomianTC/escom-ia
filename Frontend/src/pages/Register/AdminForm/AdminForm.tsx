import { useCreateAdmin } from '@/api/users/use-create-admin'
import { useUpdateAdmin } from '@/api/users/use-update-admin'
import { PUBLIC_ROUTES_MODEL } from '@/models'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { changeState } from '@/store/slices/uiSlice'
import { type Admin } from '@/types/index'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { administradorEsquema } from '../../Schemas'
import { FormStepOneAdmin } from './FormStepOne'

const adminValues = {
  identificador: '1010101010',
  nombre: 'Super SU Admin',
  email: 'superSuAdmin@ipn.mx',
  area: 'Departamento de Recursos  Financieros'
}
const FORM_STEPS = [<FormStepOneAdmin key={'stfa1'} />]
export function AdminForm ({ isUpdate = false }: { isUpdate?: boolean }) {
  const createAdmin = useCreateAdmin()
  const updateAdmin = useUpdateAdmin()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleSubmit = async (values: Admin) => {
    if (isUpdate) {
      await updateAdmin.mutateAsync(values)
      dispatch(changeState())
      return
    }
    await createAdmin.mutateAsync(values).then(() => {
      navigate(`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`, { replace: true })
    }).catch(() => {
      dispatch(changeState())
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      createAdmin.reset()
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleBack = () => { }
  const canAdvance = false
  const canGoBack = false
  return (
    <>
      {createAdmin.isError && <div>Hubo un error</div>}
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
                        className="white-border opacity-100 disabled:opacity-50"
                    >
                        {canAdvance ? 'Siguiente' : isUpdate ? 'Actualizar' : 'Registrarse'}
                    </button>
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
      <Link
          to={`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`}
          className="text-primary_300"
          replace
      >
          ¿Ya tienes cuenta? Inicia sesión
      </Link>
      ) }
</>
  )
}
