export function ModalLayout ({ children }: { children?: React.ReactNode }) {
  return (
    <div className='fixed w-full h-screen top-0 left-0 flex justify-center items-center bg-zinc-400/80  z-[9000] p-8 '>
    <div className='bg-bg_300 p-4 rounded-lg text-text_100 flex flex-col gap-4 w-full sm:min-w-96  md:w-[460px] max-w-[480px]'>
              { children}
    </div>
  </div>
  )
}
