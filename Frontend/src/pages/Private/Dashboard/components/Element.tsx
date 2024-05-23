import { RemoveIcon } from '@/components/icons/Icons'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { openDeleteModal, setInfoModal } from '@/store/slices/uiSlice'
interface ElementProps {
  value: string
  label: string
  type: string
  handleSelect: (value: string, label: string) => Promise<void>
  children?: React.ReactNode
}
export default function Element ({ value, label, type, handleSelect, children }: ElementProps) {
  const dispatch = useAppDispatch()
  return (
      <div className='tag px-3 flex gap-2 py-1 rounded-lg sm:text-lg '>
          {children !== undefined ? children : <button onClick={async () => { await handleSelect(value, label) }} >{label}</button>}
    <button className='button-reset hover:text-primary_100 hover:text-red-600 font-bold px-4'
      onClick={() => {
        dispatch(openDeleteModal())
        dispatch(setInfoModal({ id: value, nombre: label, type }))
      }}>
          <RemoveIcon styles='w-6 h-6 stroke-red-400 fill-bg_300 stroke-primary_200 drop-shadow-lg hover:fill-red-800 transition-colors remove_icon' />
          </button>
  </div>
  )
}
