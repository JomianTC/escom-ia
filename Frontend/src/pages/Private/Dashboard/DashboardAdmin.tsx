import { useNavBarActions } from '@/pages/hooks/useNavBarActions'
import { NavLink, Outlet } from 'react-router-dom'
import { DeleteProfesorModal } from './Modal'
import { CloseIcon, MenuIcon } from '@/components/icons/Icons'

export function DashboardAdmin () {
  const { handleToggleNavBar, showNav } = useNavBarActions()

  return (
    <section className="container p-8 w-full h-full my-0 mx-auto grid relative grid-cols-6 z-50">
      <aside className={`flex flex-col  ${showNav ? 'fixed w-full h-full top-0 left-0 z-[50] bg-primary_op_100/60 flex justify-center glass items-center content-center' : 'hidden sm:flex '}`}>
        <button onClick={() => { handleToggleNavBar() }} className=" block sm:hidden absolute top-0 left-0">
            <CloseIcon styles='stroke-2 w-10 h-10 stroke-primary_100 fill-none'/>
          </button>
        <NavLink onClick={() => { handleToggleNavBar() }} to='profesores-editar' className={({ isActive }) => {
          return `py-2 px-4 text-lg font-semibold text-nowrap border-primary_200 cursor-pointer sm:rounded-l-xl transition-all   ${isActive ? 'text-center uppercase border-b-4 sm:border-none sm:shadow-lg w-fit  sm:bg-primary_op_100/90 drop-shadow-2xl text-text_accent  sm:w-10/12 sm:self-end font-bold' : 'text-center sm:bg-primary_op_100/70 w-full  sm:w-1/2 font-normal text-accent_100 sm:self-end overflow-hidden'}`
        }}>
          Profesores </NavLink>
        <NavLink onClick={() => { handleToggleNavBar() }} to='editarTags' className={({ isActive }) => {
          return `py-2 px-4 text-lg font-semibold text-nowrap border-primary_200 cursor-pointer sm:rounded-l-xl transition-all sm:-mt-3   ${isActive ? 'text-center uppercase border-b-4 sm:border-none sm:shadow-lg w-fit  sm:bg-primary_op_100/90 drop-shadow-2xl text-primary_300  sm:w-10/12 sm:self-end font-bold' : 'text-center sm:bg-primary_op_100/70 w-full  sm:w-1/2 font-normal text-accent_100 sm:self-end overflow-hidden'}`
        }}>
          Tags </NavLink>
      </aside>
      {/* Lado chatbot */}
      <article className="chatbot__container col-span-full sm:col-span-5  p-4 rounded-r-lg flex flex-col h-full glass overflow-hidden custom-scrollbar ">
        <header className="chatbot__header p-2 flex items-center justify-between rounded-md">
          <button onClick={() => { handleToggleNavBar() }} className=" block sm:hidden ">
            <MenuIcon styles='stroke-2 w-10 h-10 fill-primary_200'/>
          </button>
        </header>
        <Outlet />
      </article>
      <DeleteProfesorModal />
      {/* <DeleteProfesorModal /> */}
    </section>
  )
}
