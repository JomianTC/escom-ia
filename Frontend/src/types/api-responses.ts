interface UsuarioCreado {
  nombres: string
  apellidos: string
  boleta: string
  email_academico: string
  email_recuperacion: string
  programa_academico: string
  foto_perfil: string
  id: string
}

export interface StudentCreatedResponse {
  mensaje: string
  usuario: UsuarioCreado
}

export interface UsuarioLoginResponse {
  mensaje: string
  token: string
  usuario: UsuarioCreado
}

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
export type FindOneCommentResponse = CommentByTeacher

// Procedures Routes To Users
export interface Procedure {
  id: string
  nombre: string
  descripcion: string
  //     fechaInicio: 2024-06-11T12:00:00.000Z
  fechaInicio: string
  fechaTermino: string
  estado: boolean
  esInformativo: boolean
  links: string[]
  requerimientos: string[]
}
export interface OneProcedureUserResponse extends Procedure {
  requerimientos: string[]
}
export interface AllProceduresUserResponse {
  tramites: Procedure[]
  total: number
}
export interface ProcedureContent {
  tramite: Procedure
  requerimientos: string[]
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
  tramites: ProcedureContent[]
  total: number
}
export interface OneProcedureAdminResponse extends Procedure {
  requerimientos: string[]
}

export interface CreateProcedure {
  id: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaTermino: string
  estado: boolean
  esInformativo: boolean
  links: string[]
  requerimentos: string[]
}

// REQUIREMENTS

interface Requirement {
  nombre: string
  descripcion: string
  id: string
}
export interface RequirementCreatedResponse extends MessageResponse {
  requerimiento: Requirement
}
export interface AllRequirementsResponse {
  requerimientos: Requirement[]
  total: number
}
