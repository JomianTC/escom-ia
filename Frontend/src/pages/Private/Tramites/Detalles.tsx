import { Calendar, Clock } from '@/components/icons/Icons'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { getDate } from '@/utilities/dateFormatter'
import { createMarkup } from '@/utilities/sanitize'
import { diffDays } from '@formkit/tempo'

export function Detalles () {
  const {
    nombre,
    descripcion,
    fechaInicio,
    fechaTermino,
    requerimientos,
    links
  } = useAppSelector((state) => state.procedure)

  console.log(descripcion)

  const fechaInicioFormateada = getDate(fechaInicio)
  const fechaFinFormateada = getDate(fechaTermino)
  const daysToExpire = diffDays(new Date(fechaTermino), new Date(fechaInicio)) ?? 0
  return (
    <div className='container form-glass bg-bg_200 relative mx-auto h-full z-[100] p-4'>
      <div className='backdrop-blur-3xl h-full rounded-lg overflow-hidden overflow-y-scroll sm:overflow-hidden hide-scrollbar'>
        <h1 className='font-bold text-center text-4xl sm:text-5xl md:text-6xl text-accent_100 drop-shadow-lg'>{nombre}</h1>
        <div className='flex h-full flex-col sm:flex-row '>
          {/* Columna detalles  */}
          <div className="flex flex-row justify-center md:justify-start w-fit gap-1 sm:gap-6  md:border-r-4 border-r-accent_100 border-b-8 border-b-accent_100  md:border-separate  sm:grow-0 grow h-fit sm:h-full flex-wrap p-2 md:p-2 items-start content-start sm:max-w-[320px] ">
            <p className='text-lg text-primary_200 flex flex-col items-start font-bold grow-0 basis-0 h-fit'>
              Inicio
              <span className='px-2 sm:px-4 mt-1 sm:mt-4 py-2 flex items-center gap-2 rounded-lg border-2 border-accent_100 text-text_100 font-light text-base shadow-lg drop-shadow-sm shadow-primary_200'>
                <span><Calendar styles='w-6 h-6 stroke-text_100 fill-bg_200 stroke-primary_200 drop-shadow-lg' /></span>{fechaInicioFormateada}</span>
            </p>
            <p className='text-lg flex flex-col items-start font-bold text-accent_100 grow-0 basis-0 h-fit'>
              Termino
              <span className='px-2 sm:px-4 mt-1 sm:mt-4 py-2 flex items-center gap-2 rounded-lg border-2 border-accent_100 text-text_100 font-light text-base shadow-lg drop-shadow-sm shadow-primary_200'>
                <span><Calendar styles='w-6 h-6 stroke-text_100 fill-bg_200 stroke-primary_200 drop-shadow-lg' /></span> {fechaFinFormateada}</span>
            </p>
            <p className='text-lg flex items-center gap-2 font-bold text-accent_100 grow basis-full mt-4 sm:mt-1 px-2 md:px-2 h-fit italic'>
              <Clock styles='w-6 h-6 stroke-text_100 fill-bg_200 stroke-primary_200 drop-shadow-lg' />
              <span className=''> {isNaN(daysToExpire) ? '---' : daysToExpire } días</span>
            </p>
            {/* Label container */}
            <div className='w-full flex flex-wrap gap-2 requeriments-container min-h-24 max-h-52  overflow-hidden overflow-y-scroll custom-scrollbar px-6 py-3 sm:px-2'>
              <h4 className='grow w-full text-accent_100 font-bold text-3xl '>Requisitos</h4>
              {requerimientos?.length > 0 && requerimientos.map((requerimiento: string) => (
                <span key={requerimiento} className='px-3 py-1  rounded-lg italic border-2 border-accent_100 text-black  label-glass '>{requerimiento }</span>
              )) }
            </div>
          </div>
          {/* Columna descripción */}
          <div className=' grow h-full max-h-full overflow-y-scroll hide-scrollbar mt-8 px-4 py-2 w-full'>
            <h3 className='text-2xl md:text-4xl'>Detalles del trámite</h3>
            <div className='text-lg p-3 w-full' dangerouslySetInnerHTML={createMarkup(descripcion)}></div>
          </div>
        </div>

      </div>
    </div>
  )
}
