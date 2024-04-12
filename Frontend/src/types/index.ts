import { type ElementType } from 'react'
export const LEVEL_ACCESS = {
  ADMIN: 'admin',
  STUDENT: 'student',
  INVITED: 'invited'
}

export type Admin = {
  id: string
  identificador: string
  nombre: string
  email: string
  area: string
}
export type Student = Partial<{
  nombres: string
  boleta: string
  foto_perfil?: string
  apellidos: string
  contrasena: string
  email_academico: string
  email_recuperacion: string
  programa_academico: string
}>
export type StudentLogged = Student & {
  id: string
  loggedIn: boolean
  rol: string
}
export type LoginData = {
  contrasena: Student['contrasena']
  boleta: Student['boleta']
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any

export type IRoute = {
  path: string
  component: ElementType
  navPath: string
  name: string
  imageUri?: string
}

export interface TeacherFormData {
  nombre: string
  area: string
  grado_academico: string
  email: string
  contacto: string
}
export interface TeacherData extends TeacherFormData {
  id: string
  foto_perfil: string
}
export type Tag = {
  id: string
  nombre: string
}
export type FormattedInputTags = {
  label: string
  value: string
}
// TODOS LOS PROFESORES
export interface TeachersDataResponse {
  data: {
    profesores: TeacherData[]
    total?: number
  }
}
// UN PROFESOR
export interface TeacherDataResponse {
  data: TeacherData
}
type Tags = string[]
// Informacion necesaria para crear un comentario
export interface ComentarioInfo {
  id_profesor: string
  puntuacion: number
  comentario: string
  tags: Tags
}

export interface TeacherCreatedResponse {
  message: string
  profesor: TeacherData
}

export interface TeacherUpdatedRespose extends TeacherCreatedResponse { }
export interface TeacherRemovedRespose {
  message: string
}

export interface UpdatePictureProfessor {
  message: string
  foto_perfil: string
}
export interface RemoveProfilePicture {
  message: string
}

export interface LoginUserResponse {
  message: string
  usuario: Student
  token: string
}
export interface RegisterUserResponse {
  message: string
  usuario: Student
}
export interface LoginAdminResponse {
  message: string
  admin: Admin
  token: string
}
export interface RegisterAdminResponse {
  message: string
  admin: Admin
}
export interface TagsResponse {
  tags: Tag[]
  total: number
}
export interface TagsCreatedResponse {
  message: string
}

export interface LoginAdminData {
  email: string
  id: string
}
