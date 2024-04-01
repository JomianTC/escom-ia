import { MyTextInput } from '@/components/InputText'

export function FormStepOneAdmin () {
  return (
      <>
            <MyTextInput
                label="Nombre"
                name="nombre"
                type="text"
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
                />
                <MyTextInput
                    label="area"
                    name="area"
                    type="text"
              />
                <MyTextInput
                    label="Identificador"
                    name="identificador"
                    type="password"
                    className=" col-span-2"
                />
            </div>
      </>
  )
}
