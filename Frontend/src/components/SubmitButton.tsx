import { ApiLoader } from './ApiLoader'

export function SubmitButton ({ disabled, text = '' }: { disabled: boolean, text?: string }) {
  return (
    <button
    type="submit"
className="white-border flex justify-center font-semibold hover:bg-primary_200 hover:text-white  hover:shadow-none transition-all"
disabled={disabled}
>
{ disabled ? <ApiLoader/> : text}
</button>
  )
}
