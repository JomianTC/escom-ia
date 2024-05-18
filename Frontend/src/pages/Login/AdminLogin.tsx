import { useGetAdmin } from '@/api/users/use-get-admin'
import { MyTextInput } from '@/components/InputText'
import { SubmitButton } from '@/components/SubmitButton'
import { PRIVATE_ROUTES_MODEL, PUBLIC_ROUTES_MODEL } from '@/models'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { setSession } from '@/store/slices/authSlice'
import { login } from '@/store/slices/userSlice'
import { type LevelAccess } from '@/types/index'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { administradorEsquemaRegistro } from '../Schemas'

export default function AdminLogin () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const adminQuery = useGetAdmin()
  const startLogin = async (rol: LevelAccess, loginData: any) => {
    const sessionInfo = {
      loggedIn: true,
      rol
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const data = await adminQuery.mutateAsync(loginData)
      dispatch(setSession(sessionInfo))
      const payload = {
        user: data,
        type: rol
      }
      dispatch(login(payload))
      navigate(`/${PRIVATE_ROUTES_MODEL.PRIVATE.path}/dashboardadmin`, { replace: true })
    } catch (error) {
      adminQuery.reset()
    }
  }

  return (
    <>
        <Formik
            initialValues={{ email: 'supersuadmin@ipn.mx', identificador: '1010101010' }}
            validationSchema={administradorEsquemaRegistro}
            onSubmit={async (values) => {
              await startLogin('admin', values)
            }}
        >
        {({ isSubmitting }) => (
                <Form
                    className="flex flex-col gap-2 w-full sm:px-10"
                    noValidate
                >
                    <MyTextInput
                        label="Email"
                        name="email"
                        type="email"
                        className="input-border"
                    />
                    <MyTextInput
                        label="ID"
                        name="identificador"
                        type="password"
                        className="input-border"
                    />
            <SubmitButton disabled={isSubmitting} text="Iniciar Sesión" />
            <Link
            to={`/${PUBLIC_ROUTES_MODEL.RECOVER.path}`}
            className="text-primary_300 mt-3 underline underline-offset-4 mx-auto self-center"
        >
            ¿Olvidaste tu contraseña?
        </Link>
                </Form>
        )}
        </Formik>
    </>
  )
}
