import { useTags } from '@/api/tags/use-get-tags'
import Loader from '@/components/Loader'
import { memo } from 'react'
import Element from './Element'

const Tags = memo(function Tags ({ handleSelect }: {
  handleSelect: (value: string, label: string) => Promise<void>
}) {
  const tags = useTags()
  if (tags.isLoading) {
    return (
        <div className='block '>
            <Loader bubbleContainerStyles='mt-20'/>
        </div>
    )
  }

  return (<div className='grow flex gap-2 flex-wrap justify-start items-start content-start h-full  overflow-y-scroll hide-scrollbar max-h-80'>
        {tags.data?.map((tag) => (
            <Element key={tag.value} value={tag.value} label={tag.label} type='tag' handleSelect={handleSelect} />
        ))}
    </div>)
}
)

export default Tags
