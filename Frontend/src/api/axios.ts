import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { useRefreshToken } from './users/use-refresh-token'
import { getLocalStorage } from '@/utilities/localStorage.utlity'
const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://escom-ia.onrender.com'
// const BASE_URL = 'https://31nkm0vc-8080.usw3.devtunnels.ms'
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
    upload: '/upload',
    updateProfilePicture: '/update/profile-picture',
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
    getRequirments: '/',
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
  },
  ia: {
    client: BASE_URL + '/api/gptai',
    createComment: '/coment',
    askSomething: '/askSomething',
    validate: '/coment/validate'
  },
  procedures: {
    client: BASE_URL + '/api/procedure',
    // ?page=1&limit=10
    getProceduresAdmin: '/admin/findAll',
    getProceduresUser: '',
    // +id
    getProcedure: '/',
    // +id
    updateProcedure: '/',
    createProcedure: '/',
    // +id
    deleteProcedure: '/',
    givePermission: 'admin/',
    revokePermission: 'admin/'
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
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
  }
})
export const tagsClient = axios.create({
  baseURL: API_URLS.tagClient.client,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
  }
})

export const imageClient = axios.create({
  baseURL: API_URLS.userPictureClient.client,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
  }
})
export const iaClient = axios.create({
  baseURL: API_URLS.ia.client,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
  }

})
export const procedureClient = axios.create({
  baseURL: API_URLS.procedures.client,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
  }

})
export const requirmentClient = axios.create({
  baseURL: API_URLS.requirmentClient.client,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
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
