import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, imageClient } from '../axios'

async function uploadImage (file: File) {
  const fileFormData = new FormData()
  fileFormData.append('file', file)
  console.log(file)

  const response = await imageClient.put(API_URLS.userPictureClient.updateProfilePicture, fileFormData)

  return response.data
}

export function useUploadImage () {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      console.log('Image uploaded')
      toast.success('Foto actualizada correctamente')
    }
  }
  )
}
