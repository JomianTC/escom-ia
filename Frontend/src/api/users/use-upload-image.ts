import { useMutation } from '@tanstack/react-query'
import { API_URLS, imageClient } from '../axios'

async function uploadImage (file: File) {
  const fileFormData = new FormData()
  fileFormData.append('file', file)

  const response = await imageClient.put(API_URLS.userPictureClient.updateProfilePicture, fileFormData)

  return response.data
}

export function useUploadImage () {
  return useMutation({
    mutationFn: uploadImage
  }
  )
}
