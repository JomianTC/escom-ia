import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { useRefreshToken } from './users/use-refresh-token'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/auth/',
  headers: {
    'Content-Type': 'application/json'
  }
})
export const teacherClient = axios.create({
  baseURL: 'http://localhost:3000/api/teachers/',
  headers: {
    'Content-Type': 'application/json'
  }
})
createAuthRefreshInterceptor(teacherClient, useRefreshToken, {
  statusCodes: [401, 403],
  pauseInstanceWhileRefreshing: true
})

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS'
} as const
