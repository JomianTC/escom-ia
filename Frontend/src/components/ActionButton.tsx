export function ActionButton ({ callback, extraStyles = '', children, text = '', disabled = false }: { callback: () => void, extraStyles?: string, children?: React.ReactNode, text: string, disabled?: boolean }) {
  return (
      <button type="button" className={`px-2 py-1 border-2 border-primary_200 text-text_accent opacity-100 hover:bg-bg_200 hover:text-text_100 transition-colors hover:font-bold ${extraStyles}`} onClick={callback} disabled= {disabled}>
          {children}
            {text}
      </button>
  )
}
