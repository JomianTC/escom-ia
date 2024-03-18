import { MyTextInput } from '../../components/InputText'

export const FormStepTwo = () => {
  return (
        <>
            <MyTextInput
                label="Email acádemico"
                name="email_academico"
                type="email"
            />
            <MyTextInput
                label="Email recuperación"
                name="email_recuperacion"
                type="email"
            />
            <MyTextInput
                label="Programa académico"
                name="programa_academico"
                type="text"
            />
            <button
                    type="submit"
                    className="white-border"
                    // disabled={isSubmitting}
                >
                    Submit
                </button>
        </>
  )
}
