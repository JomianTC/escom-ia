import { Link } from 'react-router-dom'
interface ProfesorCardProps {
  nombre?: string
  email?: string
  area?: string
  id?: string
  detail: boolean
  totalComments?: number
  children?: React.ReactNode
}
export function ProfesorCard ({ nombre, email, area, id = '/', detail, totalComments, children }: ProfesorCardProps) {
  return (
      <article className={`bg-bg_300 rounded-lg border-4 border-text_100 px-4 py-4 white-border  ${detail ? 'flex-col sm:flex-row sm:w-full flex sm:justify-evenly gap-2 md:h-full md:flex-col md:items-center justify-between ' : 'hover:scale-105 profesor__card '}`}>
      <img
        className={`w-20 h-20 rounded-full border-4 border-primary_300 ${detail ? 'w-32 h-32 sm:w-40 sm:h-40 self-center md:mx-auto my-auto md:my-0' : 'w-20 h-20'}`}
        src={'https://via.placeholder.com/150'}
        alt={nombre}
      />
      <div className={`flex flex-col leading-8   ${detail ? '' : 'justify-around '}`}>
        {!detail
          ? <Link to={id} ><h2 className='text-2xl text-text_100 hover:text-primary_300 font-bold '>
            {nombre}</h2>  </Link>
          : <h2 className={'text-6xl text-text_100 hover:text-primary_300 font-bold' }> {nombre}</h2> }
        {detail && (<p>Comentarios Totales: <span> {totalComments}</span></p>)}
        {detail && (<p>Comentarios: <span>{email}</span> </p>) }
        <p>Areá: <span>{area}</span> </p>
        <p>Email: <span>{email}</span> </p>
        <p>Puntuación General: <span> {area}</span></p>
        {children}
      </div>
    </article>
  )
}
