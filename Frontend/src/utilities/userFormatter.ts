import { getLocalStorage } from './localStorage.utlity'

export function getProfilePicture (photo: string) {
  if (photo === '') {
    return 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
  }
  return photo
}
export function abbreviateWord (word: string, length: number = 5) {
  return word.split('').slice(0, length).join('') + '...'
}

export function authHeadersFormat () {
  const token = getLocalStorage('token').value?.trim() ?? ''
  if (token === '') {
    return {
      headers: {}
    }
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
