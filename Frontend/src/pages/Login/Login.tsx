/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetUser } from '@/api/users/use-get-user'
import { MyTextInput } from '@/components/InputText'
import { type LoginData } from '@/types/index'
import { FormLayout } from '@layouts/FormLayout'
import { PRIVATE_ROUTES_MODEL, PUBLIC_ROUTES_MODEL } from '@models/ROUTES'
import { USER_KEY, login, resetUser } from '@store/slices/userSlice'
import { clearLocalStorage } from '@utils/index'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { estudianteEsquemaIngreso } from '../Schemas'

export default function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userQuery = useGetUser()

  // Si el usuario accede a la ruta de login y ya esta logueado, hacemos que se desloguee
  useEffect(() => {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`, { replace: true })
  }, [])

  async function startLogin (rol = '', loginData: LoginData) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const data = await userQuery.mutateAsync(loginData)
      dispatch(login(data))
      navigate(`/${PRIVATE_ROUTES_MODEL.PRIVATE.path}`, { replace: true })
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
                    initialValues={{ contrasena: '', boleta: '' }}
                    validationSchema={estudianteEsquemaIngreso}
                    onSubmit={async (values) => {
                      await startLogin('', values)
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
                <Link to="/register" className="text-primary_300">
                    ¿No tienes una cuenta? ¡Unete Ahora!
                </Link>
                {/* <button onClick={async () => { await startLogin() }}>Login</button> */}
                {/* <button onClick={async () => { await startLogin('ADMIN') }}>LoginUsingRole</button> */}
            </>
        </FormLayout>
  )
}
