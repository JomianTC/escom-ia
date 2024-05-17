import { MyTextInput } from '@/components/InputText'
import { SubmitButton } from '@/components/SubmitButton'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { FormLayout } from '../layouts/FormLayout'
import { recoverPasswordSchema } from '../Schemas'
import { useRecoverPassword } from '@/api/users/use-recover-password'

export function Recover () {
  const recoverPassword = useRecoverPassword()
  const navigate = useNavigate()
  return (
        <FormLayout>
            <>
                <Formik
                    initialValues={{ email_recuperacion: '' }}
                    validationSchema={recoverPasswordSchema}
                    onSubmit={async (values) => {
                      recoverPassword.mutate(values.email_recuperacion)
                      recoverPassword.isSuccess && navigate('/login')
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form
                            className="flex flex-col gap-2 w-full sm:px-10"
                            noValidate
                        >
                            <MyTextInput
                                label="Correo Electrónico"
                                name="email_recuperacion"
                                type="email"
                                className="input-border"
                            />
                            <SubmitButton disabled={isSubmitting || recoverPassword.isPending} text="Recuperar contraseña" />
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
