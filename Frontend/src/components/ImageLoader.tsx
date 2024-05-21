import { useEffect, useState } from 'react'

function ImageLoader (
  { externalUrl = '', localUrl = '/icons/placeholderuser.png', extraStyles = '', smallCard = false, alt = '' }: { externalUrl: string, localUrl?: string, extraStyles?: string, smallCard?: boolean, alt: string }
) {
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
    <>
      {loading
        ? (
          <img src={localUrl} alt="Robot escom++ carga" className={`${smallCard ? extraStyles : 'w-52'}` }/>
          )
        : (
          <img src={imageUrl} alt={alt} className={`${smallCard ? extraStyles : 'w-52'}` }/>
          )}
    </>
  )
}

export default ImageLoader
