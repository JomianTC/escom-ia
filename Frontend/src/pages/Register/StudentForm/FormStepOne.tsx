import { MyTextInput } from '../../../components/InputText'
import { InputTypeFile } from '../../../components/InputTypeFile'

export function FormStepOne ({ canUpload = false }) {
  return (
        <>
            {canUpload && <InputTypeFile name="foto_perfil" />}
            <MyTextInput
                label="Nombre"
                name="nombres"
                type="text"
                placeholder="Fernando"
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <MyTextInput
                    label="Apellido"
                    name="apellidos"
                    type="text"
                    placeholder="Herrera"
                />
                <MyTextInput
                    label="Boleta"
                    name="boleta"
                    type="text"
                    placeholder="2019384293"
                />
                <MyTextInput
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    className=" col-span-2"
                    placeholder="@2736Fer"
                />
            </div>
        </>
  )
}
