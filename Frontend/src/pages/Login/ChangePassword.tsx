import { useChangePassword } from '@/api/users/use-change-password'
import { MyTextInput } from '@/components/InputText'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { FormLayout } from '../layouts/FormLayout'
import { changePasswordSchema } from '../Schemas'
import { SubmitButton } from '@/components/SubmitButton'

export function ChangePassword () {
  const recoverPassword = useChangePassword()
  const navigate = useNavigate()
  return (
          <FormLayout>
              <>
                  <Formik
                      initialValues={{ email_recuperacion: '', contrasena: '' }}
                      validationSchema={changePasswordSchema}
                      onSubmit={async (values) => {
                        await recoverPassword.mutateAsync({ email_recuperacion: values.email_recuperacion, contrasena: values.contrasena }).then(() => {
                          navigate('/home')
                        })
                      }}
                  >
                      {({ isSubmitting }) => (
                          <Form
                              className="flex flex-col gap-2 w-full sm:px-10"
                              noValidate
                          >
                              <MyTextInput
                                  label="Correo Electrónico de recuperación"
                                  name="email_recuperacion"
                                  type="email"
                                  className="input-border"
                          />
                            <MyTextInput
                                  label="Nueva contraseña"
                                  name="contrasena"
                                  type="password"
                                  className="input-border"
                              />
                              <SubmitButton disabled={isSubmitting || recoverPassword.isPending} text="Cambiar contraseña" />
                          </Form>
                      )}
                  </Formik>
                  <Link to="/register" className="text-primary_300 mt-4 hover:text-primary_200 hover:font-bold transition-all">
                      Regresar
                  </Link>
              </>
          </FormLayout>
  )
}
