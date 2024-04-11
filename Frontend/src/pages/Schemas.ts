import * as yup from 'yup'
export const MAX_FILE_SIZE = 2097152 // 500KB
// export const MAX_FILE_SIZE = 10 // 500KB
const validateFileSize = (value: any) => {
  if (value === undefined) {
    return true
  } else {
    return value.size <= MAX_FILE_SIZE
  }
}

const passwordSchema = yup.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(20, 'La contraseña no puede tener más de 20 caracteres')
  .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
  .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un caracter especial')
  .required('La contraseña es requerida')

const nombresSchema = yup.string().min(2, 'El nombre debe contener mas de 2 carácteres ').required('El nombre es requerido')

export const estudianteEsquemaRegistroFirstStep = yup.object().shape({
  foto_perfil: yup.mixed().test('fileSize', 'El archivo es muy grande', validateFileSize).optional().nullable(),
  nombres: nombresSchema,
  apellidos: yup.string().min(2, 'El apellido debe contener mas de 2 carácteres ').required('El apellido es requerido'),
  boleta: yup.string().min(10, 'La boleta contiene al menos 10 números').required('La boleta es requerida').matches(/^[0-9]+$/, 'La boleta solo puede contener numeros'),
  contrasena: passwordSchema
})

export const estudianteEsquemaRegistroSecondStep = yup.object().shape({
  email_academico: yup.string().email('El correo electrónico no tiene un formato válido')
    .matches(/@alumno\.ipn\.mx$/, 'El correo electrónico debe tener la terminación @alumno.ipn.mx'),
  email_recuperacion: yup.string().email().required('El email de recuperacion es requerido'),
  programa_academico: yup.string().min(2).required('El programa academico es requerido')
})

export const estudianteEsquemaIngreso = yup.object().shape({
  contrasena: passwordSchema,
  boleta: yup.string().min(10).required('La boleta es requerida')
})

export const profesorEsquema = yup.object().shape({
  nombre: nombresSchema,
  area: yup.string().min(2).required('El area es requerida'),
  grado_academico: yup.string().min(2).required('El grado academico es requerido'),
  email: yup.string().email().required('El email es requerido'),
  contacto: yup.string().min(10).required('El contacto es requerido')
})

export const tramiteEsquema = yup.object().shape({
  nombre: nombresSchema,
  descripcion: yup.string().min(2).required('La descripcion es requerida'),
  fecha_inicio: yup.string().required('La fecha de inicio es requerida'),
  fecha_termino: yup.string().required('La fecha de termino es requerida'),
  estado: yup.string().min(2).required('El estado es requerido')
})

export const administradorEsquema = yup.object().shape({
  nombre: nombresSchema,
  email: yup.string().email().required('El email es requerido'),
  area: yup.string().min(10).required('El contacto es requerido'),
  identificador: yup.string().min(10).required('El identificador es requerido')
})

export const comentarioEsquema = yup.object().shape({
  comentario: yup.string().min(2).required('El comentario es requerido'),
  puntuacion: yup.number().min(1).max(5).required('La puntuacion es requerida'),
  tags: yup.array().min(1, 'Al menos debes seleccionar un Item').required('Al menos debes ingresar un Tag')
})

export const procedureEsquema = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  descripcion: yup.string().min(2).required('La descripcion es requerida'),
  fechaInicio: yup.string().required('La fecha de inicio es requerida'),
  fechaTermino: yup.string().required('La fecha de termino es requerida'),
  esInformativo: yup.boolean().required('El estado es requerido'),
  requerimientos: yup.array()
})

// Utilizar para dar permiso y para eliminar permiso
export const permissionEsquema = yup.object().shape({
  email: yup.string().email().required('El email es requerido')
})

export const requirementEsquema = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  descripcion: yup.string().min(2).required('La descripcion es requerida')
})
