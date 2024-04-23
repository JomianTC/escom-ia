import '@/pages/Home/components/bubble-style.css'
import { useNavigate } from 'react-router-dom'
import { ReturnIcon } from './icons/Icons'

export function ReturnButton ({ styles = '' }: { styles?: string }) {
  const navigate = useNavigate()
  const goback = () => {
    // goBack()
    navigate(-1)
  }
  return (
        <>
          <button onClick={goback} className={`stage button absolute sm:w-12 sm:h-12  h-14 w-14  cursor-pointer z-50 outline-none border-none  ${styles !== '' ? styles : 'sm:left-0 sm:top-0 bottom-0 right-0'}`} type='button'>
              <figure className="ball bubble" style={{}}>
                  <ReturnIcon styles='stroke-bg_100 stroke-2 drop-shadow-lg fill-primary_100 p-1' />
              </figure>
          </button>
      </>
  )
}
