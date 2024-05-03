import { useGetUser } from '@/api/users/use-get-user'
import { MyTextInput } from '@/components/InputText'
import { PRIVATE_ROUTES_MODEL } from '@/models'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { setSession } from '@/store/slices/authSlice'
import { login } from '@/store/slices/userSlice'
import { type LevelAccess, type LoginData } from '@/types/index'
import { setLocalStorage } from '@/utilities'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { estudianteEsquemaIngreso } from '../Schemas'

export function StudentFormLogin () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userQuery = useGetUser()

  async function startLogin (rol: LevelAccess, loginData: LoginData) {
    try {
      const data = await userQuery.mutateAsync(loginData)

      dispatch(login({ user: data, type: rol }))
      const sessionInfo = {
        loggedIn: true,
        rol
      }

      dispatch(setSession(sessionInfo))
      setLocalStorage('token', data.token)
      navigate(`/${PRIVATE_ROUTES_MODEL.PRIVATE.path}`, { replace: true })
    } catch (error) {
      userQuery.reset()
    }
  }
  return (
    <Formik
    initialValues={{ contrasena: '@200120Tm', boleta: '2020630319' }}
    validationSchema={estudianteEsquemaIngreso}
    onSubmit={async (values) => {
      await startLogin('student', values)
    }}
>
    {() => (
        <Form
            className="flex flex-col gap-2 w-full sm:px-10"
            noValidate
        >
            <MyTextInput
                label="Boleta"
                name="boleta"
                type="text"
                className="input-border"
            />
            <MyTextInput
                label="Contraseña"
                name="contrasena"
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
  )
}
