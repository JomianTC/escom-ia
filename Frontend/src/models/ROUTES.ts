import { Home } from '@/pages/Home/Home'
import { ChatbotPage } from '@/pages/Private/Chatbot/ChatbotPage'
import { ComentariosPage } from '@/pages/Private/Comentarios/ComentariosPage'
import ProfesoresPage from '@/pages/Private/Profesores/ProfesoresPage'

import { TramitesPage } from '@/pages/Private/Tramites/TramitesPage'
import { type IRoute } from '@/types/index'

import { lazy } from 'react'

const Dashboard = lazy(async () => await import('@/pages/Private/Dashboard/Dashboard'))
const Login = lazy(async () => await import('@/pages/Login/Login'))
const Register = lazy(async () => await import('@/pages/Register/Register'))

export const PUBLIC_ROUTES_MODEL: Record<string, IRoute> = {
  LOGIN: {
    path: 'login',
    component: Login,
    navPath: 'private',
    name: 'Private'
  },
  REGISTER: {
    path: 'register',
    component: Register,
    navPath: 'private',
    name: 'Private'
  },
  HOME: {
    path: 'home',
    component: Home,
    navPath: 'private',
    name: 'Private'
  }
}

export const ADMIN_ROUTES = {
  ADMIN: 'admin'

}

export const PRIVATE_ROUTES_MODEL: Record<string, IRoute> = {
  PRIVATE: {
    path: 'private',
    component: Dashboard,
    navPath: 'private',
    name: 'Private'
  },
  DASHBOARD: {
    path: 'dashboard',
    component: Dashboard,
    navPath: 'dashboard',
    name: 'Dashboard',
    imageUri: '/icons/home.webp'
  },
  HOME: {
    path: 'home',
    component: Home,
    navPath: 'home',
    name: 'Home'
  },
  PROFESORES: {
    path: 'profesores/*',
    component: ProfesoresPage,
    navPath: 'profesores',
    name: 'Profesores',
    imageUri: '/icons/teachers.webp'
  },
  TRAMITES: {
    path: 'tramites/*',
    component: TramitesPage,
    navPath: 'tramites',
    name: 'Tramites',
    imageUri: '/icons/document.webp'
  },
  IA: {
    path: 'ia',
    component: ChatbotPage,
    navPath: 'ia',
    name: 'Chatbot',
    imageUri: '/icons/placeholderuser.png'
  },
  COMMENTS: {
    path: 'comments',
    component: ComentariosPage,
    navPath: 'comments',
    name: 'Comentarios',
    imageUri: '/icons/placeholderuser.png'
  }
}

const ROUTES_TO_IGNORE = ['private', 'home', 'comments']

export const PRIVATE_ROUTES = Object.keys(PRIVATE_ROUTES_MODEL).map(key => PRIVATE_ROUTES_MODEL[key])
export const NAV_ROUTES = PRIVATE_ROUTES.filter(route => !ROUTES_TO_IGNORE.includes(route.navPath))
