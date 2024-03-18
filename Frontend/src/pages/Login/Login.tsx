/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../models/ROUTES'
import { getCharachter } from '../../services'
import { USER_KEY, login, resetUser } from '../../store/slices/userSlice'
import { clearLocalStorage } from '../../utilities'
import { MyTextInput } from '../../components/InputText'
import { estudianteEsquemaIngreso } from '../Schemas'

export default function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Si el usuario accede a la ruta de login y ya esta logueado, hacemos que se desloguee
  useEffect(() => {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`/${PUBLIC_ROUTES.LOGIN}`, { replace: true })
  }, [])

  async function startLogin (rol = '') {
    try {
      const data = await getCharachter('302')
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
        <div className="h-dvh flex flex-col justify-center items-center overflow-hidden">
            <div
                className={`w-72 xs:w-80 sm:max-w-lg sm:w-full bg-bg_100 border-4 border-text_100 rounded-xl ${true} flex flex-col content-center items-center py-14 px-6  gap-2`}
            >
                <img
                    src="/icons/logoCompleto.png"
                    alt="escom plus"
                    className="w-40"
                />
                <Formik
          initialValues={{ nombre: '', boleta: '' }}
          validationSchema={estudianteEsquemaIngreso}
                    onSubmit={async (values, { setSubmitting }) => {
                      await startLogin()
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                      }, 400)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form
                            className="flex flex-col gap-2 w-full sm:px-10"
                            noValidate
                        >
                            <MyTextInput
                                label="Nombre"
                                name="nombre"
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
            </div>
        </div>
  )
}
