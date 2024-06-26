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

const emailNotAllowedDomain = /^[^\s@]+@[^\s@]+\.[^\s@]+(?<!@alumno\.ipn\.mx)$/

const passwordSchema = yup.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(20, 'La contraseña no puede tener más de 20 caracteres')
  .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
  .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un caracter especial')
  .required('La contraseña es requerida')

const nombresSchema = yup.string().matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras')
  .min(2, 'El nombre debe contener mas de 2 carácteres ').required('El nombre es requerido')

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
  contrasena: yup.string().required('Debes ingresar tu contraseña'),
  boleta: yup.string().min(10, 'Recuerda que la boleta tiene al menos 10 numeros').required('La boleta es requerida')
})

export const profesorEsquema = yup.object().shape({
  nombre: nombresSchema,
  area: yup.string().required('El area es requerida'),
  grado_academico: yup.string().required('El grado academico es requerido'),
  email: yup.string().email().required('El email es requerido'),
  contacto: yup.string().min(10).required('El contacto es requerido')
})

export const tramiteEsquema = yup.object().shape({
  nombre: nombresSchema,
  descripcion: yup.string().min(2).required('La descripcion es requerida'),
  fecha_inicio: yup.date().required('La fecha de inicio es requerida'),
  fecha_termino: yup.date().min(yup.ref('fecha_inicio'), 'No puedes elegir una fecha anterior a la de inicio').required('La fecha de termino es requerida'),
  estado: yup.string().min(2).required('El estado es requerido')
})

export const administradorEsquema = yup.object().shape({
  nombre: nombresSchema,
  email: yup.string().email().required('El email es requerido'),
  area: yup.string().min(4).required('El contacto es requerido'),
  identificador: yup.string().min(4).required('El identificador es requerido')
})

export const administradorEsquemaRegistro = yup.object().shape({
  identificador: yup.string().min(3).required('El identificador es requerido'), email: yup.string().email().required('El email es requerido')
})

export const comentarioEsquema = yup.object().shape({
  puntuacion: yup.number().min(1, 'Al menos debes asignar una estrella').max(5).required('La puntuacion es requerida'),
  tags: yup.array().min(1, 'Al menos debes seleccionar un Item').required('Al menos debes ingresar un Tag')
})

export const procedureEsquema = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  descripcion: yup.string().min(2).required('La descripcion es requerida'),
  fechaInicio: yup.date().optional().nullable(),
  fechaTermino: yup.date().min(yup.ref('fechaInicio'), 'No puedes elegir una fecha anterior a la de inicio').optional().nullable(),
  // esInformativo: yup.boolean().required('El estado es requerido'),
  requerimentos: yup.array().min(0, 'Ingresa un requisito o selecciona la opcion -No necesita ').optional(),
  links: yup.array().optional()
})

// Utilizar para dar permiso y para eliminar permiso
export const permissionEsquema = yup.object().shape({
  email: yup.string().email().required('El email es requerido')
})

export const requirementEsquema = yup.object().shape({
  nombre: yup.string().min(2).required('El nombre es requerido'),
  descripcion: yup.string().min(2).required('La descripcion es requerida')
})

export const tagCreateShecma = yup.object().shape({
  nombre: yup.string().min(2, 'Al menos debe tener 2 caracteres').trim().required('El nombre es requerido')
})

export const tagCreateSchemaAndEdit = yup.object().shape({
  tag: yup.string().min(2, 'Al menos debe tener 2 caracteres').trim().required('El nombre es requerido')
})

export const updateSchema = yup.object().shape({
  label: yup.string().required('Debes selccionar algún valor de la lista'),
  nombre: yup.string().trim().min(2, 'Debes contar con un mínimo de 2 carácteres').required('Un nuevo valor es requerido')
})

export const recoverPasswordSchema = yup.object().shape({
  email_recuperacion: yup.string().email('Correo no valido').matches(emailNotAllowedDomain, 'El correo no puede ser el institucional')
    .required('El email es requerido')
})

export const AREAS = [
  'Dirección',
  'Consejo Técnico Consultivo Escolar',
  'Decanato',
  'Comité Interno de Proyectos',
  'Coordinación de Enlace y Gestión Técnica',
  'Unidad de Informática',
  'Subdirección Académica',
  'Departamento de Formación Básica',
  'Departamento de Ciencias e Ingeniería de la Computación',
  'Departamento de Ingeniería en Sistemas Computacionales',
  'Departamento de Fórmacion Integral e Institucional',
  'Departamento de Evaluación y Seguimiento Académico',
  'Departamento de Innovación Educativa',
  'Unidad de Tecnología Educativa y Campus Virtual',
  'Sección de Estudios de Posgrado e Investigación',
  'Colegio de Profesores',
  'Departamento de Posgrado',
  'Departamento de Investigación',
  'Subdirección de Servicios Educativos e Integración Social',
  'Departamento de Gestión Escolar',
  'Departamento de Servicos Estudiantiles',
  'Departamento de Extensión y Apoyos Educativos',
  'Unidad Politécnica de Integración Social',
  'Subdirección Administrativa',
  'Departamento de Capital Humano',
  'Departamento de Recursos  Financieros',
  'Departamento de Recursos Materiales y Servicios'
]

export const GRADOS_ACADEMICOS = ['Doctor',
  'Maestro en Ciencias',
  'Ingeniero',
  'Licenciado',
  'Investigador',
  'Maestro'
]

export const changePasswordSchema = yup.object().shape({
  contrasena: passwordSchema,
  email_recuperacion: yup.string().email('El email no es valido').required('El email de recuperacion es requerido')
})
