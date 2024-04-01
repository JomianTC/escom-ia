interface FormLayoutProps {
  children: JSX.Element | JSX.Element[]
}
export function FormLayout ({ children }: FormLayoutProps) {
  return (
        <main className="h-full flex flex-col justify-center items-center overflow-hidden">
            <div
                className={`w-72 xs:w-80 sm:max-w-lg sm:w-full bg-bg_100 border-4 border-text_100 rounded-xl ${true} flex flex-col content-center items-center py-14 px-6  gap-2`}
            >
                {children}
            </div>
        </main>
  )
}
