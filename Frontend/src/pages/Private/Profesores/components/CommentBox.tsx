import { type CommentByTeacher } from '@/types/api-responses'
import { getProfilePicture } from '@/utilities/userFormatter'
import { useState } from 'react'
import uuid from 'react-uuid'
import Tag from './Tag'
type CommentBoxProps = {
  comment: CommentByTeacher
}
export default function CommentBox ({ comment }: CommentBoxProps) {
  const [active, setActive] = useState(false)
  return (
    <article key={uuid()} className='white-border flex relative h-48'>
    {/* Columna Izquierda - Imagen y Tags */}
    <div className='flex flex-col gap-2 max-w-28'>
      <img className='w-14 h-14 md:w-16  md:h-16' src={getProfilePicture(comment.usuario.foto_perfil)} alt={comment.usuario.foto_perfil} />
        <div className={`flex flex-wrap  h-14 gap-2 custom-scrollbar transition-all ${active ? 'absolute top-0 bg-bg_100 w-full h-full left-0 white-border items-start justify-center' : 'items-center'}`} >
          {!active && comment.tags.map((tag) => (
            <Tag key={uuid()} tag={tag} abbr={true } />
          ))}
          {active && comment.tags.map((tag) => (
            <Tag key={uuid()} tag={tag} abbr={false } />
          ))}
          <span className='cursor-pointer border-2 rounded-xl px-[8px] text-xs mt-1' onClick={() => { setActive(!active) }}>
            {active ? 'Ocultar' : 'Ver más'}
      </span>
    </div>
    </div>
    {/* USER INFO */}
    <div>
      <p className='text-3xl font-bold text-primary_300'>{comment.usuario.nombres}</p>
      <p>{comment.comentario.comentario}</p>
    </div>
  </article>
  )
}
