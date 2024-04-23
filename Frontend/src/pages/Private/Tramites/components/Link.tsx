import { LinkIcon } from '@/components/icons/Icons'

interface LinkProps {
  link: string
  isMarkUpLink?: boolean
  enlace?: string
  contenido?: string
}

export function Link ({ link, isMarkUpLink = false, enlace, contenido }: LinkProps) {
  return isMarkUpLink
    // eslint-disable-next-line multiline-ternary
    ? (
          <details key={`${enlace}`} className='cursor-pointer px-2  rounded-lg py-1 italic select-none'>
            <summary className='px-4 py-2 rounded-lg w-fit bg-primary_op_100/20' >{contenido} <LinkIcon styles='w-6 h-6 fill-bg_300 stroke-primary_300 inline-block ml-2' /> </summary>
            ¿No puedes verlo?
            <a key={enlace} href={enlace} target='_blank' className='text-lg text-accent_100 font-bold hover:text-primary_200' rel="noreferrer">{contenido}</a>
        </details>
      ) : (<details className='cursor-pointer px-2  rounded-lg py-1 italic select-none'>
            <summary className='px-4 py-2 rounded-lg w-fit bg-primary_op_100/20' >Formulario de Google <LinkIcon styles='w-6 h-6 fill-bg_300 stroke-primary_300 inline-block ml-2' /> </summary>
            ¿No puedes verlo?
            <a key={link} href={link} target='_blank' className='text-lg text-accent_100 font-bold hover:text-primary_200' rel="noreferrer">   Dame click</a>
            {(link.includes('forms') || link.includes('forms')) &&
                (
                    <div>
                        {/* Agregando vista de google forms */}
                        <iframe src={link} width="100%" height="500px" />
                    </div>
                )
            }
        </details>
      )
}
