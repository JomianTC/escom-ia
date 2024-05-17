import { NavLink } from 'react-router-dom'

export function ErrorPage () {
  return (
    <div className="h-full container mx-auto flex flex-col justify-center">
      <h1 className="font-bold text-center italic">Ooops No deberías estar aquí... </h1>
      <img className="mx-auto  w-full max-w-screen-sm select-none" src="/icons/errorcode.webp" alt="Error code" />
      <NavLink to="/" className="text-center text-primary_300 font-semibold z-50 px-4 py-1 border-2 border-primary_op_100 w-fit mx-auto text-lg hover:bg-primary_op_100/50 rounded-lg transition-colors">Volver al inicio</NavLink>
    </div>
  )
}
