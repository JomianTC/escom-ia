import './bubble-style.css'
interface BubbleProps {
  index: string
  top: string
  right?: string
  left?: string
  size: string
  extraStyles?: React.CSSProperties
}

interface BubbleStyles extends React.CSSProperties {
  '--i': string
}

export function Bubble ({ index, top, right, left, size, extraStyles }: BubbleProps) {
  const customStyles: BubbleStyles = {
    '--i': `${index}s`,
    top,
    right,
    left,
    ...extraStyles
  }
  return (
      <section className={`-z-10 stage absolute ${size} `} style={customStyles}>
      <figure className="ball bubble"></figure>
</section>
  )
}
