import { Link } from 'react-router-dom'
interface ProfesorCardProps {
  nombre?: string
  email?: string
  area?: string
  id?: string
}
export function ProfesorCard ({ nombre, email, area, id = '/' }: ProfesorCardProps) {
  return (
      <article className='bg-bg_300 rounded-lg border-4 border-text_100 px-4 py-4 white-border profesor__card'>
      <img
        className='w-20 h-20 rounded-full border-4 border-primary_300'
        src={'https://via.placeholder.com/150'}
        alt={nombre}
      />
      <div className='flex flex-col leading-8 h-full justify-around'>
        <Link to={id} ><h2 className='text-2xl text-text_100 hover:text-primary_300 font-bold '>
          {nombre}</h2>  </Link>
        <p>Comentarios: <span>{email}</span> </p>
        <p>Areá: <span>{area}</span> </p>
        <p>Puntuación General: <span> {area}</span></p>
      </div>
    </article>
  )
}
