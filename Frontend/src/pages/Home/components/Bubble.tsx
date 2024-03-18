import './bubble-style.css'
interface BubbleProps {
  index: string
  top: string
  right?: string
  left?: string
  size: string
}

interface BubbleStyles extends React.CSSProperties {
  '--i': string
}

export function Bubble ({ index, top, right, left, size }: BubbleProps) {
  const customStyles: BubbleStyles = {
    '--i': `${index}s`,
    top,
    right,
    left
  }
  return (
      <section className={`-z-10 stage absolute ${size} `} style={customStyles}>
      <figure className="ball bubble"></figure>
</section>
  )
}
