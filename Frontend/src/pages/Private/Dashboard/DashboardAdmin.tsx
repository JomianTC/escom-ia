import { useFormik } from 'formik'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export function DashboardAdmin () {
  const [expand, setExpand] = useState(false)
  const handleExpand = () => {
    setExpand(!expand)
  }
  return (
    <section className="container p-8 w-full h-full my-0 mx-auto grid gap-2 sm:gap-6 relative grid-cols-4 z-50">
      {/* Lado preguntas recientes */}
          <aside className={`border-4 bg-bg_200 flex flex-col  ${expand ? 'absolute w-full h-full top-0 left-0 z-[50] ' : 'hidden sm:flex '}`}>
              <NavLink to='/' className='p-4 text-lg font-semibold border-primary_200 cursor-pointer'>
                  Dashboard Admin </NavLink>
              <NavLink to='profesores' className='p-4 text-lg font-semibold border-primary_200 cursor-pointer'>
                  Profesores </NavLink>
              <NavLink to='editarTags' className='p-4 text-lg font-semibold border-primary_200 cursor-pointer'>
                  Tags </NavLink>
      </aside>
      {/* Lado chatbot */}
      <article className="chatbot__container col-span-full sm:col-span-3  p-4 rounded-lg flex flex-col h-full justify-between glass ">
        <header className="chatbot__header bg-primary_200 p-4 flex items-center justify-between rounded-md">
          <h1 className="text-2xl font-bold text-white">Modifica algún tag</h1>
          <button onClick={handleExpand} className="bg-primary_100 p-2 rounded-full block md:hidden ">
            <img src="/icons/expand.webp" alt="expand" />
          </button>
        </header>
        <Outlet />
      </article>
    </section>
  )
}

export const EditarTags = () => {
  const formik = useFormik({
    initialValues: {
      tag: ''
    },
    onSubmit: async (values) => {
      console.log(values)
    }
  })
  const handleSelect = async (values: string) => {
    await formik.setFieldValue('tag', values)
  }
  return (
      <div className='grow flex flex-col mt-8'>
          <div className='grow flex gap-2 flex-wrap justify-start items-start content-start'>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Demasiadas tareas</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Demasiadas tareas</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Demasiadas tareas</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Demasiadas tareas</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Flojo</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Demasiadas tareas</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Demasiadas tareas</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Flojo</button>
              <button onClick={async () => { await handleSelect('Otro tag') }} className='tag shrink-0 rounded-lg px-2 py-1 h-fit'>Demasiadas tareas</button>
          </div>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-fit">
            <label htmlFor="tag">Tag</label>
            <input
                type="text"
                id="tag"
                name="tag"
                onChange={formik.handleChange}
                value={formik.values.tag}
                className="bg-bg_300 p-2 rounded-lg border-2 border-primary_200"
            />
            <button type="submit" className="bg-primary_200 p-2 rounded-lg font-bold">Enviar</button>
            </form>
        </div>
  )
}
