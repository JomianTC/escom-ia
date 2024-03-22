import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/users/',
  headers: {
    'Content-Type': 'application/json'
  }
})
export const teacherClient = axios.create({
  baseURL: 'http://localhost:3000/teachers/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS'
} as const
