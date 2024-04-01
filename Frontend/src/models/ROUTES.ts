import { Home } from '@/pages/Home/Home'
import { ChatbotPage } from '@/pages/Private/Chatbot/ChatbotPage'
import { ProfesoresPage } from '@/pages/Private/Profesores/ProfesoresPage'
import { TramitesPage } from '@/pages/Private/Tramites/TramitesPage'
import { type IRoute } from '@/types/index'

import { lazy } from 'react'

const Dashboard = lazy(async () => await import('@/pages/Private/Dashboard/Dashboard'))
const Login = lazy(async () => await import('@/pages/Login/Login'))
const Register = lazy(async () => await import('@/pages/Register/Register'))
const Private = lazy(async () => await import('@/pages/Private/Private'))

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
    name: 'dashboard'
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
    name: 'Profesores'
  },
  TRAMITES: {
    path: 'tramites',
    component: TramitesPage,
    navPath: 'tramites',
    name: 'Tramites'
  },
  IA: {
    path: 'ia',
    component: ChatbotPage,
    navPath: 'ia',
    name: 'Chatbot'
  }
}

export const PRIVATE_ROUTES = Object.keys(PRIVATE_ROUTES_MODEL).map(key => PRIVATE_ROUTES_MODEL[key])
