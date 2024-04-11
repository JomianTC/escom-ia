// TEACHERS

// COMENTARIOS
type Comentario = {
  puntuacion: number
  comentario: string
  fecha: string
}
type StudentComment = {
  nombres: string
  apellidos: string
  foto_perfil: string
}
export interface CommentByTeacher {
  comentario: Comentario
  usuario: StudentComment
  tags: string[]
}
export interface CommentStructure {
  comentario: string
  id_profesor: string
  puntuacion: number
  tags: string[]
}
export type CommentsByTeacherResponse = {
  length?: number
  comentarios: CommentByTeacher[]
  total: number
}
export type CommentCreatedResponse = {
  message: string
}
export interface CommentUpdatedResponse extends CommentByTeacher {
  message: string
}
export interface DeleteCommentRespose {
  message: string
}
const comentario: CommentsByTeacherResponse = {
  comentarios: [{
    comentario: {
      puntuacion: 5,
      comentario: 'Muy buen profesor',
      fecha: '2021-10-10'
    },
    usuario: {
      nombres: 'Juan',
      apellidos: 'Perez',
      foto_perfil: 'https://example.com'
    },
    tags: ['tag1', 'tag2']
  }
  ],
  total: 1
}
export type FindOneCommentResponse = CommentByTeacher

// Procedures Routes To Users
interface Procedure {
  id: string
  nombre: string
  descripcion: string
  //     fechaInicio: 2024-06-11T12:00:00.000Z
  fechaInicio: string
  fechaTermino: string
  estado: boolean
  esInformativo: boolean
}
export interface OneProcedureUserResponse {
  procedure: Procedure
  requirements: string[]
}

export interface AllProceduresUserResponse {
  procedures: Procedure[]
  total: number
}

// ADMINS
type message = string
interface MessageResponse {
  message: message
}
export interface CreateProcedureResponse extends MessageResponse { }
export interface UpdateProcedureResponse extends MessageResponse { }
export interface DeleteProcedureResponse extends MessageResponse { }
export interface GivePermissionResponse extends MessageResponse { }
export interface AllProceduresAdminResponse {
  tramites: Array<{
    tramite: Procedure
    requerimientos: string[]
  }>
  total: number
}
export interface OneProcedureAdminResponse {
  tramite: Procedure
  requerimientos: string[]
}

const proceduresAdmin: AllProceduresAdminResponse = {
  tramites: [
    {
      tramite: {
        id: '8591b88c-cfe0-4231-9488-801335fdb529',
        nombre: 'trabajo opcional 5',
        descripcion: 'Este tramite te ayudara tramitar el servicio social',
        fechaInicio: '2024-02-01T06:00:00.000Z',
        fechaTermino: '2024-03-22T06:00:00.000Z',
        estado: false,
        esInformativo: true
      },
      requerimientos: [
        'nombre completo 2',
        'nombre completo 3',
        'nombre completo 1'
      ]
    },
    {
      tramite: {
        id: 'c4a1f727-04c7-47d2-b094-3f8221942588',
        nombre: 'trabajo opcional 4',
        descripcion: 'Este tramite te ayudara tramitar el servicio social',
        fechaInicio: '2024-02-01T06:00:00.000Z',
        fechaTermino: '2024-03-22T06:00:00.000Z',
        estado: false,
        esInformativo: true
      },
      requerimientos: [
        'nombre completo 2',
        'nombre completo 3',
        'nombre completo 1'
      ]
    },
    {
      tramite: {
        id: '8779b211-fbcb-466c-892f-4df581f680a5',
        nombre: 'kame hame haaaaaaaaaaaaa',
        descripcion: 'Este tramite te ayudara tramitar el servicio social',
        fechaInicio: '2024-02-02T06:00:00.000Z',
        fechaTermino: '2024-03-22T06:00:00.000Z',
        estado: true,
        esInformativo: true
      },
      requerimientos: [
        'nombre completo 8',
        'nombre completo 5',
        'nombre completo 7',
        'nombre completo 6'
      ]
    },
    {
      tramite: {
        id: '23ef0a20-2872-4c25-970e-ff822d7c9b41',
        nombre: 'trabajo opcional 3',
        descripcion: 'Este tramite te ayudara tramitar el servicio social',
        fechaInicio: '2024-02-01T06:00:00.000Z',
        fechaTermino: '2024-03-22T06:00:00.000Z',
        estado: true,
        esInformativo: true
      },
      requerimientos: [
        'nombre completo 2',
        'nombre completo 1',
        'nombre completo 3'
      ]
    },
    {
      tramite: {
        id: '47b48c15-25ee-4782-a675-f6dae62e3ee1',
        nombre: 'trabajo opcional 2',
        descripcion: 'Este tramite te ayudara tramitar el servicio social',
        fechaInicio: '2024-02-01T06:00:00.000Z',
        fechaTermino: '2024-03-22T06:00:00.000Z',
        estado: true,
        esInformativo: true
      },
      requerimientos: [
        'nombre completo 3',
        'nombre completo 2',
        'nombre completo 1'
      ]
    },
    {
      tramite: {
        id: '99c32be0-fc7e-465a-9023-d1adf0238674',
        nombre: 'trabajo opcional',
        descripcion: 'Este tramite te ayudara tramitar el servicio social',
        fechaInicio: '2024-02-01T06:00:00.000Z',
        fechaTermino: '2024-03-22T06:00:00.000Z',
        estado: true,
        esInformativo: true
      },
      requerimientos: [
        'nombre completo 3',
        'nombre completo 2',
        'nombre completo 1'
      ]
    }
  ],
  total: 6
}

console.log(proceduresAdmin)

const proceduresUser: AllProceduresUserResponse = {
  procedures: [
    {
      id: '8779b211-fbcb-466c-892f-4df581f680a5',
      nombre: 'kame hame haaaaaaaaaaaaa',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-02T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: '99c32be0-fc7e-465a-9023-d1adf0238674',
      nombre: 'trabajo opcional',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: '47b48c15-25ee-4782-a675-f6dae62e3ee1',
      nombre: 'trabajo opcional 2',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: '23ef0a20-2872-4c25-970e-ff822d7c9b41',
      nombre: 'trabajo opcional 3',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: 'c4a1f727-04c7-47d2-b094-3f8221942588',
      nombre: 'trabajo opcional 4',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    }
  ],
  total: 5
}

console.log(proceduresUser)

const oneProcedureUser: OneProcedureUserResponse = {
  procedure: {
    id: '87ded2a6-7a59-4b05-9dcb-4b5dbbb78790',
    nombre: 'VOIDDRIFTER2X',
    descripcion: 'Este tramite no hace nada',
    fechaInicio: '2024-06-11T12:00:00.000Z',
    fechaTermino: '2024-06-12T12:00:00.000Z',
    estado: false,
    esInformativo: true
  },
  requirements: [
    'nombre completo 3',
    'nombre completo 2',
    'nombre completo 1'
  ]
}
console.log(oneProcedureUser)

const oneProcedureAdmin: OneProcedureAdminResponse = {
  tramite: {
    id: '8591b88c-cfe0-4231-9488-801335fdb529',
    nombre: 'trabajo opcional 5',
    descripcion: 'Este tramite te ayudara tramitar el servicio social',
    fechaInicio: '2024-02-01T06:00:00.000Z',
    fechaTermino: '2024-03-22T06:00:00.000Z',
    estado: false,
    esInformativo: true
  },
  requerimientos: [
    'nombre completo 2',
    'nombre completo 3',
    'nombre completo 1'
  ]
}

// REQUIREMENTS

console.log(oneProcedureAdmin)
interface Requirement {
  nombre: string
  descripcion: string
  id: string
}
export interface RequirementCreatedResponse extends MessageResponse {
  requirement: Requirement
}
export interface AllRequirementsResponse {
  requirements: Requirement[]
  total: number
}
