import { abbreviateWord } from '@/utilities/userFormatter'

interface TagProps {
  tag: string
  abbr?: boolean
}
export default function Tag ({ tag, abbr = true }: TagProps) {
  return (
<span className="tooltip tag " key={tag}>{abbr ? abbreviateWord(tag, 6) : tag}
      {abbr && (<span className="tooltip-text">{tag}</span>) }
</span>
  )
}
