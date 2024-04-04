import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { useRefreshToken } from './users/use-refresh-token'
const BASE_URL = 'http://localhost:3000'
export const API_URLS = {
  apiClient: {
    client: BASE_URL + '/api/auth',
    registerUser: '/register',
    registerAdmin: '/register/admin',
    loginUser: '/login',
    loginAdmin: '/login/admin',
    checkToken: '/check-auth'
  },
  userPictureClient: {
    client: BASE_URL + '/api/user',
    updateProfilePicture: '/update-picture',
    deleteProfilePicture: '/delete-picture'
  },
  teacherClient: {
    client: BASE_URL + '/api/teacher',
    // ?page=1&limit=10
    getTeachers: '/',
    // +id
    getTeacher: '/',
    // +id
    updateTeacher: '/',
    // +id
    updateProfilePicture: '/profile-picture/',
    createTeacher: '/',
    // +id
    deleteTeacher: '',
    // +id
    deletePicture: '/profile-picture/'
  },
  commentsClient: {
    client: BASE_URL + '/api/coment',
    // +id?page=1&limit=10,
    getCommentsByTeacher: '/teacher/',
    // +id
    getComment: '/',
    // +id
    updateComment: '/',
    //
    createComment: '/',
    // +id
    deleteComment: '/'
  },
  tagClient: {
    client: BASE_URL + '/api/tag',
    //  ?page=1&limit=10
    getTags: '',
    // +id
    updateTags: '/',
    createTag: '/',
    // +id
    deleteTag: '/'
  },
  requirmentClient: {
    client: BASE_URL + '/api/requirements',
    // ?page=1&limit=10
    getRequirments: '',
    // +id
    updateRequirments: '/',
    createRequirment: '/',
    // +id
    deleteRequirment: '/'
  },
  notificationRoutes: {
    client: BASE_URL + '/api/notification',
    getVapidKey: '/key',
    // +id
    getProcedureNotification: '/subscription/',
    // +id
    createProcedureSubscription: '/subscription/',
    checkDeviceNotification: '/checkDevice',
    // +id
    deleteSubscription: '/subscription/',
    deleteCheckDeviceNotification: ''
  }
}
export const apiClient = axios.create({
  baseURL: API_URLS.apiClient.client,
  headers: {
    'Content-Type': 'application/json'
  }
})
export const teacherClient = axios.create({
  baseURL: API_URLS.teacherClient.client,
  headers: {
    'Content-Type': 'application/json'
  }
})
createAuthRefreshInterceptor(teacherClient, useRefreshToken, {
  statusCodes: [401, 403],
  pauseInstanceWhileRefreshing: true
})
export const commentsClient = axios.create({
  baseURL: API_URLS.commentsClient.client,
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
