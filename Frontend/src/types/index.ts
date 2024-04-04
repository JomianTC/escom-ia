import { type ElementType } from 'react'
export type Admin = {
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
  _id: string
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

export interface TeacherData {
  id: string
  nombre: string
  area: string
  grado_academico: string
  email: string
  contacto: string
  foto_perfil: string
}

// TODOS LOS PROFESORES
export interface TeachersDataResponse {
  data: {
    teachers: TeacherData[]
    total?: number
  }
}
// UN PROFESOR
export interface TeacherDataResponse {
  data: {
    teacherFound: TeacherData
  }
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
  teacher: TeacherData
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
  user: Student
  token: string
}
export interface RegisterUserResponse {
  message: string
  user: Student
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
