export function ErrorPage () {
  return (
    <div className="h-full container mx-auto flex flex-col justify-center">
      <h1 className="font-bold text-center italic">Ooops No deberías estar aquí... </h1>
      <img className="mx-auto  w-full max-w-screen-sm select-none" src="/icons/errorcode.webp" alt="Error code" />
    </div>
  )
}
