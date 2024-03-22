import { MyTextInput } from '../../components/InputText'
import { InputTypeFile } from '../../components/InputTypeFile'

export function FormStepOne () {
  return (
        <>
            <InputTypeFile name="foto_perfil" />
            <MyTextInput
                label="Nombre"
                name="nombres"
                type="text"
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <MyTextInput
                    label="Apellido"
                    name="apellidos"
                    type="text"
                />
                <MyTextInput
                    label="Boleta"
                    name="boleta"
                    type="text"
              />
                <MyTextInput
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    className=" col-span-2"
                />
            </div>
        </>
  )
}
