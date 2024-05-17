import { useEffect, useState } from 'react'

function ImageLoader ({ externalUrl = '', localUrl = '/icons/placeholderuser.png', extraStyles = '', smallCard = false }: { externalUrl: string, localUrl?: string, extraStyles?: string, smallCard?: boolean }) {
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
          <img src={localUrl} alt="Local Image" className={`${smallCard ? extraStyles : 'w-52'}` }/>
          )
        : (
        <img src={imageUrl} alt="External Image" className={`${smallCard ? extraStyles : 'w-52'}` }/>
          )}
    </>
  )
}

export default ImageLoader
