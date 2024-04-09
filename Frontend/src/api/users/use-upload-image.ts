import { useMutation } from '@tanstack/react-query'
import { API_URLS, imageClient } from '../axios'

async function uploadImage (file: File) {
  const fileFormData = new FormData()
  fileFormData.append('file', file)
  const response = await imageClient.post(API_URLS.userPictureClient.upload, fileFormData)
  console.log(response)

  return response.data
}

export function useUploadImage () {
  return useMutation({
    mutationFn: uploadImage
  })
}
