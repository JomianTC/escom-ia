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
          <button onClick={goback} className={`inline-block sm:w-12 sm:h-12  h-14 w-14  cursor-pointer z-50 outline-none focus-within:border-none border-none focus:border-none focus:outline-none active:scale-90 transition-all   ${styles !== '' ? styles : 'sm:left-0 sm:top-0 bottom-0 right-0'}`} type='button'>
                  <ReturnIcon styles='stroke-primary_200 stroke-2 drop-shadow-lg fill-none p-1' />
          </button>
      </>
  )
}
