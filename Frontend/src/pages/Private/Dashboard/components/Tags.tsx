import { useTags } from '@/api/tags/use-get-tags'
import Loader from '@/components/Loader'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { openDeleteModal, setInfoModal } from '@/store/slices/uiSlice'
import { memo } from 'react'

const Tags = memo(function Tags ({ handleSelect }: {
  handleSelect: (value: string, label: string) => Promise<void>
}) {
  const tags = useTags()
  const dispatch = useAppDispatch()

  if (tags.isLoading) {
    return (
        <div className='block '>
            <Loader bubbleContainerStyles='mt-20'/>
        </div>
    )
  }

  return (<div className='grow flex gap-2 flex-wrap justify-start items-start content-start h-full  overflow-y-scroll custom-scrollbar max-h-80'>
        {tags.data?.map((tag) => (
            <div key={tag.value} className='tag px-3 flex gap-2 py-1 rounded-lg sm:text-lg '>
                <button onClick={async () => {
                  await handleSelect(tag.value, tag.label)
                }} >{tag.label}</button>
                <button className='hover:text-primary_100 font-bold px-4'
                    onClick={() => {
                      dispatch(openDeleteModal())
                      dispatch(setInfoModal({ id: tag.value, nombre: tag.label, type: 'tag' }))
                    }}
                >x</button>
            </div>
        ))}
    </div>)
}
)

export default Tags
