import { StarComponent } from '@/components/StarRating'
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
  const showTags = comment.tags.length > 2

  return (
    <article key={uuid()} className='white-border flex relative h-48  text-white comment-box overflow-hidden z-30 gap-2 sm:gap-4'>
      {/* Columna Izquierda - Imagen y Tags */}
      <div className='flex flex-col gap-2 basis-20 sm:basis-32 min-w-20 md:min-w-32 '>
        <img className='w-14 h-14 md:w-16 md:h-16' src={getProfilePicture(comment.usuario.foto_perfil)} alt={comment.usuario.nombres} />
        <div className={`flex flex-col-reverse sm:flex-row sm:flex-wrap gap-2 custom-scrollbar transition-all ${active ? 'absolute top-0 bg-bg_100 w-full h-full left-0 white-border items-start justify-center' : 'items-start'}`} >
        {showTags && (
            <span className='cursor-pointer border-2 border-primary_200 rounded-lg px-[8px] text-xs mt-1' onClick={() => { setActive(!active) }}>
              {active ? 'Ocultar' : 'Ver más'}
            </span>
        )}
          {(!active && showTags) && comment.tags.map((tag) => (
            <Tag key={uuid()} tag={tag} abbr={true} />
          ))}
          {(active && showTags) && comment.tags.map((tag) => (
            <Tag key={uuid()} tag={tag} abbr={false} />
          ))}

        </div>
      </div>
      {/* USER INFO */}
      <div className='flex flex-col shrink-[4] overflow-y-scroll hide-scrollbar'>
        <div className='flex items-center gap-2 sm:gap-4 '>
          <p className='text-xl sm:text-2xl font-bold text-text_200'>{comment.usuario.nombres + ' ' + comment.usuario.apellidos}</p>
          <span className='text-sm text-text_200 italic'>{comment.comentario.fecha}</span>
        </div>
        <div className='flex grow flex-col justify-between pb-6 text-text_200'>
          <p>{comment.comentario.comentario}</p>
          <StarComponent rating={comment.comentario.puntuacion} />
        </div>
      </div>
    </article>
  )
}
