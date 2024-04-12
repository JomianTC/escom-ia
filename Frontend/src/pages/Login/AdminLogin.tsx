import { useGetAdmin } from '@/api/users/use-get-admin'
import { MyTextInput } from '@/components/InputText'
import { PRIVATE_ROUTES_MODEL } from '@/models'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { setSession, type ValidRoles } from '@/store/slices/authSlice'
import { login, showUserInfo } from '@/store/slices/userSlice'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { administradorEsquemaRegistro } from '../Schemas'
import { type LoginAdminResponse } from '@/types'

export default function AdminLogin () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const adminQuery = useGetAdmin()
  const startLogin = async (rol: ValidRoles, loginData: any) => {
    console.log(loginData)

    const sessionInfo = {
      loggedIn: true,
      rol
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const data: LoginAdminResponse = await adminQuery.mutateAsync(loginData)
      dispatch(setSession(sessionInfo))
      const payload = {
        user: data,
        type: rol
      }
      dispatch(login(payload))
      navigate(`/${PRIVATE_ROUTES_MODEL.PRIVATE.path}`, { replace: true })
    } catch (error) {
      adminQuery.reset()
    }
  }

  return (
    <>
        <Formik
            initialValues={{ email: 'tonyayala_01@hotmail.com', identificador: '1010101010' }}
            validationSchema={administradorEsquemaRegistro}
            onSubmit={async (values) => {
              await startLogin('admin', values)
            }}
        >
            {() => (
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
                    <button
                        type="submit"
                        className="white-border"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
        {/* <button onClick={async () => { await startLogin() }}>Login</button> */}
{/* <button onClick={async () => { await startLogin('ADMIN') }}>LoginUsingRole</button> */}
{/* {userQuery.isPending && <div>Loading...</div>} */}
{/* {userQuery.isError && <div>Oops prueba de nuevo</div>} */}
    </>
  )
}
