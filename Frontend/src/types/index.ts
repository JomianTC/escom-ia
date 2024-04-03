import { type ElementType } from 'react'

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

export interface TeachersDataResponse {
  data: {
    teachers: TeacherData[]
    total?: number
  }
}

export interface TeacherDataResponse {
  data: {
    profesor: TeacherData
  }
}
