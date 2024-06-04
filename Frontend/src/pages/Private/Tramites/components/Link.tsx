import { DonwloadIcon, Fileicon, FormIcon, ImageIcon, LinkIcon } from '@/components/icons/Icons'

interface LinkProps {
  link: string
  isMarkUpLink?: boolean
  enlace?: string
  contenido?: string
}

function getTypeOfLink (link: string) {
  // Revisando si el link es una images
  const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i
  // Revisando si el link es un formulario de google
  const googleForms = /(forms|file)/gi
  // Revisando si el link es un pdf
  const pdf = /(pdf)/gi
  // Revisando si el link es un documento de word
  const doc = /doc/gi

  if (allowedExtensions.exec(link) != null) {
    return 'image'
  } else if (googleForms.exec(link) != null) {
    return 'googleForm'
  } else if (pdf.exec(link) != null) {
    return 'pdf'
  } else if (doc.exec(link) != null) {
    return 'doc'
  } else {
    return 'link'
  }
}

const ICONS = {
  image: <ImageIcon styles='stroke-primary_300 fill-primary_100 w-8 ' />,
  googleForm: <FormIcon styles='stroke-primary_300 fill-primary_100 w-8 ' />,
  pdf: <Fileicon styles='stroke-primary_300 fill-primary_100 w-8 ' />,
  doc: <DonwloadIcon styles='stroke-primary_300 fill-primary_100 w-8 '/>,
  link: <LinkIcon styles='stroke-primary_300 fill-primary_100 w-8 '/>
}

export function Link ({ link, isMarkUpLink = false, contenido }: LinkProps) {
  const summaryText = getTypeOfLink(link)
  const [toLink, tiulo] = link.split(',')

  return isMarkUpLink
    // eslint-disable-next-line multiline-ternary
    ? (
      <details className='cursor-pointer px-2  rounded-lg py-1 italic select-none'>
        <summary className='px-4 py-2 rounded-lg w-fit bg-primary_op_100/20' >{contenido}Dame click <LinkIcon styles='w-6 h-6 fill-bg_300 stroke-primary_300 inline-block ml-2' /> </summary>
        ¿No puedes verlo?
        <a href={link} target='_blank' className='text-lg text-accent_100 font-bold hover:text-primary_200' rel="noreferrer">Dame click</a>
        {getTypeOfLink(link) === 'doc' &&
          <>
          <a href={link} target='_blank' className='text-lg text-accent_100 font-bold hover:text-primary_200' rel="noreferrer">Descargar Archivo</a>
        </>
      }
      </details>
      ) : (
      <details className='cursor-pointer px-2  rounded-lg py-1 italic select-none'>
      <summary className='px-2 py-2 flex flex-row-reverse items-end justify-start rounded-lg w-fit bg-primary_op_100/20 font-semibold gap-2' > {tiulo} {ICONS[summaryText]}
      </summary>
      { getTypeOfLink(toLink) === 'googleForm' &&
        (
          <>
            {/* Agregando vista de google forms */}
            <iframe src={toLink.replace(/\bview\b/g, 'preview')} width="100%" height="500px" allow='autoplay' />
          </>
        )
      }
      {getTypeOfLink(toLink) === 'image' &&
        <a href={toLink} target='_blank' rel="noreferrer">
          <img src={toLink} alt={contenido} className='w-full h-full' />
        </a>}
      {getTypeOfLink(toLink) === 'pdf' &&
        <>
          <a href={toLink} target='_blank' className='text-lg text-accent_100 font-bold hover:text-primary_200' rel="noreferrer">Visualizar en otra ventana</a>
          <embed src={toLink} type="application/pdf" width="100%" height="500px" />
        </>
      }
    {getTypeOfLink(toLink) === 'doc' &&
        <>
          <a href={toLink} target='_blank' className='text-lg text-accent_100 font-bold hover:text-primary_200' rel="noreferrer">Descargar Archivo</a>
        </>
      }
      <p className='font-bold'>¿No puedes verlo?</p>
      <p>Ingresa al tipo de archivo desde este link: <a className='underline underline-offset-2 font-bold' href={link}>Click {tiulo }</a>  </p>
    </details>
      )
}

// <iframe src="https://drive.google.com/file/d/10EbucvagLomfz-h_iscs3HF81brbnhXu/preview" width="640" height="480" allow="autoplay"></iframe>
// https://drive.google.com/file/d/10EbucvagLomfz-h_iscs3HF81brbnhXu/view
