import { setLocalStorage } from '@/utilities'
import { API_URLS, apiClient } from '../axios'

export const fetchNewToken = async () => {
  try {
    const token: string = await apiClient
      .get(API_URLS.apiClient.checkToken)
      .then(res => res.data.token)
    return token
  } catch (error) {
    return null
  }
}

export async function useRefreshToken (failedRequest: any) {
  // Peticion a la ruta users/renew
  const newToken = await fetchNewToken()

  if (newToken != null) {
    failedRequest.response.config.headers.Authorization = 'Bearer ' + newToken
    // you can set your token in storage too
    setLocalStorage('token', newToken)
    return await Promise.resolve(newToken)
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return await Promise.reject('error refreshing token')
}
