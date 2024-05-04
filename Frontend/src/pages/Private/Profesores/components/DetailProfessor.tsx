import { BuildIcon, CommentIcon, MailIcon } from '@/components/icons/Icons'
import { Bubble } from '@/pages/Home/components/Bubble'
import { useState } from 'react'

interface DetailProfesorProps {
  nombre?: string
  email?: string
  area?: string
  id?: string
  detail: boolean
  totalComments?: number
  foto_perfil?: string
}
export function DetailProfessor ({ area, email, nombre, totalComments, foto_perfil: fotoPerfil = 'https://via.placeholder.com/150' }: DetailProfesorProps) {
  const [showForm, setShowForm] = useState(false)
  return (
    <div className={`flip-card h-full relative ${showForm ? 'active' : ''}`} >
      <div className="flip-card-inner ">
        <div className="flip-card-front relative overflow-hidden justify-around">
          <Bubble index='4' size='w-60 h-60' key={'bubble'} extraPos='top-[70%] left-[-40px] md:top-[70%] md:right-48' extraStyles={{ zIndex: 1, animation: 'none', opacity: 0.5 }} animation='none' />
          <h2 className={'text-lg ss:text-xl md:text-3xl text-text_100 hover:text-primary_300 font-bold px-2'}> {nombre}</h2>
          <img
            className={'rounded-full border-4 border-primary_300 w-28 h-28 sm:w-38 md:w-52 sm:h-38 md:h-52 self-center md:mx-auto my-auto md:my-0'}
            src={fotoPerfil}
            alt={nombre}
          />
          <button className='outline-none border-2 border-primary_200 w-fit self-center px-4 py-2 rounded-lg font-bold bg-bg_300 relative z-[100]' onClick={() => { setShowForm(!showForm) }}>Detalles</button>
        </div>
        <div className="flip-card-back justify-center md:gap-6 z-[6000]">
          <article className='grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8 p-6  items-start mx-auto '>
            <CardIcon text={area ?? ''} cols='' color='bg-primary_op_100/50'>
              <BuildIcon styles='w-8 h-8 md:w-14 md:h-14 stroke-bg_300 fill-accent_100 drop-shadow-lg' />
            </CardIcon>

            <CardIcon text={totalComments} cols='' color='bg-primary_op_100/50'>
              <CommentIcon styles='w-8 h-8 md:w-14 md:h-14 stroke-bg_300 fill-accent_100 drop-shadow-lg' />
            </CardIcon>

            <CardIcon text={email} cols='col-span-2' color='bg-primary_op_100/50'>
              <MailIcon styles='w-8 h-8 md:w-14 md:h-14 stroke-bg_300 fill-accent_100 drop-shadow-lg' />
            </CardIcon>

          </article>

          <button className='outline-none border-2 border-primary_200 w-fit self-center px-4 py-2 rounded-lg font-bold bg-bg_300 z-[5000] ' onClick={() => { setShowForm(!showForm) }}>Voltear</button>
        </div>
      </div>
    </div>
  )
}

interface CardIconProps {
  text?: string | number
  children: React.ReactNode
  cols?: string
  color?: string
}
const CardIcon = ({ text = '', children, cols = '', color = '' }: CardIconProps) => {
  return (
    <div className={`flex flex-col gap-4 items-center ${cols}` }>
      <div className={`flex flex-col rounded-full bg-primary_100 border-4 justify-center w-fit p-2 sm:p-4 ${color}` }>
      {children}
    </div>
    <span className='bg-primary_op_100/40 shadow-lg rounded-sm w-full px-2  text-sm sm:text-base font-semibold text-black tracking-wider italic  '>{text}</span>
  </div>
  )
}