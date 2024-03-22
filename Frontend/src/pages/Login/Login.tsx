/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../models/ROUTES'
import { USER_KEY, login, resetUser } from '../../store/slices/userSlice'
import { clearLocalStorage } from '../../utilities'
import { MyTextInput } from '../../components/InputText'
import { estudianteEsquemaIngreso } from '../Schemas'
import { useGetUser } from '@/api/users/use-get-user'
import { FormLayout } from '../layouts/FormLayout'

interface LoginData {
  nombres: string
  boleta: string
}
export default function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userQuery = useGetUser()

  // Si el usuario accede a la ruta de login y ya esta logueado, hacemos que se desloguee
  useEffect(() => {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`/${PUBLIC_ROUTES.LOGIN}`, { replace: true })
  }, [])

  async function startLogin (rol = '', loginData: LoginData) {
    try {
      const data = await userQuery.mutateAsync(loginData.boleta)
      const user = {
        name: data?.name,
        id: data?._id,
        rol
      }
      dispatch(login(user))
      navigate(`/${PRIVATE_ROUTES.PRIVATE}`, { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <FormLayout>
            <>
                <img
                    src="/icons/logoCompleto.webp"
                    alt="escom plus"
                    className="w-40"
                />
                <Formik
                    initialValues={{ nombres: '', boleta: '' }}
                    validationSchema={estudianteEsquemaIngreso}
                    onSubmit={async (values, { setSubmitting }) => {
                      await startLogin('', values)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form
                            className="flex flex-col gap-2 w-full sm:px-10"
                            noValidate
                        >
                            <MyTextInput
                                label="Nombres"
                                name="nombres"
                                type="email"
                                className="input-border"
                            />
                            <MyTextInput
                                label="Boleta"
                                name="boleta"
                                type="password"
                                className="input-border"
                            />
                            <button
                                type="submit"
                                className="white-border"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
                <Link to="/register" className="text-primary_300">
                    ¿No tienes una cuenta? ¡Unete Ahora!
                </Link>
                {/* <button onClick={async () => { await startLogin() }}>Login</button> */}
                {/* <button onClick={async () => { await startLogin('ADMIN') }}>LoginUsingRole</button> */}
            </>
        </FormLayout>
  )
}
