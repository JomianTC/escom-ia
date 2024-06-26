import { ApiLoader } from './ApiLoader'

export function SubmitButton ({ disabled, text = '', styles = '' }: { disabled: boolean, text?: string, styles?: string }) {
  return (
    <button
    type="submit"
      className={`white-border flex justify-center font-semibold hover:bg-primary_200 hover:text-white  hover:shadow-none transition-all ${styles}` }
disabled={disabled}
>
{ disabled ? <ApiLoader/> : text}
</button>
  )
}
