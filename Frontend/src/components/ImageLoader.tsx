import { useEffect, useState } from 'react'

function ImageLoader ({ externalUrl = '', localUrl = '/icons/placeholderuser.png' }: { externalUrl: string, localUrl?: string }) {
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState(localUrl)

  useEffect(() => {
    const externalImage = new Image()
    externalImage.onload = () => {
      setImageUrl(externalUrl)
      setLoading(false)
    }
    externalImage.src = externalUrl
  }, [externalUrl])

  return (
    <div>
      {loading
        ? (
        <img src={localUrl} alt="Local Image" className='w-52' />
          )
        : (
        <img src={imageUrl} alt="External Image" className='w-52' />
          )}
    </div>
  )
}

export default ImageLoader
