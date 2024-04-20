import { Bubble } from '@/pages/Home/components/Bubble'
import { useState } from 'react'

interface DetailProfesorProps {
  nombre?: string
  email?: string
  area?: string
  id?: string
  detail: boolean
  totalComments?: number
}
export function DetailProfessor ({ area, email, id, nombre, totalComments }: DetailProfesorProps) {
  const [showForm, setShowForm] = useState(false)
  return (
        <div className={`flip-card h-full relative ${showForm ? 'active' : ''}`} >
            <div className="flip-card-inner ">
                <div className="flip-card-front relative overflow-hidden justify-around">
                    <Bubble index='4' size='w-60 h-60' key={'bubble'} extraPos='top-[70%] left-[-40px] md:top-[70%] md:right-48' extraStyles={{ zIndex: 1, animation: 'none', opacity: 0.5 }} animation='none' />
                    <h2 className={'text-lg ss:text-xl md:text-3xl text-text_100 hover:text-primary_300 font-bold px-2'}> {nombre}</h2>
                    <img
                        className={'rounded-full border-4 border-primary_300 w-28 h-28 sm:w-38 md:w-52 sm:h-38 md:h-52 self-center md:mx-auto my-auto md:my-0'}
                        src={'https://via.placeholder.com/150'}
                        alt={nombre}
                    />
                    <button className='outline-none border-2 border-primary_200 w-fit self-center px-4 py-2 rounded-lg font-bold bg-bg_300 relative z-[100]' onClick={() => { setShowForm(!showForm) }}>Detalles</button>
                </div>
              <div className="flip-card-back justify-between">
                  <article className='flex h-full flex-col justify-center gap-4 md:gap-8 items-start mx-auto '>
                    <p className='font-bold text-xl md:text-2xl text-black'>Comentarios totales:  <span className='text-base font-normal text-accent_200 drop-shadow-xl md:text-lg '>100</span>  </p>
                    <p className='font-bold text-xl md:text-2xl text-black'>Area: <span className='text-base font-normal text-accent_200 drop-shadow-xl md:text-lg '>{area}</span></p>
                      <p className='font-bold text-xl md:text-2xl text-black'>Email: <span className='text-base font-normal text-accent_200 drop-shadow-xl md:text-lg '>{email}</span></p>
                      <p className='font-bold text-xl md:text-2xl text-black'>Comentarios Totales: <span className='text-base font-normal text-accent_200 drop-shadow-xl md:text-lg '>{totalComments}</span></p>
                  </article>

                    <button className='outline-none border-2 border-primary_200 w-fit self-center px-4 py-2 rounded-lg font-bold bg-bg_300 z-[5000] ' onClick={() => { setShowForm(!showForm) }}>Voltear</button>
                </div>
            </div>
        </div>
  )
}
