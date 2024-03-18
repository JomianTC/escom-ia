import * as yup from 'yup'
export const MAX_FILE_SIZE = 2097152 // 500KB
// export const MAX_FILE_SIZE = 10 // 500KB
const validateFileSize = (value: any) => {
  console.log(value)
  if (value.size !== undefined) {
    return value.size <= MAX_FILE_SIZE
  } else {
    return true
  }
}
export const estudianteEsquemaRegistroFirstStep = yup.object().shape({
  foto_perfil: yup.mixed().test('fileSize', 'El archivo es muy grande', validateFileSize),
  nombres: yup.string().min(2).required('El nombre es requerido'),
  apellidos: yup.string().min(2).required('El apellido es requerido'),
  boleta: yup.string().min(10).required('La boleta es requerida'),
  contrasena: yup.string().min(8).required('La contraseña es requerida')
})

export const estudianteEsquemaRegistroSecondStep = yup.object().shape({
  email_academico: yup.string().email().required('El email academico es requerido'),
  email_recuperacion: yup.string().email().required('El email de recuperacion es requerido'),
  programa_academico: yup.string().min(2).required('El programa academico es requerido')
})

export const estudianteEsquemaIngreso = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  boleta: yup.string().min(10).required('La boleta es requerida')
})

export const profesorEsquema = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  area: yup.string().min(2).required('El area es requerida'),
  grado_academico: yup.string().min(2).required('El grado academico es requerido'),
  email: yup.string().email().required('El email es requerido'),
  contacto: yup.string().min(10).required('El contacto es requerido')
})

export const tramiteEsquema = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  descripcion: yup.string().min(2).required('La descripcion es requerida'),
  fecha_inicio: yup.string().required('La fecha de inicio es requerida'),
  fecha_termino: yup.string().required('La fecha de termino es requerida'),
  estado: yup.string().min(2).required('El estado es requerido')
})

export const administradorEsquema = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  email: yup.string().email().required('El email es requerido'),
  contacto: yup.string().min(10).required('El contacto es requerido')
})

export const comentarioEsquema = yup.object().shape({
  comentario: yup.string().min(2).required('El comentario es requerido')
})
