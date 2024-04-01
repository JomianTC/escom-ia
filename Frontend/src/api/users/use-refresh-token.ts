import { setLocalStorage } from '@/utilities'
import { apiClient } from '../axios'

export const fetchNewToken = async () => {
  try {
    const token: string = await apiClient
      .get('/renew')
      .then(res => res.data.token)
    return token
  } catch (error) {
    return null
  }
}

export async function useRefreshToken (failedRequest: any) {
  const newToken = await fetchNewToken()
  if (newToken != null) {
    failedRequest.response.config.headers.Authorization = 'Bearer ' + newToken
    // you can set your token in storage too
    setLocalStorage('token', { token: newToken })
    return await Promise.resolve(newToken)
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return await Promise.reject('error refreshing token')
}
